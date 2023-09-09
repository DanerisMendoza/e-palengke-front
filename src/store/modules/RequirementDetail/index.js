import RequirementDetail from '@/api/modules/RequirementDetail/index'

export default {
    state: {
        REQUIREMENT_DETAILS: [],
        APPLICANT_CREDENTIALS: [],
        SELECTED_REQUIREMENT_DETAILS: null,
    },
    
    getters: {
        REQUIREMENT_DETAILS:(state) => state.REQUIREMENT_DETAILS,
        APPLICANT_CREDENTIALS:(state) => state.APPLICANT_CREDENTIALS,
        SELECTED_REQUIREMENT_DETAILS:(state) => state.SELECTED_REQUIREMENT_DETAILS,
    },

    mutations: {
        REQUIREMENT_DETAILS:(state, data)=>{state.REQUIREMENT_DETAILS = data},
        APPLICANT_CREDENTIALS:(state, data)=>{state.APPLICANT_CREDENTIALS = data},
        SELECTED_REQUIREMENT_DETAILS:(state, data)=>{state.SELECTED_REQUIREMENT_DETAILS = data},
    },

    actions: {
        GET_REQUIREMENT_DETAILS({commit}){
            return new Promise((resolve,reject)=>{
            RequirementDetail.GET_REQUIREMENT_DETAIL().then((response)=>{
                commit('REQUIREMENT_DETAILS', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

        STORE_REQUIREMENT_DETAIL({commit}, payload){
            return new Promise((resolve,reject)=>{
                RequirementDetail.STORE_REQUIREMENT_DETAIL(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        GET_REQUIREMENT_DETAIL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                RequirementDetail.GET_REQUIREMENT_DETAIL_BY_ID(payload).then((response)=>{
                commit('REQUIREMENT_DETAILS', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
  
        GET_REQUIREMENT_DETAIL_BY_USER_ROLE_DETAILS_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                RequirementDetail.GET_REQUIREMENT_DETAIL_BY_USER_ROLE_DETAILS_ID(payload).then((response)=>{
                // commit('REQUIREMENT_DETAILS', response.data)
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
        
        DELETE_REQUIREMENT_DETAIL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                RequirementDetail.DELETE_REQUIREMENT_DETAIL_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

        UPDATE_REQUIREMENT_DETAIL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                RequirementDetail.UPDATE_REQUIREMENT_DETAIL_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        
    }
}