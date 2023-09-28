import Order from '@/api/modules/Order/index'

export default {
    state: {
        ORDERS: [],
        SELECTED_ORDER_DETAILS: null,
    },

    getters: {
        ORDERS: (state) => state.ORDERS,
        SELECTED_ORDER_DETAILS: (state) => state.SELECTED_ORDER_DETAILS,
    },

    mutations: {
        ORDERS: (state, data) => { state.ORDERS = data },
        SELECTED_ORDER_DETAILS: (state, data) => { state.SELECTED_ORDER_DETAILS = data },
    },

    actions: {
        GET_ORDERS_BY_STORE_ID({ commit },payload) {
            return new Promise((resolve, reject) => {
                Order.GetOrdersByStoreId(payload).then((response) => {
                    commit('ORDERS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                Order.Order(payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}