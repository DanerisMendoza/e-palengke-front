import requirement from '@/api/modules/requirements/index'

export default {
    state: {
        REQUIREMENTS: [],
        SELECTED_REQUIREMENT: null,
        SELECTED_REQUIREMENT_DETAIL: null,
        REQUIREMENT_DETAIL_BOTTOMSHEET: null,
    },
    
    getters: {
        REQUIREMENTS:(state) => state.REQUIREMENTS,
        SELECTED_REQUIREMENT:(state) => state.SELECTED_REQUIREMENT,
        SELECTED_REQUIREMENT_DETAIL:(state) => state.SELECTED_REQUIREMENT_DETAIL,
        REQUIREMENT_DETAIL_BOTTOMSHEET:(state) => state.REQUIREMENT_DETAIL_BOTTOMSHEET,
    },

    mutations: {
        REQUIREMENTS:(state, data)=>{state.REQUIREMENTS = data},
        SELECTED_REQUIREMENT:(state, data)=>{state.SELECTED_REQUIREMENT = data},
        SELECTED_REQUIREMENT_DETAIL:(state, data)=>{state.SELECTED_REQUIREMENT_DETAIL = data},
        REQUIREMENT_DETAIL_BOTTOMSHEET:(state, data)=>{state.REQUIREMENT_DETAIL_BOTTOMSHEET = data},
    },

    actions: {
        GET_REQUIREMENTS({commit}){
            return new Promise((resolve,reject)=>{
            requirement.GET_REQUIREMENTS().then((response)=>{
                commit('REQUIREMENTS', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        GET_REQUIREMENTS_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
            requirement.GET_REQUIREMENTS_BY_ID(payload).then((response)=>{
                commit('REQUIREMENTS', response.data)
                resolve(response)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
        
        CREATE_REQUIREMENT({commit}, payload){
            return new Promise((resolve,reject)=>{
            requirement.CREATE_REQUIREMENT(payload).then((response)=>{
                commit('SELECTED_REQUIREMENT', response.data)
                resolve(response)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

        UPDATE_REQUIREMENT_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
            requirement.UPDATE_REQUIREMENT_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },

        DELETE_REQUIREMENT_BY_ID({commit}, payload){
            return new Promise((resolve,reject)=>{
            requirement.DELETE_REQUIREMENT_BY_ID(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
        },
    }
}