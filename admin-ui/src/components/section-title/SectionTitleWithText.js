import PropTypes from "prop-types";
import React from "react";


const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Giới thiệu</h5>
          <h1>Chào mừng tới BeesMeal</h1>
        </div>
        <div className="welcome-content text-justify">
          <p>
          Chào mừng quý vị và các bạn đến với nhà hàng ẩm thực BeesMeal của chúng tôi!

Nhà hàng chúng tôi không chỉ là một địa điểm để thưởng thức các món ăn ngon và truyền thống của Việt Nam, mà còn là một hành trình tới những hương vị, màu sắc và hình ảnh đậm đà của văn hóa ẩm thực đất nước chúng ta. Với sự kết hợp tinh tế của các nguyên liệu tươi ngon và bí quyết gia truyền, chúng tôi tự hào mang đến một trải nghiệm ẩm thực thú vị cho tất cả khách hàng của mình.

Nhà hàng của chúng tôi đặc biệt nổi tiếng với các món phở thơm ngon, bánh mì bánh xèo tươi giòn, bún chả thơm lừng và nhiều món ăn truyền thống khác. Chúng tôi cam kết sử dụng nguyên liệu chất lượng nhất, chuẩn bị mỗi bữa ăn với tình yêu và tận tâm để mang đến cho quý vị hương vị chân thành của Việt Nam.

Nhà hàng của chúng tôi không chỉ là nơi để thưởng thức ẩm thực mà còn là một không gian đẹp và thoải mái, nơi quý vị có thể cùng gia đình và bạn bè tận hưởng bữa tối trọn vẹn. Với phong cách trang trí truyền thống và âm nhạc dân tộc, chúng tôi muốn tạo ra một không gian ấm cúng, đậm chất Việt để quý vị có thể thư giãn và thư thái.

Hãy đến và tham gia chúng tôi tại nhà hàng ẩm thực Việt Nam để khám phá một thế giới hương vị đa dạng và đậm đà. Chúng tôi rất mong được phục vụ quý vị và mang đến cho quý vị một trải nghiệm ẩm thực đặc biệt. Xin cảm ơn đã lựa chọn chúng tôi, và chúng tôi hy vọng bạn sẽ có một bữa ăn ngon và những kỷ niệm đáng nhớ tại nhà hàng của chúng tôi.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
