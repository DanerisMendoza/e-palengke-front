import ProductTypeDetail from '@/api/modules/ProductTypeDetail/index'

export default {
    state: {
        PRODUCT_TYPE_DETAIL: [],
    },
    
    getters: {
        PRODUCT_TYPE_DETAIL:(state) => state.PRODUCT_TYPE_DETAIL,
    },

    mutations: {
        PRODUCT_TYPE_DETAIL:(state, data)=>{state.PRODUCT_TYPE_DETAIL = data},
    },

    actions: {
        GET_PRODUCT_TYPE_DETAIL({commit}){
            return new Promise((resolve,reject)=>{
                ProductTypeDetail.GET_PRODUCT_TYPE_DETAIL().then((response)=>{
                commit('PRODUCT_TYPE_DETAIL', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        DELETE_PRODUCT_TYPE_DETAIL_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
                ProductTypeDetail.DELETE_PRODUCT_TYPE_DETAIL_BY_ID(payload).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        
        
    }
}