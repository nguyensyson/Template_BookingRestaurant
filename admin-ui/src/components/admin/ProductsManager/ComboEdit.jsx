import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import ProductApi from "../../../api/product/ProductApi";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

const { TextArea } = Input;
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "* ${label} không được để trống",
  types: {
    number: "* ${label} không đúng định dạng số",
  },
};
const ComboEdit = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [form] = Form.useForm();
  // upload image
  const [productList, setProductList] = useState([]);
  const [checkBoxProductDataList, setCheckBoxProductDataList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState("");
  const { id } = useParams();

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

  const handleChangeQuantity = (e, record) => {
    productList.forEach((item) => {
      if (item.id === record.id) {
        item.quantity = +e.target.value;
        record.quantity = +e.target.value;
      }
    });
  };

  const dataProduct = productList.map((item, index) => ({
    id: item?.id,
    key: index,
    name: item?.name,
    price: item?.price,
    quantity: item?.quantity,
    isOrdered: item?.isOrdered,
  }));

  const tableProductColumns = [
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
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div>
          <input
            type="number"
            defaultValue={text}
            width="30px"
            onChange={(event) => handleChangeQuantity(event, record)}
          />
        </div>
      ),
    },
  ];

  const handleBeforeUpload = (file) => {
    setFileList([file]);
    return false;
  };

  const handleUpload = () => {
    const file = fileList[0];
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Tệp tin quá lớn...",
        text: "Vui lòng chọn một tệp tin nhỏ hơn 2MB!",
      });
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Sai tệp tin...",
        text: "Vui lòng chọn một tệp tin hình ảnh (jpg, png, webp)!",
      });
      return;
    }
    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview);
  };
  const onHandleSubmit = () => {
    const productSelected = productList.filter((item) =>
      checkBoxProductDataList.includes(item.id)
    );
    const productIsOrdered = productList
      .filter((item) => item.isOrdered === true)
      .map((item) => item);
    const payload = {
      listPorduct: [...productIsOrdered, ...productSelected],
      originalPrice: productSelected.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      actualPrice: productSelected.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      priceToPay: productSelected.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    };
    form.validateFields().then(async (item) => {
      const formDataApi = new FormData();
      const formData = {
        name: item.name,
        introduce: item.introduce,
        images: fileList[0],
      };
      formDataApi.append("avatar", formData.images);
      formDataApi.append("name", formData.name);
      formDataApi.append("introduce", formData.introduce);

      // console.log(formData.images);
      // console.log(formData.name);
      // console.log(formData.introduce);
      // console.log(formData.listItem);
      await ProductApi.UpdateCombo(id, formDataApi);
      console.log(payload.listPorduct);
      await ProductApi.ChangeProduct(id, payload);
      addToast("Thêm mới sản phẩm thành công!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
      history.push(`/admin/combo`);
      // window.location.reload();
    });
  };
  useEffect(() => {
    // const fetchProductList = async () => {
    //   try {
    //     const res = await ProductApi.getAllByComboId(0);
    //     setProductList(res);
    //   } catch (error) {
    //     console.error("Lỗi khi tải danh sách món ăn:", error);
    //   }
    // };

    // fetchProductList();
    const getComboDetail = (id) => {
      ProductApi.detailCombo(id).then((res) => {
        setPreview(res?.avatar);
        setProductList(res?.listItem);
        console.log(res?.listItem);
        form.setFieldsValue({
          name: res.name,
          introduce: res.introduce,
          price: res.price + " VND",
        });
      });
    };
    getComboDetail(id);
  }, [id]);
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Cập nhật combo</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Cập nhật combo
        </Title>
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
            label="Tên Combo"
            name="name"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="Tên combo"
            rules={[{ required: true }]}
          >
            <Input style={{ height: 30 }} placeholder="Nhập tên combo..." />
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
            label="Giá trị"
            name="price"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="giá trị"
            rules={[{ required: true }]}
          >
            <Input
              style={{ height: 30 }}
              disabled={true}
              placeholder="giá trị..."
            />
          </Form.Item>
          {/*<Form.Item*/}
          {/*    label="Giảm giá"*/}
          {/*    name="Discount"*/}
          {/*    labelCol={{span: 3, offset: 1}}*/}
          {/*    tooltip="% Giảm giá sản phẩm"*/}
          {/*    rules={[{required: true}]}*/}
          {/*>*/}
          {/*    <Input*/}
          {/*        style={{height: 30}}*/}
          {/*        placeholder="Nhập giảm giá..."*/}
          {/*    />*/}
          {/*</Form.Item>*/}
          <Row gutter={16}>
            {/*<Col span={12}>*/}
            {/*    <Form.Item*/}
            {/*        label="Trạng thái"*/}
            {/*        name="Status"*/}
            {/*        style={{width: "calc(100% - 131px)"}}*/}
            {/*        labelCol={{span: 0, offset: 0}}*/}
            {/*        rules={[{required: true}]}*/}
            {/*    >*/}
            {/*        <Select placeholder="Chọn trạng thái">*/}
            {/*            <Select.Option key="1" value="1">*/}
            {/*                Hiển thị*/}
            {/*            </Select.Option>*/}
            {/*            <Select.Option key="0" value="0">*/}
            {/*                Ẩn*/}
            {/*            </Select.Option>*/}
            {/*        </Select>*/}
            {/*    </Form.Item>*/}
            {/*</Col>*/}
          </Row>
          <Form.Item
            label="Hình ảnh"
            tooltip="Ảnh sản phẩm xem trước"
            name="images"
            labelCol={{ span: 3, offset: 1 }}
            rules={[{ required: false }]}
          >
            <Upload
              listType="picture-card"
              className="avatar-uploader"
              accept=".png,.jpg,.jpeg"
              maxCount={1}
              fileList={fileList}
              beforeUpload={handleBeforeUpload}
              onChange={handleUpload}
              showUploadList={false}
            >
              {preview ? (
                <img
                  src={preview}
                  alt={preview}
                  width={96}
                  className="rounded"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1669841925/no-image-icon-6_ciydgz.png"
                  alt="Error"
                  width={96}
                  className="rounded"
                />
              )}
            </Upload>
          </Form.Item>
          {/* <div className="col-12 mb-3"> */}
          <Form.Item
            label="Món ăn"
            name="product"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="món ăn"
            rules={[{ required: false }]}
          >
            <Table dataSource={dataProduct} columns={tableProductColumns} />
          </Form.Item>
          {/* </div> */}
          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onHandleSubmit}
              block
            >
              Cập nhật combo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ComboEdit;
