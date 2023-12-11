import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${
        colorClass ? colorClass : ""
      }`}>
      <div className="footer-logo text-center">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img
            alt="polyfood"
            style={{ maxWidth: "200px" }}
            src={
              "https://res.cloudinary.com/darvug7fk/image/upload/v1697993413/BeesMeal/ixjvkcrjmmegilquw2zg.png"
            }
          />
        </Link>
      </div>
      <p className="text-center text-light">
        BeesMeal là nhà hàng ẩm thực Việt Nam cung cấp các món ăn từ bình dân tới cao cấp
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
