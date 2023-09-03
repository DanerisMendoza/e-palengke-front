import api from '@/api/index'

export default {
    getRequirementDetail(){
        return api.get('api/RequirementDetail');
    },
    GET_REQUIREMENT_DETAIL_BY_ID(params){
        return api.get(`api/RequirementDetail/${params}`);
    },
    STORE_REQUIREMENT_DETAIL(params){
        return api.post('api/RequirementDetail',params);
    },
    updateRequirementDetailById(params){
        return api.put(`api/RequirementDetail/${params.id}`,params.request);
    },
    deleteRequirementDetailById(params){
        return api.delete(`api/RequirementDetail/${params}`);
    }
}