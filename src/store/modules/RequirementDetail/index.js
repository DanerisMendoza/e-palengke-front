import RequirementDetail from '@/api/modules/RequirementDetail/index'

export default {
    state: {
        REQUIREMENT_DETAILS: [],
    },
    
    getters: {
        REQUIREMENT_DETAILS:(state) => state.REQUIREMENT_DETAILS,
    },

    mutations: {
        REQUIREMENT_DETAILS:(state, data)=>{state.REQUIREMENT_DETAILS = data},
    },

    actions: {
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
        
        DELETE_REQUIREMENT_DETAIL_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
                RequirementDetail.DELETE_REQUIREMENT_DETAIL_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        
    }
}