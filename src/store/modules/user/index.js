import user from '@/api/modules/users/index'

export default {
    state: {
    
    },
    
    getters: {

    },

    mutations: {

    },

    actions: {
        LOGIN({commit}, payload){
            return new Promise((resolve,reject)=>{
            user.LOGIN(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
          },
        // saveUser({commit}, payload){
        //     return new Promise((resolve,reject)=>{
        //     user.saveUser(payload.params,payload.config).then((response)=>{
        //         resolve(response.data)
        //       }).catch((error)=>{
        //           reject(error)
        //       });
        //     })
        //   },
        // request({commit}, payload){
        //     return new Promise((resolve,reject)=>{
        //     user.request(payload).then((response)=>{
        //         resolve(response.data)
        //       }).catch((error)=>{
        //           reject(error)
        //       });
        //     })
        //   },
        // readUserDataTable({commit}, payload){
        //     return new Promise((resolve,reject)=>{
        //     user.readUserDataTable(payload).then((response)=>{
        //         resolve(response.data)
        //       }).catch((error)=>{
        //           reject(error)
        //       });
        //     })
        //   },
        //   deleteUserById({commit}, payload){
        //     return new Promise((resolve,reject)=>{
        //     user.deleteUserById(payload).then((response)=>{
        //         resolve(response.data)
        //       }).catch((error)=>{
        //           reject(error)
        //       });
        //     })
        //   },
    }
}