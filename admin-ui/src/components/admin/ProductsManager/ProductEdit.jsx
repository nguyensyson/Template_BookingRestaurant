import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import LoadingSpin from "../../loading/LoadingSpin";
import ProductApi from "../../../api/product/ProductApi";
import {
  useParams,
  useHistory,
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
const ProductEdit = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [form] = Form.useForm();
  const { id } = useParams();
  // Lưu trạng thái bạn đầu của status
  const [initialState, setInitialState] = useState();
  useEffect(() => {
    const getProductDetail = (id) => {
      ProductApi.getProductDetail(id).then((res) => {
        setPreview(res.avatar);
        form.setFieldsValue({
          name: res?.name,
          price: res?.price,
          // introduce: res?.introduce,
          images: res?.avatar,
          category: res?.category?.id,
          status: res?.status,
        });
        setInitialState(res.status);
      });
    };
    getProductDetail(id);
  }, [form, id]);
  // upload image
  const [fileList, setFileList] = useState([]);
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
    // View local photos
    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview);
  };
  const onHandleSubmit = () => {
    form.validateFields().then(async (item) => {
      const formData = {
        name: item.name,
        price: item.price,
        introduce: item.introduce,
        images: fileList[0] || preview,
        category: item.category,
        status: item.status,
      };
      const formDataApi = new FormData();
      formDataApi.append("name", formData.name);
      formDataApi.append("price", formData.price);
      formDataApi.append("introduce", formData.introduce);
      formDataApi.append("category", formData.category);
      formDataApi.append("images", formData.images);
      formDataApi.append("status", formData.status);
      try {
        await ProductApi.updateProduct(id, formDataApi);
        setLoading(false);
        addToast("Cập nhật sản phẩm thành công!", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 1500,
        });
        history.push(`/admin/products`);
      } catch (error) {
        addToast("Cập nhật sản phẩm thất bại!", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 1500,
        });
      }
    });
  };
  const [categories, setCategories] = useState();
  useEffect(() => {
    getDataApiCategory();
  }, []);
  const getDataApiCategory = () => {
    try {
      setLoading(true);
      categoryAPI
        .getAllCategories({
          page: 0,
          size: 20,
        })
        .then((res) => {
          setCategories(res.content);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Cập nhật sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Cập nhật sản phẩm
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
            label="Tên sản phẩm"
            name="name"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input style={{ height: 30 }} placeholder="Nhập tên sản phẩm..." />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="price"
            labelCol={{ span: 3, offset: 1 }}
            tooltip="Giá gốc sản phẩm"
            rules={[{ required: true }]}
          >
            <Input
              style={{ height: 30 }}
              placeholder="Nhập giá sản phẩm..."
              type="text"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="category"
                labelCol={{ span: 4, offset: 4 }}
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories &&
                    categories.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item?.nameCategory}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                style={{ width: "calc(100% - 210px)" }}
                labelCol={{ span: 6, offset: 2 }}
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn trạng thái">
                  <Select.Option key="1" value="1">
                    Phục vụ
                  </Select.Option>
                  <Select.Option key="2" value="2">
                    Ngưng phục vụ
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Hình ảnh"
            tooltip="Ảnh sản phẩm xem trước"
            name="images"
            labelCol={{ span: 3, offset: 1 }}
            rules={[{ required: true }]}
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
          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onHandleSubmit}
              block
            >
              Cập nhật sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ProductEdit;
