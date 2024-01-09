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
import DinningRoomApi from "../../../api/dinning-room/DinningRoomApi";
import DinnerTableApi from "../../../api/dinner-table/DinnerTableApi";

const DinnerTableUpdate = () => {
  const { addToast } = useToasts();
  const [form] = Form.useForm();
  // upload image
  const history = useHistory();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const onHandleSubmit = async (e) => {
    const item = await form.validateFields();
    const formData = {
      room: item.room,
      numberOfSeats: item.numberOfSeats,
    };
    if (!formData.numberOfSeats) {
      messageApi.open({
        type: "error",
        content: "Không để trống số chỗ",
      });
      return;
    }
    if (!formData.room) {
      messageApi.open({
        type: "error",
        content: "Không để trống phòng",
      });
      return;
    }
    e.preventDefault();
    try {
      // Proceed with API call
      await DinnerTableApi.updateDinnerTable(id, {
        idRoom: formData.room,
        numberOfSeats: formData.numberOfSeats,
      });
      addToast("Thêm mới thành công!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 1500,
      });
      history.push(`/admin/dinner-table`);
      return;
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Tạo mới thất bại",
      });
      setLoading(false);
    }
  };
  const [rooms, setRooms] = useState([]);
  const [seats, setSeats] = useState([4, 6, 8, 10]);
  const getDataApiRoom = () => {
    DinningRoomApi.getAllDinningRoom()
      .then((res) => {
        setRooms(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDataApiRoom();
  }, []);
  useEffect(() => {
    const getDinnerTableDetail = (id) => {
      DinnerTableApi.detailDinnerTable(id).then((res) => {
        form.setFieldsValue({
          room: res.diningRoom.id,
          numberOfSeats: res.numberOfSeats,
          tableCode: res.tableCode,
        });
        // setInitialState(res.status);
      });
    };
    getDinnerTableDetail(id);
  }, [form, id]);
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Tạo bàn</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Thêm bàn
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
            <Col span={14}>
              <Form.Item
                label="Table code"
                name="tableCode"
                labelCol={{ span: 4, offset: 4 }}
                tooltip="mã bàn"
                rules={[{ required: true }]}
              >
                <Input style={{ height: 30 }} disabled={true} />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="Phòng"
                name="room"
                labelCol={{ span: 4, offset: 4 }}
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn phòng">
                  {rooms &&
                    rooms.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{item?.name}</span>
                            <span>{item?.maximumOccupancy}</span>
                          </div>
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="Số chỗ"
                name="numberOfSeats"
                labelCol={{ span: 4, offset: 4 }}
                rules={[{ required: true }]}
              >
                <Select placeholder="Số chỗ">
                  {seats &&
                    seats.map((item) => {
                      return (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onHandleSubmit}
              block
            >
              Thêm mới bàn
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default DinnerTableUpdate;
