import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import requirement from '@/store/modules/requirement'
import RequirementDetail from '@/store/modules/RequirementDetail'
import map from '@/store/modules/map'
import StoreTypeDetail from '@/store/modules/StoreTypeDetail'
import UserRole from '@/store/modules/UserRole'

Vue.use(Vuex)

export default new Vuex.Store({
  
  strict: false,
  modules: {
    user,
    requirement,
    RequirementDetail,
    map,
    StoreTypeDetail,
    UserRole,
  }
})
