import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Input, Select } from "antd";
import Title from "antd/es/typography/Title";
import LoadingSpin from "../../loading/LoadingSpin";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import VoucherApi from "../../../api/voucher/VoucherApi";
import { format } from "date-fns";
import { DatePicker, Table } from "antd";
import { ImBin } from "react-icons/im";
import ProductApi from "../../../api/product/ProductApi";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import discountApi from "../../../api/Discount/DiscountApi";
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "* ${label} không được để trống",
  types: {
    number: "* ${label} không đúng định dạng số",
  },
};

const DiscountEdit = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [checkBoxProductDataList, setCheckBoxProductDataList] = useState([]);
  const { id } = useParams();

  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <input
          type="checkbox"
          value={id}
          width="30px"
          onChange={handleCheckBoxProductChange}
          defaultChecked={record?.isOrdered}
        />
      ),
    },
    {
      title: "Món ăn",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
    },
  ];

  const handleCheckBoxProductChange = (e) => {
    const productIsOrdered = dataProduct
      .filter((item) => item.isOrdered === true)
      .map((item) => item.id);
    if (e.target.checked) {
      setCheckBoxProductDataList([
        ...checkBoxProductDataList,
        ...productIsOrdered,
        +e.target.value,
      ]);
    } else {
      setCheckBoxProductDataList(
        checkBoxProductDataList.filter((item) => item !== +e.target.value)
      );
    }
  };

  const dataProduct = productList.map((item, index) => ({
    id: item?.id,
    key: index,
    name: item?.name,
    price: item?.price,
    isOrdered: item?.isOrdered,
  }));

  const onHandleSubmit = () => {
    const productSelected = productList
      .filter((item) => checkBoxProductDataList.includes(item.id))
      .map((item) => item.id);
    const productIsOrdered = dataProduct
      .filter((item) => item.isOrdered === true)
      .map((item) => item.id);
    form.validateFields().then(async (item) => {
      const currentDate = new Date();
      const endDate = item.endDate;
      const startDate = item.startDate;
      if (endDate <= currentDate) {
        addToast("Ngày hết hạn phải lớn hơn ngày hiện tại!", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        return;
      }
      if (endDate <= startDate) {
        addToast("Ngày hết hạn phải lớn hơn ngày bắt đầu!", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        return;
      }

      const formDataApi = new FormData();
      const formData = {
        nameDiscount: item.nameDiscount,
        discountValue: item.discountValue,
        introduce: item.introduce,
        startDate: item.startDate,
        endDate: item.endDate,
        listProduct: [...productSelected, ...productIsOrdered],
      };
      formDataApi.append("nameDiscount", formData.nameDiscount);
      formDataApi.append("discountValue", formData.discountValue);
      formDataApi.append("introduce", formData.introduce);
      formDataApi.append("startDate", formData.startDate);
      formDataApi.append("endDate", formData.endDate);
      formDataApi.append("listProduct", formData.listProduct);

      // console.log(formData.nameDiscount);
      // console.log(formData.discountValue);
      // console.log(formData.introduce);
      // console.log(formData.startDate);
      // console.log(formData.endDate);
      // console.log(formData.listProduct);

      const response = await discountApi.updateDiscount(id, formData);
      addToast("Thêm mới mã giảm giá thành công!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
      history.push(`/admin/discounts`);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await discountApi.getDiscountDetail(id);
        form.setFieldsValue({
          nameDiscount: res?.nameDiscount,
          discountValue: res?.discountValue,
          introduce: res?.introduce,
          status: res?.status,
          startDate: moment(res?.startDate),
          endDate: moment(res?.endDate),
        });
        setProductList(res.listProduct);
      } catch (error) {
        console.error("Lỗi khi tải danh sách món ăn:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Cập nhật khuyến mại</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Cập nhật khuyến mại
        </Title>
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        {/* <div className="row">
          <div className="col-lg-6"> */}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Tên"
            name="nameDiscount"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="Tên mã giảm giá"
            rules={[{ required: true }]}
          >
            <Input
              style={{ height: 30 }}
              placeholder="Nhập tên mã giảm giá..."
            />
          </Form.Item>
          <Form.Item
            label="Giá trị"
            name="discountValue"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="Giá gốc mã giảm giá"
            rules={[{ required: true }]}
          >
            <Input
              style={{ height: 30 }}
              placeholder="Nhập giá mã giảm giá..."
              type="number"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả ngắn"
            name="introduce"
            labelCol={{ span: 3, offset: 1 }}
            rules={[{ required: true }]}
          >
            <TextArea rows={3} placeholder="Mô tả combo..." />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="status"
            style={{ width: "calc(100% - 210px)" }}
            labelCol={{ span: 3, offset: 1 }}
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option key="1" value="1">
                Hoạt động
              </Select.Option>
              <Select.Option key="0" value="0">
                Ngưng hoạt động
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="ngày bắt đầu"
            rules={[{ required: true }]}
          >
            <DatePicker placeholder="Ngày bắt đầu" />
          </Form.Item>

          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="ngày hến hạn"
            rules={[{ required: true }]}
          >
            <DatePicker placeholder="Ngày hết hạn..." />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 20, offset: 2 }}>
            <Table dataSource={dataProduct} columns={columns} />;
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onHandleSubmit}
              block
            >
              Cập nhật khuyến mại
            </Button>
          </Form.Item>
        </Form>
        {/* <Table columns={columns} /> */}
        {/* </div>
        </div> */}
      </div>
    </>
  );
};

export default DiscountEdit;
