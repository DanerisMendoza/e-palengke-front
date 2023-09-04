import UserRole from '@/api/modules/UserRole/index'

export default {
    state: {
    },
    
    getters: {
    },

    mutations: {
    },

    actions: {
        SUBMIT_APPLICANT_CREDENTIAL({commit}, payload){
            return new Promise((resolve,reject)=>{
                UserRole.SUBMIT_APPLICANT_CREDENTIAL(payload.params,payload.config).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
    }
}