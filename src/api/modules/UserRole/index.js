import api from '@/api/index'

export default {
    GetUserRoleWithAccessessAndRequirements(){
        return api.get('api/Get_UserRole_With_Accessess_And_Requirements');
    },
    GET_USER_ROLE(){
        return api.get('api/UserRole');
    },
    GET_USER_ROLE_BY_ID(params){
        return api.get(`api/UserRole/${params}`);
    },
    STORE_USER_ROLE(params){
        return api.post('api/UserRole',params);
    },
    UPDATE_USER_ROLE_BY_ID(params){
        return api.put(`api/UserRole/${params.id}`,params);
    },
    DELETE_USER_ROLE_BY_ID(params){
        return api.delete(`api/UserRole/${params}`);
    },
}