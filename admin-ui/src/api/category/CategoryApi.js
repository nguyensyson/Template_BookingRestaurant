import axiosClient from "../AxiosClient";

const categoryAPI = {
    getAllCategories: (body) => {
        const url = "/view/category-product/get-all";
        return axiosClient.post(url, {
            page: body.page,
            size: body.size,
        });
    },
    CreateCategory: (body) => {
        const url = "/admin/category-product/add";
        return axiosClient.post(url, {
            nameCategory: body.nameCategory,
        }, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    getCategoryDetail: (id) => {
        const url = `/view/category-product/${id}`;
        return axiosClient.get(url);
    },
    updateCategory: (id, body) => {
        const url = `/admin/category-product/update/${id}`;
        return axiosClient.post(url, {
            nameCategory: body.nameCategory,
        }, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    removeCategory: (id) => {
        const url = `/ProductType/delete/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    GetCategoryFrontend: () => {
        const url = `/ProductType/GetCategoryFrontend`;
        return axiosClient.get(url);
    },
};
export default categoryAPI;
