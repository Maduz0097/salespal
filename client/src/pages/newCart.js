import React, { Component } from "react";
import { Logo, FormRow, Alert, Navbar } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import axios from "axios";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: 0,
      saleID: 0,
      productName: "",
      category: "",
      unitPrice: 0,
      qtyInStock: 0,
      quantity: 0,
      subTotal: 0,
      total: 0,
      fetchProducts: [],
      products: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleProduct = this.handleProduct.bind(this);

    // this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    if (this.state.productID !== 0) {
      this.handleProduct();
    }
  }
  componentDidMount() {
    axios.get("/api/v1/sales").then((response) => {
      const latestSale = response.data.sales[0].saleID + 1;
      console.log(latestSale);
      this.setState({
        saleID: latestSale,
      });
    });
  }
  // componentDidUpdate() {
  //   if (this.state.products.length === 0) {
  //     console.log("empty");
  //   } else {
  //     console.log(this.state.products);

  //   }
  //   console.log(sum);
  // }
  handleSubmit(event) {
    event.preventDefault();
    let ProductBlue = {
      productID: this.state.productID,
      productName: this.state.productName,
      category: this.state.category,
      unitPrice: this.state.unitPrice,
      qtyInStock: this.state.qtyInStock,
      quantity: this.state.quantity,
      subTotal: this.state.unitPrice * this.state.quantity,
    };

    const isFound = this.state.products.some((e) => {
      if (e.productID === ProductBlue.productID) {
        return true;
      }
    });
    if (isFound) {
      let quantityUpdate = this.state.products.map((product) => {
        let ProductQuantity = parseInt(ProductBlue.quantity);
        let productUpdateQuantity = parseInt(product.quantity);
        let productUnitPrice = parseInt(product.unitPrice);

        if (product.productID === ProductBlue.productID) {
          product.quantity = productUpdateQuantity + ProductQuantity;
          let newSubTotal = productUnitPrice * product.quantity;
          console.log(product.quantity);
          this.setState({
            products: this.state.products.map((product) =>
              product.productID === ProductBlue.productID
                ? {
                    ...product,
                    quantity: product.quantity,
                    subTotal: newSubTotal,
                  }
                : product
            ),
          });
        }
      });
      console.log(quantityUpdate);
    } else {
      this.setState(
        {
          products: [...this.state.products, ProductBlue],
        },
        () => {
          let sum = 0;
          this.state.products.forEach((item) => {
            sum += item.subTotal;
          });
          console.log(this.state.products);
          console.log(sum);
          this.setState({
            total: sum,
          });
        }
      );
    }

    // this.state.products.push(ProductBlue);
  }
  // handleClick(event) {
  //   console.log(this.state.products);
  // }
  handleProduct() {
    axios
      .get("/api/v1/products")
      .then((response) => {
        // console.log(response.data.products);

        this.setState(
          {
            fetchProducts: response.data.products,
          },
          () => {
            const filteredArrayProducts = this.state.fetchProducts.filter(
              (item) => item.productID == this.state.productID
            );
            if (filteredArrayProducts.length > 0) {
              this.setState(
                {
                  productID: filteredArrayProducts[0].productID,
                  productName: filteredArrayProducts[0].productName,
                  category: filteredArrayProducts[0].category,
                  unitPrice: filteredArrayProducts[0].unitPrice,
                  qtyInStock: filteredArrayProducts[0].qtyInStock,
                },
                () => {
                  console.log(this.state.productName);
                }
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleOrder() {
    let Sale = {
      saleID: this.state.saleID,
      total: this.state.total,
      products: this.state.products,
    };

    axios
      .post("/api/v1/sales", Sale)
      .then((response) => {
        console.log(response.status);

        this.setState({
          axiosError: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <Wrapper className="full-page">
        <div class="grid-container">
          <div class="grid-item">
            <form className="form" onSubmit={this.handleSubmit}>
              <h3>Cart</h3>

              <FormRow
                type="number"
                name="productID"
                value={this.state.productID}
                handleChange={this.handleChange}
              />
              <FormRow
                type="number"
                name="saleID"
                value={this.state.saleID}
                //handleChange={this.handleChange}
                disabled={true}
              />
              <FormRow
                type="text"
                name="productName"
                value={this.state.productName}
                handleChange={this.handleChange}
              />

              <FormRow
                type="number"
                name="unitPrice"
                value={this.state.unitPrice}
                handleChange={this.handleChange}
              />
              <FormRow
                type="text"
                name="category"
                value={this.state.category}
                handleChange={this.handleChange}
              />
              <FormRow
                type="number"
                name="qtyInStock"
                value={this.state.qtyInStock}
                handleChange={this.handleChange}
              />
              <FormRow
                type="number"
                name="quantity"
                value={this.state.quantity}
                handleChange={this.handleChange}
              />
              <button type="submit" className="btn btn-block">
                ADD to Cart
              </button>
              <button className="btn btn-block" onClick={this.handleOrder}>
                Place Order
              </button>
              <p></p>
            </form>
          </div>
          <div class="grid-item">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Unit Price</th>
                  <th>Category </th>
                  <th>Qty in Stock</th>
                  <th>Quantity</th>
                  <th>Sub total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((data) => {
                  return (
                    <tr key={data.productID}>
                      <td>{data.productID}</td>
                      <td>{data.productName}</td>
                      <td>{data.unitPrice}</td>
                      <td>{data.category}</td>
                      <td>{data.qtyInStock}</td>
                      <td>{data.quantity}</td>
                      <td>{data.subTotal}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-block"
                          onClick={() => {
                            var filteredArray = this.state.products.filter(
                              (e) => e.productID !== data.productID
                            );

                            console.log(filteredArray);
                            this.setState({
                              products: filteredArray,
                            });
                          }}
                        >
                          Remove Item
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="total">
              <p>Total : {this.state.total}</p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
