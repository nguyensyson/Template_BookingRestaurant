import axiosClient from "../AxiosClient";

const DinnerTableApi = {
    getAllByDiningRoomId: async (id, diningRoomId) => {
        const url = `/view/dinner-table/findByDinningRoomId/${id}/${diningRoomId}`;
        return axiosClient.get(url);
    },
    getAllByRoomId: async (id) => {
        const url = `/view/dinner-table/findByRoomId/${id}`;
        return axiosClient.get(url);
    }
}

export default DinnerTableApi;