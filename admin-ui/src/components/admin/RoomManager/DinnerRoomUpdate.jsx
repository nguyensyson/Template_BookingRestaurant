import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import LoadingSpin from "../../loading/LoadingSpin";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import CategoryDinningRoomApi from "../../../api/category-dinningroom/CategoryDinningRoomApi";
import DinningRoomApi from "../../../api/dinning-room/DinningRoomApi";

const DinnerRoomUpdate = () => {
  const { addToast } = useToasts();
  const { id } = useParams();
  const [form] = Form.useForm();
  // upload image
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const onHandleSubmit = async (e) => {
    const item = await form.validateFields();
    const formData = {
      category: item.category,
      maximumOccupancy: item.maximumOccupancy,
    };
    if (!formData.maximumOccupancy) {
      messageApi.open({
        type: "error",
        content: "Không để trống số lượng tối đa",
      });
      return;
    }
    if (!formData.category) {
      messageApi.open({
        type: "error",
        content: "Không để trống loại phòng",
      });
      return;
    }
    e.preventDefault();
    try {
      // Proceed with API call
      await DinningRoomApi.updateDinnerRoom(id, {
        idCategoryDining: formData.category,
        maximumOccupancy: formData.maximumOccupancy,
      });
      addToast("cập nhật danh mục thành công!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 1500,
      });
      history.push(`/admin/dinner-room`);
      return;
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Tạo mới thất bại",
      });
      setLoading(false);
    }
  };
  const [categories, setCategories] = useState([]);
  const getDataApiCategory = () => {
    CategoryDinningRoomApi.getAll()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDataApiCategory();
  }, []);
  useEffect(() => {
    const getDinnerRoomDetail = (id) => {
      DinningRoomApi.detail(id).then((res) => {
        form.setFieldsValue({
          category: res.category.id,
          maximumOccupancy: res.maximumOccupancy,
        });
        // setInitialState(res.status);
      });
    };
    getDinnerRoomDetail(id);
  }, [form, id]);
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Update phòng</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Update phòng
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
                          {item?.title}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Số người tối đa"
            name="maximumOccupancy"
            labelCol={{ span: 3, offset: 1 }}
            rules={[{ required: true }]}
          >
            <InputNumber style={{ height: 34 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onHandleSubmit}
              block
            >
              Cập nhật dữ liệu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default DinnerRoomUpdate;
