import { JobsContainer, SearchContainer } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/appContext";
import Loading from "../../components/Loading.js";

import Wrapper from "../../assets/wrappers/JobsContainer.js";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { setEditJob, deleteProduct } = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get("/api/v1/products");
        setData(response.products);
        console.log(response.products);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading center />;
  }

  if (data.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {/* <SearchContainer /> */}
      <table className="table_head">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Category </th>
            <th>Qty in Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.productID}>
                <td>{item.productID}</td>
                <td>{item.productName}</td>
                <td>{item.unitPrice}</td>
                <td>{item.category}</td>
                <td>{item.qtyInStock}</td>

                <td>
                  <button
                    type="button"
                    className="btn delete-btn"
                    onClick={() => deleteProduct(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default AllProducts;
