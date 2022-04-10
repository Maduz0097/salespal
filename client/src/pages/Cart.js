import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialProducts = {
  products: [],
};
const Cart = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [productVal, setProducts] = useState(initialProducts);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    let newPush = productVal.products.push(values);
    console.log(productVal);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Cart</h3>

        <FormRow
          type="text"
          name="productID"
          value={values.productID}
          handleChange={handleChange}
        />

        <FormRow
          type="text"
          name="productName"
          value={values.productName}
          handleChange={handleChange}
        />

        <FormRow
          type="text"
          name="unitPrice"
          value={values.unitPrice}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="category"
          value={values.category}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="qtyInStock"
          value={values.qtyInStock}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="quantity"
          value={values.quantity}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p></p>
      </form>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Category </th>
            <th>Qty in Stock</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {productVal.products.map((data) => {
            return (
              <tr key={data.productID}>
                <td>{data.productID}</td>
                <td>{data.productName}</td>
                <td>{data.unitPrice}</td>
                <td>{data.category}</td>
                <td>{data.qtyInStock}</td>
                <td>{data.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};
export default Cart;
