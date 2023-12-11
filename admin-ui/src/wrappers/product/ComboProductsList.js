import PropTypes from "prop-types";
import React from "react";
import ComboGridList from "./ComboGridList";

const ComboProductsList = ({ products, layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
        <ComboGridList products={products} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ComboProductsList.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ComboProductsList;
