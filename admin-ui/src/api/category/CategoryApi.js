import axiosClient from "../AxiosClient";

const categoryAPI = {
    getAllCategories: () => {
        const url = "/view/category-product/get-all";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    CreateCategory: (body) => {
        const url = "/admin/category-product/add";
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    getCategoryDetail: (id) => {
        const url = `/ProductType/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    updateCategory: (id, body) => {
        const url = `/ProductType/update/${id}`;
        return axiosClient.post(url, body, {
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
