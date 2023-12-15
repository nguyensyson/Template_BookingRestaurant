import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, DatePicker, Form, Input, Select, Table} from "antd";
import Title from "antd/es/typography/Title";
import LoadingSpin from "../../loading/LoadingSpin";
import {useHistory, useParams} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import ReservationApi from "../../../api/reservation/ReservationApi";
import OrderApi from "../../../api/order/OrderApi";
import CategoryDinningRoomApi from "../../../api/category-dinningroom/CategoryDinningRoomApi";
import DinningRoomApi from "../../../api/dinning-room/DinningRoomApi";
import DinnerTableApi from "../../../api/dinner-table/DinnerTableApi";
import moment from "moment";
import ProductApi from "../../../api/product/ProductApi";

const OrderAdd = () => {
    const {id} = useParams();
    const {addToast} = useToasts();
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categoryDinningRoomList, setCategoryDinningRoomList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    // danh sách bàn ăn
    const [tableList, setTableList] = useState([]);
    // danh sách món ăn
    const [productList, setProductList] = useState([]);
    const [checkBoxDataList, setCheckBoxDataList] = useState([]);
    const [checkBoxProductDataList, setCheckBoxProductDataList] = useState([]);
    const [status, setStatus] = useState(0);

    const handleCheckBoxChange = (e) => {
        if (e.target.checked) {
            setCheckBoxDataList([...checkBoxDataList, +e.target.value]);
        } else {
            setCheckBoxDataList(checkBoxDataList.filter((item) => item !== +e.target.value));
        }
    }

    const handleCheckBoxProductChange = (e) => {
        const productIsOrdered = dataProduct.filter((item) => item.isOrdered === true).map((item) => item.id);
        if (e.target.checked) {
            setCheckBoxProductDataList([...checkBoxProductDataList, ...productIsOrdered, +e.target.value]);
        } else {
            setCheckBoxProductDataList(checkBoxProductDataList.filter((item) => item !== +e.target.value));
        }
    }

    const handleOnChangeCategoryDinningRoom = async (value) => {
        try {
            const res = await DinningRoomApi.getDinningRoomByCategoryId(value);
            setRoomList(res);
        } catch (error) {
            console.error("Lỗi khi tải danh sách phòng:", error);
        }
    }

    const arrangeSeats = () => {
        const payload = {
            idTable: checkBoxDataList,
            idRoom: form.getFieldValue("room"),
            idCategoryDiningRoom: form.getFieldValue("categoryRoom"),
            numberOfPeopleBooked: form.getFieldValue("numberOfPeopleBooked"),
        }
        ReservationApi.arrangeSeats(payload, id).then((res) => {
            alert(res);
        });

    }

    const dataDinnerTable = tableList.map((item, index) => ({
        id: item?.id,
        key: index,
        tableCode: item?.tableCode,
        numberOfSeats: item?.numberOfSeats,
        status: item?.status,
    }));

    const dataProduct = productList.map((item, index) => ({
        id: item?.id,
        key: index,
        name: item?.name,
        price: item?.price,
        quantity: item?.quantity,
        isOrdered: item?.isOrdered,
    }));

    const handleOnChangeRoom = async (value) => {
        try {
            const res = await DinnerTableApi.getAllByDiningRoomId(value);
            setTableList(res);
        } catch (error) {
            console.error("Lỗi khi tải danh sách bàn ăn:", error);
        }
    }

    const tableColumns = [
        {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (id) => <input type="checkbox" value={id} width="30px" onChange={handleCheckBoxChange}/>,
        },
        {
            title: "Mã bàn",
            dataIndex: "tableCode",
            key: "tableCode",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Số ghế",
            dataIndex: "numberOfSeats",
            key: "numberOfSeats",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => <a>{text}</a>,
        }
    ];

    const handleChangeQuantity = (e, record) => {
        productList.forEach((item) => {
            if (item.id === record.id) {
                item.quantity = +e.target.value;
                record.quantity = +e.target.value;
            }
        });
    }
    const button = (status, f) => {
        if (status === 1) {
            return <Button type="primary" htmlType="submit" onClick={f} block>Xác nhận đơn</Button>
        } else if (status === 2) {
            return <Button type="primary" htmlType="submit" onClick={f} block>Check-in</Button>
        } else if (status === 3) {
            return <Button type="primary" htmlType="submit" onClick={f} block>Thanh toán</Button>
        } else {
            return (
                <></>
            )
        }
    }

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
                    <input type="number" defaultValue={text} width="30px"
                           onChange={(event) => handleChangeQuantity(event, record)}/>
                </div>
            ),
        }
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const orderDetail = await OrderApi.getDetailOrder(id);
                // Điền dữ liệu vào các trường nhập liệu
                form.setFieldsValue({
                    sdt: orderDetail?.sdt,
                    fullNameClient: orderDetail?.fullNameClient,
                    numberOfPeopleBooked: orderDetail?.numberOfPeopleBooked,
                    reservationDate: moment(orderDetail?.reservationDate),
                });
                setStatus(orderDetail?.status?.id);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        const fetchCategoryDinningRoomList = async () => {
            try {
                const res = await CategoryDinningRoomApi.getAll();
                setCategoryDinningRoomList(res);
            } catch (error) {
                console.error("Lỗi khi tải danh sách loại phòng:", error);
            }
        }

        const fetchProductList = async () => {
            try {
                const res = await ProductApi.getAllByReservationId(id);
                setProductList(res);
            } catch (error) {
                console.error("Lỗi khi tải danh sách món ăn:", error);
            }
        }

        fetchData();
        fetchProductList();
        fetchCategoryDinningRoomList();
    }, [id, form]);

    const onHandleSubmit = () => {
        const payload = {
            numberOfPeopleBooked: form.getFieldValue("numberOfPeopleBooked"),
            status : status
        }
        ReservationApi.changeStatus(payload, id).then((res) => {
            alert(res);
        });
    };

    const onChangeProduct = () => {
        const productSelected = productList.filter((item) => checkBoxProductDataList.includes(item.id));
        const productIsOrdered = dataProduct.filter((item) => item.isOrdered === true).map((item) => item);
        const payload = {
            listPorduct: [...productIsOrdered, ...productSelected],
            originalPrice: productSelected.reduce((total, item) => total + item.price * item.quantity, 0),
            actualPrice: productSelected.reduce((total, item) => total + item.price * item.quantity, 0),
            priceToPay: productSelected.reduce((total, item) => total + item.price * item.quantity, 0),
        }
        ReservationApi.changeProduct(payload, id).then((res) => {
            alert(res);
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
                <Breadcrumb.Item>Chi tiết đơn đặt</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-3">
                <Title level={4} className="text-uppercase text-center">
                    Chi tiết đơn đặt
                </Title>
                {loading && (
                    <div>
                        <LoadingSpin/>
                    </div>
                )}
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    form={form}
                >
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                label="Số điện thoại"
                                name="sdt"
                                labelCol={{span: 6}}
                                tooltip="số điện thoại"
                                rules={[{required: true}]}
                            >
                                <Input
                                    style={{height: 30}}
                                    disabled={true}
                                    placeholder="Nhập số điện thoại..."
                                />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                label="Họ và tên"
                                name="fullNameClient"
                                labelCol={{span: 6}}
                                tooltip="họ và tên"
                                rules={[{required: true}]}
                            >
                                <Input
                                    style={{height: 30}}
                                    placeholder="Nhập họ và tên..."
                                    disabled={true}
                                    type="text"
                                />
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item
                                label="Số người"
                                name="numberOfPeopleBooked"
                                labelCol={{span: 5, offset: 1}}
                                tooltip="Tổng số người"
                                rules={[{required: true}]}
                            >
                                <Input
                                    style={{height: 30}}
                                    placeholder="Nhập số người..."
                                    type="number"
                                />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                label="Ngày và giờ"
                                name="reservationDate"
                                labelCol={{span: 5, offset: 1}}
                                tooltip="ngày và giờ đặt"
                                rules={[{required: true}]}
                            >
                                <DatePicker
                                    showTime={{format: "HH:mm"}}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder="Ngày và giờ đặt..."

                                />
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item
                                label="loại phòng"
                                name="categoryRoom"
                                labelCol={{span: 5, offset: 1}}
                                tooltip="loại phòng"
                                rules={[{required: true}]}
                            >
                                <Select placeholder="Chọn Loại phòng"
                                        onChange={handleOnChangeCategoryDinningRoom}
                                >
                                    {categoryDinningRoomList &&
                                        categoryDinningRoomList?.map((item) => {
                                            return (
                                                <Select.Option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.title}
                                                </Select.Option>
                                            )
                                        })}

                                </Select>
                            </Form.Item>
                        </div>
                        {
                            roomList && roomList?.length > 0 && (
                                <div className="col-6">
                                    <Form.Item
                                        label="Phòng"
                                        name="room"
                                        labelCol={{span: 5, offset: 1}}
                                        tooltip="phòng"
                                        rules={[{required: true}]}
                                    >
                                        <Select placeholder="Chọn phòng" onChange={handleOnChangeRoom}>
                                            {roomList && (
                                                roomList?.map((item) => {
                                                    return (
                                                        <Select.Option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </Select.Option>
                                                    )
                                                })
                                            )}
                                        </Select>
                                    </Form.Item>
                                </div>
                            )
                        }
                        <div className="col-12">
                            <Form.Item
                                label="Bàn ăn"
                                name="table"
                                labelCol={{span: 2, offset: 1}}
                                tooltip="bàn ăn"
                                rules={[{required: true}]}
                            >
                                <Table dataSource={dataDinnerTable} columns={tableColumns}/>
                            </Form.Item>
                        </div>
                        <div className={`col-12 d-flex justify-content-center`}>
                            <button type={`button`} className={`btn btn-primary`} onClick={arrangeSeats}>Sắp xếp chỗ
                                ngồi
                            </button>
                        </div>
                        <div className="col-12 mb-3">
                            <Form.Item
                                label="Món ăn"
                                name="product"
                                labelCol={{span: 2, offset: 1}}
                                tooltip="món ăn"
                                rules={[{required: true}]}
                            >
                                <Table dataSource={dataProduct} columns={tableProductColumns}/>
                            </Form.Item>
                            <div className={`col-12 d-flex justify-content-center`}>
                                <button type={`button`} className={`btn btn-primary`} onClick={onChangeProduct}>Thêm
                                    món
                                </button>
                            </div>
                        </div>

                    </div>

                    <Form.Item wrapperCol={{span: 16, offset: 4}}>
                        {button(status, onHandleSubmit)}
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default OrderAdd;
