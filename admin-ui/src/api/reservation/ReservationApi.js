import axiosClient from "../AxiosClient";

const ReservationApi = {
    arrangeSeats: (data, id) => {
        const url = "/admin/reservation/arrange-seats/" + id;
        return axiosClient.put(url, data, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
        });
    },
    updateByAdmin(body, id) {
        const uri = '/admin/reservation/updateByadmin/' + id;
        return axiosClient.put(uri, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
    },
    changeProduct (body,id) {
        const uri = '/user/reservation/change-product/' + id;
        return axiosClient.put(uri, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
    },
    changeStatus (body,id) {
        const uri = '/user/reservation/change-status/' + id;
        return axiosClient.put(uri, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
    }
}

export default ReservationApi;