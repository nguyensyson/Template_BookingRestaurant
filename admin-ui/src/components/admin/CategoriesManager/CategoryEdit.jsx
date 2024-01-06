import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Input, Upload, message } from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import LoadingSpin from "../../loading/LoadingSpin";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

const CategoryEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { addToast } = useToasts();
  // upload image
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  // get Category detail
  useEffect(() => {
    const getProductDetail = async (id) => {
      const { data } = await categoryAPI.getCategoryDetail(id);
      form.setFieldsValue(data);
    };
    getProductDetail(id);
  }, [form, id]);
  const onHandleSubmit = async (e) => {
    const formDataApi = new FormData();
    const item = await form.validateFields();
    const formData = {
      nameCategory: item.nameCategory,
    };
    if (!formData.nameCategory) {
      Swal.fire({
        icon: "error",
        title: "Không để trống các trường...",
        text: "Không để trống các trường!",
      });
      return;
    }
    e.preventDefault();
    try {
      formDataApi.append("nameCategory", formData.nameCategory);
      try {
        await categoryAPI.updateCategory(id, formDataApi);
        setLoading(false);
        addToast("Cập nhật danh mục thành công!", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 1500,
        });
        history.push(`/admin/categories`);
      } catch (error) {
        addToast("Cập nhật danh mục thất bại!", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 1500,
        });
      }
      return;
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Tạo mới thất bại",
      });
      setLoading(false);
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
        <Breadcrumb.Item>Cập nhật danh mục</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Cập nhật danh mục
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
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item label="Tên danh mục" name="nameCategory">
            <Input style={{ height: 30 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={onHandleSubmit}>
              Cập nhật danh mục
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CategoryEdit;
