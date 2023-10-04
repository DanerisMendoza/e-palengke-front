import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/SideNav/Login.vue";
import RequirementDetail from "@/views/SideNav/RequirementDetail.vue";
import Registration from "@/views/SideNav/Registration.vue";
import Admin from "@/views/SideNav/Admin.vue";
import UserRole from "@/views/SideNav/UserRole.vue";
import Delivery from "@/views/SideNav/Delivery.vue";
import Applicants from "@/views/SideNav/Applicants.vue";
import Map from "@/views/components/Map.vue";
import user from "@/api/modules/users/index";
import ProductTypeDetails from "@/views/SideNav/ProductTypeDetails.vue";
import INVENTORY from "@/views/SideNav/Inventory.vue";
import StoreTypeDetails from "@/views/SideNav/StoreTypeDetails.vue";

import HOME from "@/views/NavBar/Home.vue";
import Application from "@/views/NavBar/Application.vue";
import PROFILE from "@/views/NavBar/Profile.vue";
import Store from "@/views/NavBar/Store.vue";
import TOPUP from "@/views/NavBar/Topup.vue";
import ORDERS from "@/views/NavBar/Orders.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Login" }, // Redirect to the named route
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      showSideMenuBar: false, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
      Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          next({ name: response.data[0].name });
        })
        .catch((error) => {
          next();
        });
    },
  },
  {
    path: "/USER%20ROLE",
    name: "USER ROLE",
    component: UserRole,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/REQUIREMENT%20DETAILS",
    name: "REQUIREMENT DETAILS",
    component: RequirementDetail,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/APPLICATION",
    name: "APPLICATION",
    component: Application,
    meta: {
      showNavBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowNavBar = to.meta.showNavBar !== false;
          Vue.prototype.$showNavBar = shouldShowNavBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/Registration",
    name: "Registration",
    component: Registration,
    meta: {
      showSideMenuBar: false, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
      Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
      user
        .authenticated()
        .then((response) => {
          next({ name: response.data[0].name });
        })
        .catch((error) => {
          next();
        });
    },
  },
  {
    path: "/HOME",
    name: "HOME",
    component: HOME,
    meta: {
      showNavBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowNavBar = to.meta.showNavBar !== false;
          Vue.prototype.$showNavBar = shouldShowNavBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/DELIVERY",
    name: "DELIVERY",
    component: Delivery,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/STORE",
    name: "STORE",
    component: Store,
    meta: {
      showNavBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowNavBar = to.meta.showNavBar !== false;
          Vue.prototype.$showNavBar = shouldShowNavBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/Map",
    name: "Map",
    component: Map,
  },
  {
    path: "/ADMIN",
    name: "ADMIN",
    component: Admin,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/APPLICANTS",
    name: "APPLICANTS",
    component: Applicants,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },

  {
    path: "/PRODUCT%20TYPE%20DETAILS",
    name: "PRODUCT TYPE DETAILS",
    component: ProductTypeDetails,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/INVENTORY",
    name: "INVENTORY",
    component: INVENTORY,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/PROFILE",
    name: "PROFILE",
    component: PROFILE,
    meta: {
      showNavBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowNavBar = to.meta.showNavBar !== false;
          Vue.prototype.$showNavBar = shouldShowNavBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/STORE%20TYPE%20DETAILS",
    name: "STORE TYPE DETAILS",
    component: StoreTypeDetails,
    meta: {
      showSideMenuBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowSideMenuBar = to.meta.showSideMenuBar !== false;
          Vue.prototype.$showSideMenuBar = shouldShowSideMenuBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/TOPUP",
    name: "TOPUP",
    component: TOPUP,
    meta: {
      showNavBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowNavBar = to.meta.showNavBar !== false;
          Vue.prototype.$showNavBar = shouldShowNavBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
  {
    path: "/ORDERS",
    name: "ORDERS",
    component: ORDERS,
    meta: {
      showNavBar: true, // Set to false to hide the SideMenuBar for the login page
    },
    beforeEnter: (to, from, next) => {
      user
        .authenticated()
        .then((response) => {
          const shouldShowNavBar = to.meta.showNavBar !== false;
          Vue.prototype.$showNavBar = shouldShowNavBar;
          const hasPermission = response.data.some(
            (permission) => permission.name === to.name
          );
          if (hasPermission) {
            next();
          } else {
            next({ name: response.data[0].name });
          }
        })
        .catch((error) => {
          next({ name: "Login" });
        });
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
