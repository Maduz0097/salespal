import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoCartOutline } from "react-icons/io5";
const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "all Sales", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 3, text: "add product", path: "addproduct", icon: <FaWpforms /> },
  { id: 5, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 4, text: "add sale", path: "cart", icon: <IoCartOutline /> },
];

export default links;
