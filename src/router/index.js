import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/SideNav/Login.vue";
import RequirementDetail from "@/views/SideNav/RequirementDetail.vue";
import Application from "@/views/SideNav/Application.vue";
import Registration from "@/views/SideNav/Registration.vue";
import Mobile from "@/views/SideNav/Mobile.vue";
import HOME from "@/views/SideNav/Home.vue";
import Admin from "@/views/SideNav/Admin.vue";
import UserRole from "@/views/SideNav/UserRole.vue";
import Delivery from "@/views/SideNav/Delivery.vue";
import Applicants from "@/views/SideNav/Applicants.vue";
import Store from "@/views/SideNav/Store.vue";
import Map from "@/views/components/Map.vue";
import user from "@/api/modules/users/index";
import ProductTypeDetails from "@/views/SideNav/ProductTypeDetails.vue";
import INVENTORY from "@/views/SideNav/Inventory.vue";
import PROFILE from "@/views/SideNav/Profile.vue";
import StoreTypeDetails from "@/views/SideNav/StoreTypeDetails.vue";
import TOPUP from "@/views/SideNav/Topup.vue";
import ORDERS from "@/views/SideNav/Orders.vue";
import CustomerOrders from "@/views/SideNav/Child/CustomerOrders.vue";
import StoreOrders from "@/views/SideNav/Child/StoreOrders.vue";
import DeliveryOrders from "@/views/SideNav/Child/DeliveryOrders.vue";
import LandingPage from "@/views/components/LandingPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "LandingPage" }, // Redirect to the named route
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
    path: "/Mobile",
    name: "Mobile",
    component: Mobile,
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
    path: "/ORDERS",
    name: "ORDERS",
    component: ORDERS,
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
    path: "/CUSTOMER%20ORDERS",
    name: "CUSTOMER ORDERS",
    component: CustomerOrders,
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
    path: "/STORE%20ORDERS",
    name: "STORE ORDERS",
    component: StoreOrders,
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
    path: "/DELIVERY%20ORDERS",
    name: "DELIVERY ORDERS",
    component: DeliveryOrders,
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
    path: "/LandingPage",
    name: "LandingPage",
    component: LandingPage,
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
];

const router = new VueRouter({
  base: "/dist/",
  routes,
});

export default router;
