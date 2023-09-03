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
        storeRequirementDetail({commit}, payload){
            return new Promise((resolve,reject)=>{
                RequirementDetail.storeRequirementDetail(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        getRequirementDetailtById({commit}, payload){
            return new Promise((resolve,reject)=>{
                RequirementDetail.getRequirementDetailtById(payload).then((response)=>{
                commit('REQUIREMENT_DETAILS', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
    }
}