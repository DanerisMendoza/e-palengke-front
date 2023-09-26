import Order from '@/api/modules/Order/index'

export default {
    state: {
        ORDERS: [],
    },

    getters: {
        ORDERS: (state) => state.ORDERS,
    },

    mutations: {
        ORDERS: (state, data) => { state.ORDERS = data },
    },

    actions: {
        GET_ORDERS({ commit }) {
            return new Promise((resolve, reject) => {
                Order.GetCart().then((response) => {
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