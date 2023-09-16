import StoreTypeDetail from '@/api/modules/StoreTypeDetail/index'

export default {
    state: {
        STORE_TYPE_DETAIL: [],
    },
    
    getters: {
        STORE_TYPE_DETAIL:(state) => state.STORE_TYPE_DETAIL,
    },

    mutations: {
        STORE_TYPE_DETAIL:(state, data)=>{state.STORE_TYPE_DETAIL = data},
    },

    actions: {
        GET_STORE_TYPE_DETAIL({commit}){
            return new Promise((resolve,reject)=>{
                StoreTypeDetail.GET_STORE_TYPE_DETAIL().then((response)=>{
                commit('STORE_TYPE_DETAIL', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        DELETE_STORE_TYPE_DETAIL_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
                StoreTypeDetail.DELETE_STORE_TYPE_DETAIL_BY_ID(payload).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        
        
    }
}