import Store from '@/api/modules/Store/index'

export default {
    state: {
        STORES: [],
        STORES_LAT_LNG: [],
        SELECTED_STORE: null,
        PRODUCT_CUSTOMER_VIEW_DIALOG: false,
    },
    
    getters: {
        STORES:(state) => state.STORES,
        STORES_LAT_LNG:(state) => state.STORES_LAT_LNG,
        SELECTED_STORE:(state) => state.SELECTED_STORE,
        PRODUCT_CUSTOMER_VIEW_DIALOG:(state) => state.PRODUCT_CUSTOMER_VIEW_DIALOG,
    },

    mutations: {
        STORES:(state, data)=>{state.STORES = data},
        STORES_LAT_LNG:(state, data)=>{state.STORES_LAT_LNG = data},
        SELECTED_STORE:(state, data)=>{state.SELECTED_STORE = data},
        PRODUCT_CUSTOMER_VIEW_DIALOG:(state, data)=>{state.PRODUCT_CUSTOMER_VIEW_DIALOG = data},
    },

    actions: {
        GetActiveStore({commit}){
            return new Promise((resolve,reject)=>{
            Store.GetActiveStore().then((response)=>{
                commit('STORES', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
    }
}