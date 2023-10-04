import api from '@/api/index'

export default {
    GetOrdersByStoreId(params){
        return api.get(`api/GetOrdersByStoreId/${params}`);
    },
    GetOrdersByUserId(){
        return api.get('api/GetOrdersByUserId');
    },
    Order(params){
        return api.post('api/Order',params);
    },
}