
export default {
    state: {
        CART: false,
    },
    
    getters: {
        CART:(state) => state.CART,
    },

    mutations: {
        CART:(state, data)=>{state.CART = data},
    },

    actions: {

    }
}