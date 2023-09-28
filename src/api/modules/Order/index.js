import api from '@/api/index'

export default {
    GetOrdersByStoreId(params){
        return api.get(`api/GetOrdersByStoreId/${params}`);
    },
    Order(params){
        return api.post('api/Order',params);
    },
}