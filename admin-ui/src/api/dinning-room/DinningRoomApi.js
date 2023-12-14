import AxiosClient from "../AxiosClient";

const DinningRoomApi = {
    getDinningRoomByCategoryId: (id) => {
        const uri = '/view/dining-room/get-by-id-category/' + id;
        return AxiosClient.get(uri);
    }
}

export default DinningRoomApi;