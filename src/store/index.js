import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/User'
import RequirementDetail from '@/store/modules/RequirementDetail'
import Map from '@/store/modules/Map'
import StoreTypeDetail from '@/store/modules/StoreTypeDetail'
import ProductTypeDetail from '@/store/modules/ProductTypeDetail'
import UserRole from '@/store/modules/UserRole'
import UserRoleDetail from '@/store/modules/UserRoleDetail'
import ApplicantCredential from '@/store/modules/ApplicantCredential'
import Store from '@/store/modules/Store'
import Product from '@/store/modules/Product'

Vue.use(Vuex)

export default new Vuex.Store({
  
  strict: false,
  modules: {
    User,
    RequirementDetail,
    Map,
    StoreTypeDetail,
    ProductTypeDetail,
    UserRole,
    ApplicantCredential,
    UserRoleDetail,
    Store,
    Product,
  }
})
