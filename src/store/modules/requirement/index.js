import requirement from '@/api/modules/requirements/index'

export default {
    state: {
        REQUIREMENTS: [],
        SELECTED_REQUIREMENT: null,
        REQUIREMENT_DIALOG: false
    },
    
    getters: {
        REQUIREMENTS:(state) => state.REQUIREMENTS,
        SELECTED_REQUIREMENT:(state) => state.SELECTED_REQUIREMENT,
        REQUIREMENT_DIALOG:(state) => state.REQUIREMENT_DIALOG,
    },

    mutations: {
        REQUIREMENTS:(state, data)=>{state.REQUIREMENTS = data},
        SELECTED_REQUIREMENT:(state, data)=>{state.SELECTED_REQUIREMENT = data},
        REQUIREMENT_DIALOG:(state, data)=>{state.REQUIREMENT_DIALOG = data},
    },

    actions: {
        getRequirements({commit}){
            return new Promise((resolve,reject)=>{
            requirement.getRequirements().then((response)=>{
                console.log(response.data)
                commit('REQUIREMENTS', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        getRequirementById({commit}, payload){
            return new Promise((resolve,reject)=>{
            requirement.getRequirementById(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        
        createRequirement({commit}, payload){
            return new Promise((resolve,reject)=>{
            requirement.createRequirement(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

        updateRequirementById({commit}, payload){
            return new Promise((resolve,reject)=>{
            requirement.updateRequirementById(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

        deleteRequirementById({commit}, payload){
            return new Promise((resolve,reject)=>{
            requirement.deleteRequirementById(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
    }
}