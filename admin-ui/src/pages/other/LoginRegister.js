import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";
import {message} from "antd";
import LoadingSpin from "../../components/loading/LoadingSpin";
import {Link} from "react-router-dom";
import axios from 'axios';

const LoginRegister = ({location}) => {
    const {pathname} = location;
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();
    const [activeKey, setActiveKey] = useState("login");
    const [dataLogin, setDataLogin] = useState({
        sdt: "",
        password: "",
    });
    const [dataRegister, setDataRegister] = useState({
        sdt: "",
        password: "",
        fullname: ""
    });
    const changeInputValue = (val) => {
        setDataLogin({
            ...dataLogin,
            [val.target.name]: val.target.value,
        });
    };
    const setInputValue = (val) => {
        setDataRegister({
            ...dataRegister,
            [val.target.name]: val.target.value,
        });
    };
    const handleSubmitRegister = async (e) => {
        if (
            !dataRegister.sdt ||
            !dataRegister.password ||
            !dataRegister.fullname ||
            !dataRegister.confirmpassword
        ) {
            messageApi.open({
                type: "error",
                content: "Không để trống các trường",
            });
            return;
        }
        if (dataRegister.password !== dataRegister.confirmpassword) {
            messageApi.open({
                type: "error",
                content: "Mật khẩu không khớp",
            });
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append("sdt", dataRegister.sdt);
        formData.append("password", dataRegister.password);
        formData.append("fullname", dataRegister.fullname);
        // formData.append("Status", 1);
        // formData.append("DecentralizationId", 3);
        try {
            setLoading(true);
            // const response = await UserApi.Register(formData); // đưa dữ liệu lên đăng ký
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                sdt: dataRegister.sdt,
                password: dataRegister.password,
                fullname: dataRegister.fullname
            });
            messageApi.open({
                type: "success",
                content: "Bạn đã đăng ký thành công",
            });
            setLoading(false);
            setDataRegister(
                (prev) =>
                    (prev = {
                        sdt: "",
                        password: "",
                        confirmpassword: "",
                        fullname: "",
                    })
            );
            setActiveKey("login");
            // Xử lý phản hồi từ API tại đây (ví dụ: hiển thị thông báo thành công, điều hướng đến trang khác, vv)
        } catch (error) {
            console.error(error);
            messageApi.open({
                type: "error",
                content: "Đăng ký không thành công",
            });
            setLoading(false);
            // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
        }
    };

    const handleSubmit = async (e) => {
        if (!dataLogin.sdt || !dataLogin.password) {
            messageApi.open({
                type: "error",
                content: "Không để trống các trường",
            });
            return;
        }
        e.preventDefault();
        try {
            const expirationTime = new Date().getTime() + 4 * 60 * 60 * 1000;
            // const expirationTime = new Date().getTime() + (1 * 60 * 1000);
            setLoading(true);
            // const response = await UserApi.Login(dataLogin); // đưa dữ liệu lên đăng ký
            const response = await axios.post("http://localhost:8080/api/auth/authenticate", {
                username: dataLogin.sdt,
                password: dataLogin.password
            });
            const token = response.data?.access_token
            localStorage.setItem("token", token);
            history.push("/");
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Đăng nhập thất bại",
                // content: error.response.data,
            });
            setLoading(false);
            // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
        }
    };
    return (
        <Fragment>
            <MetaTags>
                <title>Poly Food | Đăng nhập</title>
                <meta name="description" content="Compare page of PolyFood."/>
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
                Trang chủ
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Đăng nhập - Đăng ký
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb/>
                {contextHolder}
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <Tab.Container activeKey={activeKey}>
                                        <Nav variant="pills" className="login-register-tab-list">
                                            <Nav.Item>
                                                <Nav.Link
                                                    eventKey="login"
                                                    onClick={() => setActiveKey("login")}>
                                                    <h4>Đăng nhập</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    eventKey="register"
                                                    onClick={() => setActiveKey("register")}>
                                                    <h4>Đăng ký</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="login">
                                                <div className="login-form-container">
                                                    {loading && (
                                                        <div>
                                                            <LoadingSpin/>
                                                        </div>
                                                    )}
                                                    <div className="login-register-form">
                                                        <form>
                                                            <input
                                                                type="text"
                                                                name="sdt"
                                                                value={dataLogin.sdt}
                                                                placeholder="Sdt"
                                                                onChange={changeInputValue}
                                                                required
                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                value={dataLogin.password}
                                                                placeholder="Mật khẩu"
                                                                onChange={changeInputValue}
                                                                required
                                                            />
                                                            <div
                                                                className="button-box"
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                }}>
                                                                {/* <div className="login-toggle-btn">
                                    <input type="checkbox" />
                                    <label className="ml-10">Remember me</label>
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div> */}
                                                                <button type="submit" onClick={handleSubmit}>
                                                                    <span>Đăng nhập</span>
                                                                </button>

                                                                <Link
                                                                    to={
                                                                        process.env.PUBLIC_URL + "/forgot-password"
                                                                    }>
                                                                    {"Quên mật khẩu"}
                                                                </Link>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="register">
                                                <div className="login-form-container">
                                                    {loading && (
                                                        <div>
                                                            <LoadingSpin/>
                                                        </div>
                                                    )}
                                                    <div className="login-register-form">
                                                        <form>
                                                            <input
                                                                type="text"
                                                                name="fullname"
                                                                value={dataRegister.fullname}
                                                                placeholder="Họ tên"
                                                                onChange={setInputValue}
                                                                required
                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                value={dataRegister.password}
                                                                placeholder="Mật khẩu"
                                                                onChange={setInputValue}
                                                                required
                                                            />
                                                            <input
                                                                type="password"
                                                                name="confirmpassword"
                                                                value={dataRegister.confirmpassword}
                                                                placeholder="Xác nhận mật khẩu"
                                                                onChange={setInputValue}
                                                                required
                                                            />
                                                            <input
                                                                name="sdt"
                                                                value={dataRegister.sdt}
                                                                placeholder="Sdt"
                                                                type="text"
                                                                onChange={setInputValue}
                                                                required
                                                            />
                                                            <div className="button-box">
                                                                <button
                                                                    type="button"
                                                                    onClick={handleSubmitRegister}>
                                                                    <span>Đăng ký</span>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

LoginRegister.propTypes = {
    location: PropTypes.object,
};

export default LoginRegister;
