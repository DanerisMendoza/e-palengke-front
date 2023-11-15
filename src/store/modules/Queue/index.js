import api from '@/api/index'

export default {
    state: {
    },

    getters: {
    },

    mutations: {
    },

    actions: {
        MarkOnline({commit},payload) {
            return new Promise((resolve, reject) => {
                api.post('api/MarkOnline', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        MarkOffline({commit},payload) {
            return new Promise((resolve, reject) => {
                api.post('api/MarkOffline', payload).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}