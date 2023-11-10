import api from '@/api/index'

export default {
    state: {
        ORDERS: [],
        ORDER_DETAILS: [],
        SELECTED_ORDER_DETAILS: null,
        ORDERS_TABLE_MODE: null,
    },

    getters: {
        ORDERS: (state) => state.ORDERS,
        ORDER_DETAILS: (state) => state.ORDER_DETAILS,
        SELECTED_ORDER_DETAILS: (state) => state.SELECTED_ORDER_DETAILS,
        ORDERS_TABLE_MODE: (state) => state.ORDERS_TABLE_MODE,
    },

    mutations: {
        ORDERS: (state, data) => { state.ORDERS = data },
        ORDER_DETAILS: (state, data) => { state.ORDER_DETAILS = data },
        SELECTED_ORDER_DETAILS: (state, data) => { state.SELECTED_ORDER_DETAILS = data },
        ORDERS_TABLE_MODE: (state, data) => { state.ORDERS_TABLE_MODE = data },
    },

    actions: {
        ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/ORDER', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        CANCEL_ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/CANCEL_ORDER', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        CANCEL_ORDER_DETAIL({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/CANCEL_ORDER_DETAIL', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        ACCEPT_ORDER({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/ACCEPT_ORDER', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        ORDER_TO_SHIP({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.post('api/ORDER_TO_SHIP', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        GET_ORDERS_BY_STORE_ID({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get(`api/GET_ORDERS_BY_STORE_ID/${payload}`).then((response) => {
                    commit('ORDERS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },

        GET_ORDERS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_ORDERS', payload).then((response) => {
                    commit('ORDERS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        
        GET_ORDER_DETAILS({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.get('api/GET_ORDER_DETAILS', payload).then((response) => {
                    commit('ORDER_DETAILS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}