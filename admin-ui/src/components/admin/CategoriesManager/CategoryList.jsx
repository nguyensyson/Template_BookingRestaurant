import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { ImBin } from "react-icons/im";
import LoadingSpin from "../../loading/LoadingSpin";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import categoryAPI from "../../../api/category/CategoryApi";

const CategoryList = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: true,
    data: [],
  });
  const handlePaginationChange = (page, pageSize) => {
    setParam(
      (prev) =>
        (prev = {
          ...param,
          page: page,
          pageSize: pageSize,
        })
    );
  };
  const [param, setParam] = useState({
    page: 0,
    size: 10,
  });
  const [searchText, setSearchText] = useState("");
  const handleSearch = (value) => {
    setSearchText(value);
    setParam((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm tên món...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys[0])}
          style={{ marginBottom: 8, display: "block", height: 30 }}
        />
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleSearch(selectedKeys[0])}
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              clearFilters();
              setSearchText("");
              handleSearch("");
            }}
            danger
            style={{ width: 90 }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) => {
      return dataIndex === "name" ? (
        <span>
          {searchText &&
          text.toLowerCase().includes(searchText.toLowerCase()) ? (
            <span>
              {text
                .split(new RegExp(`(${searchText})`, "gi"))
                .map((fragment, i) =>
                  fragment.toLowerCase() === searchText.toLowerCase() ? (
                    <span key={i} className="bg-warning">
                      {fragment}
                    </span>
                  ) : (
                    fragment
                  )
                )}
            </span>
          ) : (
            text
          )}
        </span>
      ) : (
        text
      );
    },
  });
  useEffect(() => {
    let isMounted = true;
    const getCategoryAll = () => {
      try {
        setLoading(true);
        categoryAPI
          .getAllCategories({
            page: param.page,
            size: param.size,
          })
          .then((res) => {
            setData(res);
            dataSource = res.content;
          });
        setLoading(false);
      } catch (error) {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    getCategoryAll();
    return () => {
      isMounted = false;
    };
  }, [param]);

  // Remove product
  // const handleOk = async (id) => {
  //   try {
  //     await categoryAPI.removeProduct(id);
  //     const { data } = await categoryAPI.getAllProduct(param);
  //     setData(data);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Thành công",
  //       text: "Xóa sản phẩm thành công!",
  //     });
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Thất bại...",
  //       text: "Xóa sản phẩm thất bại!",
  //     });
  //   }
  // };
  // const handleCancel = () => {
  //   addToast("Hủy xóa", {
  //     appearance: "error",
  //     autoDismiss: true,
  //     autoDismissTimeout: 1000,
  //   });
  // };
  let dataSource = [];
  if (data && data.content && data.content.length > 0) {
    dataSource = data.content?.map((item, index) => {
      return {
        key: index + 1,
        id: item.id,
        name: item.nameCategory,
      };
    });
  }
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Tên loại",
      dataIndex: "name",
      key: "name",
      align: "center",
      ...getColumnSearchProps("name"),
    },
    // {
    //   title: "Hình ảnh",
    //   dataIndex: "image",
    //   key: "image",
    //   align: "center",
    //   render: (image) => (
    //     <Image
    //       src={image}
    //       alt={image}
    //       width={100}
    //       height={100}
    //       className="object-fit-cover border rounded border border-white"
    //     />
    //   ),
    // },
    // {
    //   title: "Giá món",
    //   dataIndex: "price",
    //   key: "price",
    //   align: "center",
    // },
    // {
    //   title: "Giảm giá (%)",
    //   dataIndex: "discount",
    //   key: "discount",
    //   align: "center",
    // },
    // {
    //   title: "Tên danh mục",
    //   dataIndex: "categoryName",
    //   key: "categoryName",
    //   align: "center",
    //   render: (categoryName) => <Tag color="#f50">{categoryName}</Tag>,
    // },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    //   align: "center",
    // },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <NavLink to={`/admin/categories-edit/${record.id}`}>
            <BiEdit className="text-info" />
          </NavLink>
          {/* <NavLink to={`/admin/comment/${record.id}`}>
            <LuClipboardList className="text-info" />
          </NavLink> */}
          {/* <Popconfirm
            title="Bạn có chắc chắn xóa?"
            onConfirm={() => {
              handleOk(record.id);
            }}
            onCancel={handleCancel}
            className="border border-white"
            okText="Có"
            cancelText="Hủy"
          >
            <ImBin className="text-danger" />
          </Popconfirm> */}
        </Space>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        {dataSource.length > 0 && (
          <div>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
            <Pagination
              style={{
                textAlign: "right",
                padding: "10px 20px",
              }}
              current={data.page}
              pageSize={data.pageSize}
              total={data.totalItems}
              onChange={handlePaginationChange}
              showSizeChanger
              showTotal={(total) => `Tổng ${total} sản phẩm`}
            />
          </div>
        )}
        {dataSource.length === 0 && !loading && (
          <div className="text-center">
            <h5>Không có loại sản phẩm nào</h5>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryList;
