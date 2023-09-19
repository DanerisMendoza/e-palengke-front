import Product from '@/api/modules/Product/index'

export default {
    state: {
        PRODUCT: [],
        PRODUCT_DIALOG: null,
    },
    
    getters: {
        PRODUCT:(state) => state.PRODUCT,
        PRODUCT_DIALOG:(state) => state.PRODUCT_DIALOG,
    },

    mutations: {
        PRODUCT:(state, data)=>{state.PRODUCT = data},
        PRODUCT_DIALOG:(state, data)=>{state.PRODUCT_DIALOG = data},
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
    }
}