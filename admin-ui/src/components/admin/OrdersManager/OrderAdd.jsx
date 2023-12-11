import React, { useState } from "react";
import { Breadcrumb, Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import LoadingSpin from "../../loading/LoadingSpin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import VoucherApi from "../../../api/voucher/VoucherApi";
import { format } from "date-fns";
import { DatePicker, Select, Table } from "antd";
import moment from "moment";
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "* ${label} không được để trống",
  types: {
    number: "* ${label} không đúng định dạng số",
  },
};
const OrderAdd = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Name product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];
  const defaultDateTime = moment();
  const { addToast } = useToasts();
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onHandleSubmit = () => {
    form.validateFields().then(async (item) => {
      const currentDate = new Date();
      const selectedDate = item.expirationDate;
      if (selectedDate <= currentDate) {
        addToast("Ngày hết hạn phải lớn hơn ngày hiện tại!", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        return;
      }
      const formDataApi = new FormData();
      const formData = {
        voucherName: item.voucherName,
        valuevoucher: item.valuevoucher,
        countVoucher: item.countVoucher,
        expirationDate: item.expirationDate.format("YYYY-MM-DD"),
      };
      formDataApi.append("voucherName", formData.voucherName);
      formDataApi.append("valuevoucher", formData.valuevoucher);
      formDataApi.append("countVoucher", formData.countVoucher);
      formDataApi.append("expirationDate", formData.expirationDate);
      const response = await VoucherApi.CreateVoucher(formData);
      addToast("Thêm mới mã giảm giá thành công!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
      history.push(`/admin/vouchers`);
    });
  };
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Tạo phiếu đặt</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Thêm phiếu đặt
        </Title>
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          validateMessages={validateMessages}
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Số điện thoại"
                name="sdt"
                labelCol={{ span: 6 }}
                tooltip="số điện thoại"
                rules={[{ required: true }]}
              >
                <Input
                  style={{ height: 30 }}
                  placeholder="Nhập số điện thoại..."
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Họ và tên"
                name="fullname"
                labelCol={{ span: 6 }}
                tooltip="họ và tên"
                rules={[{ required: true }]}
              >
                <Input
                  style={{ height: 30 }}
                  placeholder="Nhập họ và tên..."
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Số người"
                name="countPeople"
                labelCol={{ span: 5, offset: 1 }}
                tooltip="Tổng số người"
                rules={[{ required: true }]}
              >
                <Input
                  style={{ height: 30 }}
                  placeholder="Nhập số người..."
                  type="number"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Ngày và giờ"
                name="dateBooking"
                labelCol={{ span: 5, offset: 1 }}
                tooltip="ngày và giờ đặt"
                rules={[{ required: true }]}
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Ngày và giờ đặt..."
                  defaultValue={defaultDateTime}
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="loại phòng"
                name="categoryRoom"
                labelCol={{ span: 5, offset: 1 }}
                tooltip="loại phòng"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn Loại phòng" defaultValue={"1"}>
                  {/* {categories &&
                    categories.map((item) => {
                      return (
                        <Select.Option
                          key={item.productTypeId}
                          value={item.productTypeId}
                        >
                          {item.nameProductType}
                        </Select.Option>
                      );
                    })} */}
                  <Select.Option value="1">Phòng thường</Select.Option>
                  <Select.Option value="2">Phòng VIP</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Phòng"
                name="room"
                labelCol={{ span: 5, offset: 1 }}
                tooltip="phòng"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn phòng">
                  {/* {categories &&
                    categories.map((item) => {
                      return (
                        <Select.Option
                          key={item.productTypeId}
                          value={item.productTypeId}
                        >
                          {item.nameProductType}
                        </Select.Option>
                      );
                    })} */}
                  <Select.Option>101</Select.Option>
                  <Select.Option>102</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item
                label="Bàn ăn"
                name="table"
                labelCol={{ span: 2, offset: 1 }}
                tooltip="bàn ăn"
                rules={[{ required: true }]}
              >
                <Table dataSource={dataSource} columns={columns} />;
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item
                label="Món ăn"
                name="product"
                labelCol={{ span: 2, offset: 1 }}
                tooltip="món ăn"
                rules={[{ required: true }]}
              >
                <Table dataSource={dataSource} columns={columns} />;
              </Form.Item>
            </div>
          </div>

          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onHandleSubmit}
              block
            >
              Thêm mới phiếu đặt
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default OrderAdd;
