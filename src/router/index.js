import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/SideNav/Login.vue';
import Requirement from '@/views/SideNav/Requirement.vue';
import Application from '@/views/SideNav/Application.vue';
import Registration from '@/views/SideNav/Registration.vue';
import EndUser from '@/views/SideNav/EndUser.vue';
import Admin from '@/views/SideNav/Admin.vue';
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
    component: Login
  },
  {
    path: '/Requirement',
    name: 'Requirement',
    component: Requirement
  },
  {
    path: '/Application',
    name: 'Application',
    component: Application
  },
  {
    path: '/Registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/EndUser',
    name: 'EndUser',
    component: EndUser
  },
  {
    path: '/Map',
    name: 'Map',
    component: Map
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach(async (to, from, next) => {
  // Check if the user is already authenticated
  try {
    const response = await user.authenticated();
    
    // If authenticated, and the user is trying to access the 'Login' route, redirect to the homepage
    if (to.name === 'Login') {
      next({ name: response.data[0].name }); 
    } else {
      const hasPermission = response.data.some(permission => permission.name === to.name);
      if (hasPermission) {
        next();
      } else {
        next({ name: response.data[0].name }); 
      }
    }
  } catch (error) {
    // If not authenticated, check if the user is trying to access the 'Login' route
    if (to.name !== 'Login') {
      try {
        await user.authenticated().then((response) => {
          console.log(response);
          next();
        });
      } catch (error) {
        console.error('Authentication error:', error);
        next({ name: 'Login' });
      }
    } else {
      // If the user is not authenticated and is trying to access the 'Login' route, allow access
      next();
    }
  }
});


export default router;
