import axiosClient from "../AxiosClient";

const DinnerTableApi = {
    getAllByDiningRoomId: async (id, diningRoomId) => {
        const url = `/view/dinner-table/findByDinningRoomId/${id}/${diningRoomId}`;
        return axiosClient.get(url);
    },
    getAllByRoomId: async (id) => {
        const url = `/view/dinner-table/findByRoomId/${id}`;
        return axiosClient.get(url);
    },
    getAll: async () => {
        const url = `/view/dinner-table/get-all`;
        return axiosClient.get(url);
    },
    createDinnerTable: (data) => {
        const url = "/admin/dinner-table/add";
        return axiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    updateDinnerTable: (id, data) => {
        const url = `/admin/dinner-table/update/${id}`;
        return axiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    detailDinnerTable: (id) => {
        const url = `/view/dinner-table/detail/${id}`;
        return axiosClient.get(url);
    },
}

export default DinnerTableApi;