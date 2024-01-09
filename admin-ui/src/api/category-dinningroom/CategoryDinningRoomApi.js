import axiosClient from "../AxiosClient";

const CategoryDinningRoomApi = {
    getAll: () => {
        const url = "/view/category-room/get-all";
        return axiosClient.get(url);
    },

}

export default CategoryDinningRoomApi;