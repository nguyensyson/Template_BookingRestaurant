import PropTypes from "prop-types";
import React, {Fragment} from "react";

const LayoutOne = ({children}) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

LayoutOne.propTypes = {
    children: PropTypes.any,
    headerContainerClass: PropTypes.string,
    headerPaddingClass: PropTypes.string,
    headerPositionClass: PropTypes.string,
    headerTop: PropTypes.string
};

export default LayoutOne;
