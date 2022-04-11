import React, { Component } from "react";
import { Logo, FormRow, FormRowSelect, Alert, Navbar } from "../../components";
//import Wrapper from "../assets/wrappers/RegisterPage";
import Wrapper from "../../assets/wrappers/RegisterPage";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

// const statusOptions: ["interview", "declined", "pending"];

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: 0,
      productName: "",
      category: "",
      unitPrice: 0,
      qtyInStock: 0,
      axiosError: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios.get("/api/v1/products").then((response) => {
      const latestProduct = response.data.products[0].productID + 1;
      console.log(latestProduct);
      this.setState({
        productID: latestProduct,
      });
    });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let ProductBlue = {
      productID: this.state.productID,
      productName: this.state.productName,
      category: this.state.category,
      unitPrice: this.state.unitPrice,
      qtyInStock: this.state.qtyInStock,
    };
    axios
      .post("/api/v1/products", ProductBlue)
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          alert("Product Added Successfully!");
          window.location.reload();
        }
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
      <Wrapper>
        <Link className="back-button" to={"/"}>
          Back
        </Link>
        <form className="form" onSubmit={this.handleSubmit}>
          <h3>Add Product</h3>
          <FormRow
            type="number"
            name="productID"
            value={this.state.productID}
            handleChange={this.handleChange}
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
          <FormRowSelect
            name="category"
            value={this.state.category}
            handleChange={this.handleChange}
            list={["MEAT-ITEM", "HOUSEHOLD", "STATIONARY", "GROCERY"]}
          />
          {/* <FormRow
            type="text"
            name="category"
            value={this.state.category}
            handleChange={this.handleChange}
          /> */}
          <FormRow
            type="number"
            name="qtyInStock"
            value={this.state.qtyInStock}
            handleChange={this.handleChange}
          />{" "}
          <button type="submit" className="btn btn-block add-product">
            Add Product
          </button>
          <button className="btn btn-block clear-btn" type="reset">
            clear
          </button>
          <p></p>
        </form>
      </Wrapper>
    );
  }
}
