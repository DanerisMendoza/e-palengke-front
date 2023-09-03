import api from '@/api/index'

export default {
    getRequirementDetail(){
        return api.get('api/RequirementDetail');
    },
    getRequirementDetailtById(params){
        return api.get(`api/RequirementDetail/${params}`);
    },
    storeRequirementDetail(params){
        return api.post('api/RequirementDetail',params);
    },
    updateRequirementDetailById(params){
        return api.put(`api/RequirementDetail/${params.id}`,params.request);
    },
    deleteRequirementDetailById(params){
        return api.delete(`api/RequirementDetail/${params}`);
    }
}