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
    }
}

export default ReservationApi;