import requirement from '@/api/modules/requirements/index'

export default {
    state: {
    
    },
    
    getters: {

    },

    mutations: {

    },

    actions: {
        getRequirements(){
            return new Promise((resolve,reject)=>{
            requirement.getRequirements().then((response)=>{
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