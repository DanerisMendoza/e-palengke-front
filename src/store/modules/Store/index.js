import Store from '@/api/modules/Store/index'

export default {
    state: {
        STORES: [],
        STORES_LAT_LNG: [],
    },
    
    getters: {
        STORES:(state) => state.STORES,
        STORES_LAT_LNG:(state) => state.STORES_LAT_LNG,
    },

    mutations: {
        STORES:(state, data)=>{state.STORES = data},
        STORES_LAT_LNG:(state, data)=>{state.STORES_LAT_LNG = data},
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