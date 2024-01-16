import React from "react";

class Bill extends React.Component {
  render() {
    const { curentInfo, count, currenOrderDeatail } = this.props;
    const body = {
      font: "VCR OSD Mono",
    };
    const tableStyles = {
      width: "100%",
      boxShadow: "0 0 3px #aaa",
      lineHeight: "30px",
      borderCollapse: "collapse",
    };
    return (
      <div style={body} className="modal-body p-0">
        <table style={tableStyles} border={1}>
          <tbody>
            <tr>
              <td colSpan={1}>Mã đơn: {curentInfo.id}</td>
              <td colSpan={2} className="text-center">
                {curentInfo.oderStatus === 4
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </td>
              <td colSpan={2} className="text-right">
                <strong>Thời gian đặt: {curentInfo.reservationDate}</strong>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="text-center">
                <img
                  src="https://res.cloudinary.com/darvug7fk/image/upload/v1697993413/BeesMeal/ixjvkcrjmmegilquw2zg.png"
                  alt=""
                  width={200}
                />
                <p className="font-weight-bold">
                  BeesMeal - Nhà hàng ẩm thực - Hà Nội
                </p>
                <p>Phố Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</p>
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <p>
                  <strong>Tên khách hàng:</strong> {curentInfo.fullname}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {curentInfo.sdt}
                </p>
                <p>
                  <strong>Phòng:</strong> {curentInfo.diningRoom}
                </p>
                <p>
                  <strong>Bàn:</strong> {curentInfo.diningTable}
                </p>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-weight-bold">STT</td>
              <td className="font-weight-bold">Món ăn</td>
              <td className="font-weight-bold">Đơn giá</td>
              <td className="font-weight-bold">Số lượng</td>
              <td className="font-weight-bold">Giá</td>
            </tr>
            {currenOrderDeatail &&
              currenOrderDeatail.map((item, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                );
              })}
            <tr>
              <td colSpan={2} className="text-center">
                <strong>Tổng đơn</strong>
              </td>
              <td colSpan={3} className="text-center">
                <strong>{curentInfo.originalPrice} VNĐ</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Bill;
