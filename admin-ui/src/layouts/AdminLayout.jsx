import React, { useEffect, useState } from "react";
import { Avatar, Badge, Dropdown, Layout, Menu } from "antd";
import Swal from "sweetalert2";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import ProductList from "../components/admin/ProductsManager/ProductList";
import ProductAdd from "../components/admin/ProductsManager/ProductAdd";
import ProductEdit from "../components/admin/ProductsManager/ProductEdit";
import Dashboard from "../components/admin/Dashboard";
import CategoryList from "../components/admin/CategoriesManager/CategoryList";
import CategoryAdd from "../components/admin/CategoriesManager/CategoryAdd";
import CategoryEdit from "../components/admin/CategoriesManager/CategoryEdit";
import UsersList from "../components/admin/UsersManager/UsersList";
import UsersAdd from "../components/admin/UsersManager/UsersAdd";
import UsersEdit from "../components/admin/UsersManager/UsersEdit";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Icons
import { RxDashboard } from "react-icons/rx";
import { GiConfirmed } from "react-icons/gi";
import {
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BsBagCheck, BsBoxSeam, BsCart2, BsClock } from "react-icons/bs";
import { CiBoxList, CiDiscount1 } from "react-icons/ci";
import {
  MdMeetingRoom,
  MdOutlineCancel,
  MdOutlineCategory,
  MdTableRestaurant,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { IoCreateOutline } from "react-icons/io5";
import SubMenu from "antd/es/menu/SubMenu";
import OrderList from "../components/admin/OrdersManager/OrderList";
import OrderPending from "../components/admin/OrdersManager/OrderPending";
import OrderBeenCheckIn from "../components/admin/OrdersManager/OrderBeenCheckIn";
import OrderCompleted from "../components/admin/OrdersManager/OrderCompleted";
import OrderCanceled from "../components/admin/OrdersManager/OrderCanceled";
import OrderBeenConfirmed from "../components/admin/OrdersManager/OrderBeenConfirmed";
import VoucherList from "../components/admin/VouchersManager/VoucherList";
import VoucherAdd from "../components/admin/VouchersManager/VoucherAdd";
import DiscountAdd from "../components/admin/DiscountManager/DiscountAdd";
import DiscountList from "../components/admin/DiscountManager/DiscountList";
import OrderUpdate from "../components/admin/OrdersManager/OrderUpdate";
import OrderAdd from "../components/admin/OrdersManager/OrderAdd";
import DinnerRoomAdd from "../components/admin/RoomManager/DinnerRoomAdd";
import DinnerRoomList from "../components/admin/RoomManager/DinnerRoomList";
import DinnerRoomUpdate from "../components/admin/RoomManager/DinnerRoomUpdate";
import DinnerTableList from "../components/admin/TableManager/DinnerTableList";
import DinnerTableAdd from "../components/admin/TableManager/DinnerTableAdd";
import DinnerTableUpdate from "../components/admin/TableManager/DinnerTableUpdate";

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (Token === null) {
      Swal.fire({
        icon: "error",
        title: "Thất bại...",
        text: "Vui lòng đăng nhập để có thể vào hệ thống!",
      });
      history.push("/login-register");
    }
  }, [history]);
  // Handle Logout AdminLayout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
    history.push("/");
  };
  const profile = (
    <Menu
      items={[
        {
          key: "1",
          icon: <SettingOutlined />,
          label: <span>Tài khoản</span>,
        },
        {
          key: "2",
          icon: <LogoutOutlined />,
          label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
      ]}
    />
  );
  return (
    <Layout className="min-vh-100">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={240}
      >
        <NavLink to="/">
          <p
            className="logo-admin text-center"
            style={{ fontSize: "34px", margin: "20px 0 14px" }}
          >
            <span style={{ color: "#f58634" }}>Bees</span>
            <span style={{ color: "#69b550" }}>Meal</span>
          </p>
        </NavLink>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="/admin/dashboard" icon={<RxDashboard />}>
            <NavLink to="/admin/dashboard">Bảng điều khiển</NavLink>
          </Menu.Item>

          {/*Order Manager */}
          <SubMenu key="subMenu-8" icon={<BsBoxSeam />} title="Quản lý đơn đặt">
            <Menu.Item key="/admin/create-order" icon={<IoCreateOutline />}>
              <NavLink to="/admin/create-order">Tạo mới đơn đặt</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/orders" icon={<CiBoxList />}>
              <NavLink to="/admin/orders">Danh sách đơn đặt</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/orders-pending" icon={<BsClock />}>
              <NavLink to="/admin/orders-pending">Đơn chờ xác nhận</NavLink>
            </Menu.Item>
            <Menu.Item
              key="/admin/orders-been-confirmed"
              icon={<GiConfirmed />}
            >
              <NavLink to="/admin/orders-been-confirmed">
                Đơn đã xác nhận
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="/admin/order-has-been-checked-in"
              icon={<GiConfirmed />}
            >
              <NavLink to="/admin/order-has-been-checked-in">
                Đơn đã check in
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/orders-completed" icon={<BsBagCheck />}>
              <NavLink to="/admin/orders-completed">Đơn đã hoàn thành</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/orders-canceled" icon={<MdOutlineCancel />}>
              <NavLink to="/admin/orders-canceled">Đơn đã hủy</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* Product Manager */}
          <SubMenu key="subMenu-1" icon={<BsCart2 />} title="Quản lý sản phẩm">
            <Menu.Item key="/admin/products" icon={<CiBoxList />}>
              <NavLink to="/admin/products">Danh sách sản phẩm</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/products-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/products-add">Tạo sản phẩm</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* Category Manager */}
          <SubMenu
            key="subMenu-2"
            icon={<MdOutlineCategory />}
            title="Quản lý danh mục"
          >
            <Menu.Item key="/admin/categories" icon={<CiBoxList />}>
              <NavLink to="/admin/categories">Danh sách danh mục</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/categories-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/categories-add">Tạo danh mục</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* User Manager */}
          <SubMenu
            key="subMenu-3"
            icon={<FiUsers />}
            title="Quản lý người dùng"
          >
            <Menu.Item key="/admin/account" icon={<CiBoxList />}>
              <NavLink to="/admin/account">Danh sách người dùng</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* Voucher Manager */}
          <SubMenu
            key="subMenu-4"
            icon={<HiOutlineReceiptPercent />}
            title="Quản lý voucher"
          >
            <Menu.Item key="/admin/vouchers" icon={<CiBoxList />}>
              <NavLink to="/admin/vouchers">Danh sách voucher</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/voucher-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/voucher-add">Thêm mã voucher</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* discount Manager */}
          <SubMenu
            key="subMenu-5"
            icon={<CiDiscount1 />}
            title="Quản lý discount"
          >
            <Menu.Item key="/admin/discounts" icon={<CiBoxList />}>
              <NavLink to="/admin/discounts">Danh sách discount</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/discount-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/discount-add">Thêm mã discount</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="subMenu-6"
            icon={<MdMeetingRoom />}
            title="Quản lý phòng ăn"
          >
            <Menu.Item key="/admin/dinner-room" icon={<CiBoxList />}>
              <NavLink to="/admin/dinner-room">Danh sách phòng ăn</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/room-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/room-add">Thêm phòng ăn</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="subMenu-7"
            icon={<MdTableRestaurant />}
            title="Quản lý bàn ăn"
          >
            <Menu.Item key="/admin/dinner-table" icon={<CiBoxList />}>
              <NavLink to="/admin/dinner-table">Danh sách bàn ăn</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/table-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/table-add">Thêm bàn ăn</NavLink>
            </Menu.Item>
          </SubMenu>

          {/* SlideShow Manager */}
        </Menu>
      </Sider>
      <Layout>
        <Header className="p-0">
          <div className="d-flex justify-content-end">
            <div className="px-2">
              <Badge count={10}>
                <BellOutlined className="text-light" style={{ fontSize: 24 }} />
              </Badge>
            </div>
            <div className="px-4">
              <Dropdown overlay={profile} trigger={["click"]}>
                <Avatar
                  className="bg-secondary"
                  size="large"
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />
            {/* Product router */}
            <Route path="/admin/products" component={ProductList} />
            <Route path="/admin/products-add" component={ProductAdd} />
            <Route path="/admin/products-edit/:id" component={ProductEdit} />
            {/* Category router */}
            <Route path="/admin/categories" component={CategoryList} />
            <Route path="/admin/categories-add" component={CategoryAdd} />
            <Route path="/admin/categories-edit/:id" component={CategoryEdit} />
            {/* User router */}
            <Route path="/admin/account" component={UsersList} />
            <Route path="/admin/account-add" component={UsersAdd} />
            <Route path="/admin/account-edit/:id" component={UsersEdit} />
            {/* Order router */}
            <Route path="/admin/create-order" component={OrderAdd} />
            <Route path="/admin/orders" component={OrderList} />
            <Route path="/admin/order-detail/:id" component={OrderUpdate} />
            <Route path="/admin/orders-pending" component={OrderPending} />
            <Route
              path="/admin/orders-been-confirmed"
              component={OrderBeenConfirmed}
            />
            <Route
              path="/admin/order-has-been-checked-in"
              component={OrderBeenCheckIn}
            />
            <Route path="/admin/orders-completed" component={OrderCompleted} />
            <Route path="/admin/orders-canceled" component={OrderCanceled} />
            {/* Voucher router */}
            <Route path="/admin/vouchers" component={VoucherList} />
            <Route path="/admin/voucher-add" component={VoucherAdd} />
            {/* discount router */}
            <Route path="/admin/discounts" component={DiscountList} />
            <Route path="/admin/discount-add" component={DiscountAdd} />
            {/* dinner room router */}
            <Route path="/admin/dinner-room" component={DinnerRoomList} />
            <Route path="/admin/room-add" component={DinnerRoomAdd} />
            <Route path="/admin/room-update/:id" component={DinnerRoomUpdate} />
            {/* dinner table router */}
            <Route path="/admin/dinner-table" component={DinnerTableList} />
            <Route path="/admin/table-add" component={DinnerTableAdd} />
            <Route
              path="/admin/table-update/:id"
              component={DinnerTableUpdate}
            />
            {/* Redirect to Dashboard */}
            <Redirect to="/admin/dashboard" />
          </Switch>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          BeesMeal - &#169; FPT Polytechnic Hà Nội
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
