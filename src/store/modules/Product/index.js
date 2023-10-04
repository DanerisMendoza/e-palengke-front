import Product from '@/api/modules/Product/index'

export default {
    state: {
        PRODUCT: [],
        PRODUCT_DIALOG: null,
        PRODUCT_TABLE_VIEWER: null,
    },
    
    getters: {
        PRODUCT:(state) => state.PRODUCT,
        PRODUCT_DIALOG:(state) => state.PRODUCT_DIALOG,
        PRODUCT_TABLE_VIEWER:(state) => state.PRODUCT_TABLE_VIEWER,
    },

    mutations: {
        PRODUCT:(state, data)=>{state.PRODUCT = data},
        PRODUCT_DIALOG:(state, data)=>{state.PRODUCT_DIALOG = data},
        PRODUCT_TABLE_VIEWER:(state, data)=>{state.PRODUCT_TABLE_VIEWER = data},
    },

    actions: {
        STORE_PRODUCT({commit},payload){
            return new Promise((resolve,reject)=>{
                Product.STORE_PRODUCT(payload.params,payload.config).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        GET_PRODUCT_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
                Product.GET_PRODUCT_BY_ID(payload).then((response)=>{
                commit('PRODUCT',response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        DELETE_PRODUCT_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
                Product.DELETE_PRODUCT_BY_ID(payload).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        GET_PRODUCT({commit},payload){
            return new Promise((resolve,reject)=>{
                Product.GET_PRODUCT(payload).then((response)=>{
                commit('PRODUCT',response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
    }
}