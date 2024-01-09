import AxiosClient from "../AxiosClient";

const DinningRoomApi = {
    getDinningRoomByCategoryId: (id) => {
        const uri = '/view/dining-room/get-by-id-category/' + id;
        return AxiosClient.get(uri);
    },
    getAllDinningRoom: () => {
        const uri = '/view/dining-room/get';
        return AxiosClient.get(uri);
    },
    detail: (id) => {
        const url = `/view/dining-room/detail/${id}`;
        return AxiosClient.get(url);
    },
    createDinnerRoom: (data) => {
        const url = "/admin/dining-room/add";
        return AxiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
    updateDinnerRoom: (id, data) => {
        const url = `/admin/dining-room/update/${id}`;
        return AxiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                }`,
            },
        });
    },
}

export default DinningRoomApi;