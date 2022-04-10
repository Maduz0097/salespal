import main from "../assets/images/undraw_empty_cart_co35.svg";

import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <h1>SALESPAL</h1>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            POS <span>SYSTEM</span> app SALESPAL
          </h1>

          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
