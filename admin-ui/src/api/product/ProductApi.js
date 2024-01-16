import axiosClient from "../AxiosClient";

const ProductApi = {
    getAllProduct: (body) => {
        const url = "/view/product/get-all";
        return axiosClient.post(url,{
            page: body.page,
            size : body.size,
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
    },
    getAllByComboId: (id) => {
        const url = `/view/product/getAllNotCombo/${id}`;
        return axiosClient.get(url);
    },
    searchCombo: (body) => {
        const url = `/view/product/combo/search`;
        return axiosClient.post(url, {
            page: body.page,
            size : body.size,
        });
    },
    detailCombo: (id) => {
        const url = `/view/product/combo/${id}`;
        return axiosClient.get(url);
    },
    CreateCombo: (body) => {
        const url = "admin/product/combo/add";
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    UpdateCombo: (id, body) => {
        const url = `admin/product/combo/update/${id}`;
        return axiosClient.put(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    ChangeProduct: (id, body) => {
        const url = `admin/product/combo/changeProduct/${id}`;
        return axiosClient.put(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
};

export default ProductApi;
