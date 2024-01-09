import axiosClient from "../AxiosClient";

const OrderApi = {

    getDetailOrder: (id) => {
        const url = `/admin/reservation/detail/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
        });
    },
    getInvoice: (id) => {
        const url = `/view/reservation/invoice/${id}`;
        return axiosClient.get(url);
    },
    getAllOrders: (params = null) => {
        const url = "/admin/reservation/get-all";
        return axiosClient.post(url, {
            page: params.page,
            size: params.pageSize,
        }, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
        });
    },
    addByAdmin(body) {
        const url = "/admin/reservation/addByAdmin";
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
        });
    },
    getByStatus: (params) => {
        const url = "/admin/reservation/get-by-status";
        return axiosClient.post(url, {
            page: params.page,
            size: params.pageSize,
            sortBy: params.sortBy,
            statusID: params.statusID,
        }, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
        });
    },


    CreateOrder: (data) => {
        const url = "/Order";
        return axiosClient.post(url, data);
    },
    CancelOrder: (Code, message) => {
        const url = `/Order/cancelOrder/${Code}`;
        return axiosClient.post(
            url,
            {},
            {
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem("token")
                    }`,
                },
                params: {
                    message: message,
                },
            }
        );
    },
    CreateUrlVnPay: (amount) => {
        debugger;
        const url = "/Order/orderPayVn";
        return axiosClient.post(
            url,
            {},
            {
                params: {
                    amount,
                },
            }
        );
    },
    updateOrderStatus: (params = null) => {
        const url = "/Order/updateStatusOrder";
        return axiosClient.post(
            url,
            {},
            {
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem("token")
                    }`,
                },
                params,
            }
        );
    },
    GetWaitingorder: (params = null) => {
        const url = "/Order/getwaitingorder";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
            params: {
                ...params,
            },
        });
    },
    OrderCanceledByCustomer: (params = null) => {
        const url = "/Order/OrderCanceledByCustomer";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
            params: {
                ...params,
            },
        });
    },
    OrderHasBeenConfirmed: (params = null) => {
        const url = "/Order/OrderHasBeenConfirmed";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
            params: {
                ...params,
            },
        });
    },
    GetCanceled: (params = null) => {
        const url = "Order/orderIsCanceled";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                    
                }`,
            },
            params: {
                ...params,
            },
        });
    },
    GetCompelete: (params = null) => {
        const url = "Order/getcomplete";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
            params: {
                ...params,
            },
        });
    },
    CompleteOrder: (data) => {
        const url = "Order/CompleteOrder";
        return axiosClient.post(url, data, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
        });
    },
    GetBeingDelivered: (params = null) => {
        const url = "Order/getordersAreBeingDelivered";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
            params: {
                ...params,
            },
        });
    },
    isPurchased: (userId, ProductId) => {
        const url = `Order/IsUserPurchasedProduct/${userId}/${ProductId}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
        });
    },
    getOrderStatus: () => {
        const url = "/OrderStatus";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                }`,
            },
        });
    },
    GetOrderForCode: async (code) => {
        const url = `/Order/${code}`;
        return await axiosClient.get(url, {});
    },
    GetOrderForUserId: (id, param) => {
        const url = `/Order/getDetailForEmail/${id}?page=${param.page}&pageSize=${param.pageSize}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                    
                }`,
            },
        });
    },
};

export default OrderApi;
