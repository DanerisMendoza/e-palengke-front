import user from '@/api/modules/users/index'

export default {
    state: {
      SIDE_NAV: [],
      ALL_SIDE_NAV: []
    },
    
    getters: {
      SIDE_NAV:(state) => state.SIDE_NAV,
      ALL_SIDE_NAV:(state) => state.ALL_SIDE_NAV,
    },

    mutations: {
      SIDE_NAV:(state, data)=>{state.SIDE_NAV = data},
      ALL_SIDE_NAV:(state, data)=>{state.ALL_SIDE_NAV = data},
    },

    actions: {
      authenticate(){
            return new Promise((resolve,reject)=>{
            user.authenticate().then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
          },
      GetSideNav({commit}){
            return new Promise((resolve,reject)=>{
            user.GetSideNav().then((response)=>{
                commit('SIDE_NAV', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
          },
        GetAllSideNav({commit}){
            return new Promise((resolve,reject)=>{
            user.GetAllSideNav().then((response)=>{
                commit('ALL_SIDE_NAV', response.data)
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
          },
        Logout(){
            return new Promise((resolve,reject)=>{
            user.Logout().then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
          },
        LOGIN({commit}, payload){
            return new Promise((resolve,reject)=>{
            user.LOGIN(payload).then((response)=>{
                resolve(response.data)
              }).catch((error)=>{
                  reject(error)
              });
            })
          },
        Register({commit}, payload){
          return new Promise((resolve,reject)=>{
          user.Register(payload).then((response)=>{
              resolve(response.data)
            }).catch((error)=>{
                reject(error)
            });
          })
        },
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