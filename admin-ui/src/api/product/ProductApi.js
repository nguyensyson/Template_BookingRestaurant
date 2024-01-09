import axiosClient from "../AxiosClient";

const ProductApi = {
    getAllProduct: (body) => {
        const url = "/view/product/get-all";
        return axiosClient.post(url,{
            page: body.page,
            size : body.size,
        } , {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    CreateProduct: (body) => {
        const url = "admin/product/add";
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    IncreaseViews: async (id) => {
        const url = `/Product/increaseviews/${id}`;
        return await axiosClient.get(url);
    },
    getProductDetail: (id) => {
        const url = `/view/product/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    removeProduct: (id) => {
        const url = `/Product/delete/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    updateProduct: (id, body) => {
        const url = `/admin/product/update/${id}`;
        return axiosClient.put(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    getAllByReservationId: (id) => {
        const url = `/view/product/getAll/${id}`;
        return axiosClient.get(url);
    }
};

export default ProductApi;
