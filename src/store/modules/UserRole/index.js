import UserRole from '@/api/modules/UserRole/index'

export default {
    state: {
        USER_ROLES: [],
        SELECTED_ROLE: null,
    },
    
    getters: {
        USER_ROLES:(state) => state.USER_ROLES,
        SELECTED_ROLE:(state) => state.SELECTED_ROLE,
    },

    mutations: {
        USER_ROLES:(state, data)=>{state.USER_ROLES = data},
        SELECTED_ROLE:(state, data)=>{state.SELECTED_ROLE = data},
    },

    actions: {
        GET_USER_ROLE({commit}){
            return new Promise((resolve,reject)=>{
            UserRole.GET_USER_ROLE().then((response)=>{
                commit('USER_ROLES', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
    }
}