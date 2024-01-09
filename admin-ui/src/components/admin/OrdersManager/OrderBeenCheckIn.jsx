import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  Button,
  Descriptions,
  Image,
  message,
  Modal,
  Pagination,
  Space,
  Table,
  Tag,
} from "antd";
import OrderApi from "../../../api/order/OrderApi.js";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin.jsx";
import Bill from "../../../pages/other/Bill.jsx";
import { BiEdit, BiDetail } from "react-icons/bi";
import PrintButton from "../../../pages/other/PrintButton.jsx";
import { NavLink } from "react-router-dom/cjs/react-router-dom.js";

const OrderBeenCheckIn = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const invoiceRef = useRef(null);
  const [currentOrderDetail, setCurrentOrderDetail] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({});
  const [tableData, setTableData] = useState({
    content: [],
    empty: true,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
    },
    size: 0,
    sort: {
      empty: true,
      sorted: true,
    },
    totalElements: 0,
    totalPages: 0,
  });

  const redirectOrder = (id) => {
    //redirect to order detail
    OrderApi.getInvoice(id).then((response) => {
      setCurrentInfo(response);
      setCurrentOrderDetail(response.products);
    });
    setIsModal(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancelBill = () => {
    setIsModal(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePaginationChange = (page, pageSize) => {
    setParam((prev) => ({
      ...prev,
      page: page,
      pageSize: pageSize,
    }));
  };

  const [param, setParam] = useState({
    page: 0,
    pageSize: 10,
    sortBy: "",
    statusID: 3,
  });

  useEffect(() => {
    let isMounted = true;
    const getOrders = () => {
      try {
        setLoading(true);
        OrderApi.getByStatus(param).then((response) => {
          if (isMounted) {
            // Kiểm tra xem response có chứa dữ liệu hợp lệ không
            setTableData(response);
            setLoading(false);
            console.log("Danh sách đơn hàng:", tableData);
          }
        });
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getOrders();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [param]);
  const dataSource = tableData.content?.map((item, index) => ({
    id: item.id,
    key: index + 1,
    orderId: item.orderId,
    sdt: item.sdt,
    fullname: item.fullname,
    reservationDate: item.reservationDate,
    // paymentOrder:
    //   item.paymentOrderPaymentId == 1 ? (
    //     <Tag color="cyan">Thanh toàn tại nhà hàng</Tag>
    //   ) : (
    //     <Tag color="green">Thanh toán online</Tag>
    //   ),
    orderStatus: item.oderStatus,
  }));

  const [options, setOptions] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "#70a1ff";
      case 2:
        return "#2ed573";
      case 3:
        return "#ff4757";
      case 4:
        return "#ffa502";
      case 5:
        return "#EE3B3B";
      case 6:
        return "#00FA9A";
      default:
        return "#000000";
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
      render: (fullname) => <b>{fullname}</b>,
    },
    {
      title: "SDT",
      dataIndex: "sdt",
      key: "sdt",
      align: "center",
      render: (sdt) => <b>{sdt}</b>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "reservationDate",
      key: "reservationDate",
      align: "center",
      render: (reservationDate) => (
        <>{format(new Date(reservationDate), "HH:mm:ss dd/MM/yyyy")}</>
      ),
    },
    // {
    //   title: "Phương thức thanh toán",
    //   dataIndex: "paymentOrder",
    //   key: "paymentOrder",
    //   align: "center",
    // },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      align: "center",
      render: (orderStatus) => (
        <p style={{ color: getStatusColor(orderStatus?.id) }}>
          {orderStatus?.title}
          {/* Chờ xác nhận */}
        </p>
      ),
    },
    {
      title: "Xem chi tiết",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <Space size="middle">
          <NavLink to={`/admin/order-detail/${id}`}>
            <BiEdit className="text-info" />
          </NavLink>
          <Button type="text" onClick={(e) => redirectOrder(id)}>
            <BiDetail className="text-info" />
          </Button>
        </Space>
      ),
    },
  ];

  const columnDetail = [
    {
      title: "STT",
      dataIndex: "productId",
      key: "productId",
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "avartarImageProduct",
      key: "avartarImageProduct",
      align: "center",
      render: (avartarImageProduct) => (
        <Image
          src={avartarImageProduct}
          alt={"image"}
          width={100}
          height={100}
          className="object-fit-cover border rounded-circle border border-success"
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price, record) => (
        <span>
          <del style={{ color: "#535c68" }}>{record.priceOld}</del>
          <br />
          {price}
        </span>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
    },
  ];

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách đơn hàng</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <Modal
        open={isModalOpen}
        width={1100}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Descriptions title="Chi tiết đơn hàng">
          <Descriptions.Item label="Tên khách hàng">
            {currentData && currentData.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {currentData && currentData.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Mã đơn hàng">
            {currentData && currentData.codeOrder}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {currentData && currentData.email}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {currentData && currentData.address}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng đơn hàng">
            {currentData &&
              currentData.actualPrice &&
              currentData.actualPrice.toLocaleString("vi-VN")}{" "}
            VNĐ
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {currentData && (
              <Tag
                color={
                  currentData.paymentOrderPaymentId === 1 ? "cyan" : "green"
                }
              >
                {currentData.paymentOrderPaymentId === 1
                  ? "Thanh Toán Khi Nhận Hàng"
                  : "Thanh Toán Online"}
              </Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Hóa đơn">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setIsModal(true);
              }}
            >
              In hóa đơn
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <Table columns={columnDetail} dataSource={currentOrderDetail} />
      </Modal>
      <Modal
        title="Hóa đơn chi tiết"
        open={isModal}
        width={840}
        onCancel={handleCancelBill}
        footer={null}
      >
        <Bill
          curentInfo={currentInfo}
          currenOrderDeatail={currentOrderDetail}
          ref={invoiceRef}
        />
        <PrintButton invoiceRef={invoiceRef} />
      </Modal>
      <div>
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        {tableData.content && (
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        )}
        <Pagination
          style={{
            textAlign: "right",
            padding: "10px 20px",
          }}
          current={tableData.page}
          pageSize={tableData.pageSize}
          total={tableData.totalElements}
          onChange={handlePaginationChange}
          showSizeChanger
          showTotal={(total) => `Tổng ${total} đơn hàng`}
        />
      </div>
    </>
  );
};

export default OrderBeenCheckIn;
