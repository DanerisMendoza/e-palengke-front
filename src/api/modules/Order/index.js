import api from '@/api/index'

export default {
    GetOrders(){
        return api.get('api/GetOrders');
    },
    Order(params){
        return api.post('api/Order',params);
    },
}