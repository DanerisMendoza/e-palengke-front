import api from '@/api/index'

export default {
    login(params){
        return api.post('api/loginUser',params);
    },
    // saveUser(params,config){
    //     return api.post('api/createUser',params,config.headers);
    // },
    // request(params){
    //     return api.post('api/request',params);
    // },
    // readUserDataTable(params) {
    //     return api.get(`api/readUserDataTable`, {params});
    // },
    // deleteUserById(params) {
    //     return api.delete(`api/deleteUserById`, {params});
    // },
}