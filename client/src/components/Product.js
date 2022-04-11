import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Job = ({ _id, saleID, products, total, createdAt }) => {
  const { setEditJob, deleteSale } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">S</div>
        <div className="info">
          <h5>{saleID}</h5>
          <p>total : {total}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <div>
          <table>
            <thead>
              <tr className="table_head">
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
              {products.map((data) => {
                return (
                  <tr key={data.productID}>
                    <td>{data.productID}</td>
                    <td>{data.productName}</td>
                    <td>{data.unitPrice}</td>
                    <td>{data.category}</td>
                    <td>{data.qtyInStock}</td>
                    <td>{data.quantity}</td>
                    <td>{data.subTotal}</td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <footer>
          <div className="actions">
            {/* <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link> */}
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteSale(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
