import ApplicantCredential from '@/api/modules/ApplicantCredential/index'

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
                ApplicantCredential.SUBMIT_APPLICANT_CREDENTIAL(payload.params,payload.config).then((response)=>{
                resolve(response.data)
            }).catch((error)=>{
                  reject(error)
                });
            })
        },
    }
}