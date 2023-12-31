import PropTypes from "prop-types";
import React from "react";
import {
  getIndividualCategories,
  getIndividualTags,
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopTag from "../../components/product/ShopTag";

const ComboSidebar = ({
  products,
  getSortParams,
  sideSpaceClass,
  setFilterSortName,
}) => {
  const uniqueCategories = getIndividualCategories(products);
  const uniqueTags = getIndividualTags(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch setFilterSortName={setFilterSortName} />
      {/* filter by categories */}
      {/* <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      /> */}
      {/* filter by tag
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ComboSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ComboSidebar;
