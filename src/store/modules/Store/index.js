import StoreTypeDetail from '@/api/modules/StoreTypeDetail/index'

export default {
    state: {
        STORE: [],
    },
    
    getters: {
        STORE:(state) => state.STORE,
    },

    mutations: {
        STORE:(state, data)=>{state.STORE = data},
    },

    actions: {
        GET_STORE({commit}){
            return new Promise((resolve,reject)=>{
                StoreTypeDetail.GET_STORE_TYPE_DETAIL().then((response)=>{
                commit('STORE', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
    }
}