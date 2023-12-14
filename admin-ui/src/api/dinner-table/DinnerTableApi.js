import axiosClient from "../AxiosClient";

const DinnerTableApi = {
    getAllByDiningRoomId: async (diningRoomId) => {
        const url = `/view/dinner-table/findByDinningRoomId/${diningRoomId}`;
        return axiosClient.get(url);
    }
}

export default DinnerTableApi;