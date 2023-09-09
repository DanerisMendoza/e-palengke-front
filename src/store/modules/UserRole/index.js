import UserRole from '@/api/modules/UserRole/index'

export default {
    state: {
        USER_ROLES: [],
        SELECTED_ROLE: null,
        APPLICANTS: [],
    },
    
    getters: {
        USER_ROLES:(state) => state.USER_ROLES,
        SELECTED_ROLE:(state) => state.SELECTED_ROLE,
        APPLICANTS:(state) => state.APPLICANTS,
    },

    mutations: {
        USER_ROLES:(state, data)=>{state.USER_ROLES = data},
        SELECTED_ROLE:(state, data)=>{state.SELECTED_ROLE = data},
        APPLICANTS:(state, data)=>{state.APPLICANTS = data},
    },

    actions: {
        APPROVE_USER_ROLE({commit},payload){
            return new Promise((resolve,reject)=>{
            UserRole.ApproveUserRole(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
    
        DISAPPROVE_USER_ROLE({commit},payload){
            return new Promise((resolve,reject)=>{
            UserRole.DissaproveUserRole(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        
        GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS({commit}){
            return new Promise((resolve,reject)=>{
            UserRole.GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS().then((response)=>{
                commit('USER_ROLES', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

        GET_APPLICANTS({commit}){
            return new Promise((resolve,reject)=>{
            UserRole.GetApplicants().then((response)=>{
                commit('APPLICANTS', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

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

        UPDATE_USER_ROLE_BY_ID({commit},payload){
            return new Promise((resolve,reject)=>{
            UserRole.UPDATE_USER_ROLE_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
    }
}