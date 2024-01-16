import axiosClient from "../AxiosClient";

const discountApi = {
    getDiscount: () => {
        const url = "/view/discount/getAll";
        return axiosClient.get(url);
    },
    CreateDiscount: (body) => {
        const url = "/admin/discount/add";
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    getDiscountDetail: (id) => {
        const url = `/view/discount/${id}`;
        return axiosClient.get(url);
    },
    updateDiscount: (id, body) => {
        const url = `/admin/discount/update/${id}`;
        return axiosClient.put(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
};
export default discountApi;