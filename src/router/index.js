import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/SideNav/Login.vue';
import RequirementDetail from '@/views/SideNav/RequirementDetail.vue';
import Application from '@/views/SideNav/Application.vue';
import Registration from '@/views/SideNav/Registration.vue';
import EndUser from '@/views/SideNav/EndUser.vue';
import Admin from '@/views/SideNav/Admin.vue';
import UserRole from '@/views/SideNav/UserRole.vue';
import Delivery from '@/views/SideNav/Delivery.vue';
import Store from '@/views/SideNav/Store.vue';
import Map from '@/views/components/Map.vue';
import user from '@/api/modules/users/index'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'Login' } // Redirect to the named route
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      showSideMenuBar: false, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
      Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
      user.authenticated().then((response)=>{
        const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
        Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
        next({ name: response.data[0].name });
      }).catch((error)=>{
        next();
      });
    },
  },
  {
    path: '/UserRole',
    name: 'UserRole',
    component: UserRole,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user.authenticated().then((response)=>{
        const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
        Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
        const hasPermission = response.data.some(permission => permission.name === to.name);
        if (hasPermission) {
          next();
        } else {
          next({ name: response.data[0].name });
        }
      }).catch((error)=>{
        next({ name: 'Login' });
      });
    },
  },
  {
    path: '/RequirementDetail',
    name: 'RequirementDetail',
    component: RequirementDetail,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user.authenticated().then((response)=>{
        const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
        Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
        const hasPermission = response.data.some(permission => permission.name === to.name);
        if (hasPermission) {
          next();
        } else {
          next({ name: response.data[0].name });
        }
      }).catch((error)=>{
        next({ name: 'Login' });
      });
    },
  },
  {
    path: '/Application',
    name: 'Application',
    component: Application,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user.authenticated().then((response)=>{
        const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
        Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
        const hasPermission = response.data.some(permission => permission.name === to.name);
        if (hasPermission) {
          next();
        } else {
          next({ name: response.data[0].name });
        }
      }).catch((error)=>{
        next({ name: 'Login' });
      });
    },
  },
  {
    path: '/Registration',
    name: 'Registration',
    component: Registration,
    meta: {
      showSideMenuBar: false, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
      Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
      user.authenticated().then((response)=>{
        next({ name: response.data[0].name });
      }).catch((error)=>{
        next();
      });
    },
  },
  {
    path: '/EndUser',
    name: 'EndUser',
    component: EndUser,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user.authenticated().then((response)=>{
        const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
        Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
        const hasPermission = response.data.some(permission => permission.name === to.name);
        if (hasPermission) {
          next();
        } else {
          next({ name: response.data[0].name });
        }
      }).catch((error)=>{
        next({ name: 'Login' });
      });
    },
  },
  {
    path: '/Delivery',
    name: 'Delivery',
    component: Delivery,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user.authenticated().then((response)=>{
        const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
        Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
        const hasPermission = response.data.some(permission => permission.name === to.name);
        if (hasPermission) {
          next();
        } else {
          next({ name: response.data[0].name });
        }
      }).catch((error)=>{
        next({ name: 'Login' });
      });
    },
  },
  {
    path: '/Store',
    name: 'Store',
    component: Store,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user.authenticated().then((response)=>{
        const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
        Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
        const hasPermission = response.data.some(permission => permission.name === to.name);
        if (hasPermission) {
          next();
        } else {
          next({ name: response.data[0].name });
        }
      }).catch((error)=>{
        next({ name: 'Login' });
      });
    },
  },
  {
    path: '/Map',
    name: 'Map',
    component: Map
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user.authenticated().then((response)=>{
        const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
        Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
        const hasPermission = response.data.some(permission => permission.name === to.name);
        if (hasPermission) {
          next();
        } else {
          next({ name: response.data[0].name });
        }
      }).catch((error)=>{
        next({ name: 'Login' });
      });
    },
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
