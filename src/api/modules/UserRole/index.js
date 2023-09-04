import api from '@/api/index'

export default {
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
        return api.put(`api/UserRole/${params.id}`,params.request);
    },
    DELETE_USER_ROLE_BY_ID(params){
        return api.delete(`api/UserRole/${params}`);
    },
    SUBMIT_APPLICANT_CREDENTIAL(params,config){
        return api.post('api/SubmitApplicantCrendential',params,config.headers);
    }
}