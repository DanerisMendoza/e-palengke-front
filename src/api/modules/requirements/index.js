import api from '@/api/index'

export default {
    getRequirements(){
        return api.get('api/requirements');
    },
    getRequirementById(params){
        return api.get(`api/requirements/${params}`);
    },
    createRequirement(params){
        return api.post('api/requirements',params);
    },
    updateRequirementById(params){
        return api.put(`api/requirements/${params.id}`,params.request);
    },
    deleteRequirementById(params){
        return api.delete(`api/requirements/${params}`);
    }
}