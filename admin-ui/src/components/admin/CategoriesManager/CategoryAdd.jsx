import React, { useState } from "react";
import { Breadcrumb, Button, Form, Input, Upload, message } from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import LoadingSpin from "../../loading/LoadingSpin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

const CategoryAdd = () => {
  const { addToast } = useToasts();
  const [form] = Form.useForm();
  // upload image
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const onHandleSubmit = async (e) => {
    const item = await form.validateFields();
    const formData = {
      nameProductType: item.nameProductType,
    };
    if (!formData.nameProductType) {
      messageApi.open({
        type: "error",
        content: "Không để trống các trường",
      });
      return;
    }
    e.preventDefault();
    try {
      // Proceed with API call
      await categoryAPI.CreateCategory({
        nameCategory: formData.nameProductType,
      });
      addToast("Thêm mới danh mục thành công!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 1500,
      });
      history.push(`/admin/categories`);
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
        <Breadcrumb.Item>Tạo danh mục</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Thêm danh mục
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
        >
          <Form.Item
            label="Tên danh mục"
            name="nameProductType"
            labelCol={{ span: 3, offset: 1 }}
          >
            <Input style={{ height: 30 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onHandleSubmit}
              block
            >
              Thêm mới danh mục
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CategoryAdd;
