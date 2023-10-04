<template>
  <v-app>
    <v-main>
      <template v-if="$route.meta.showSideMenuBar">
        <v-navigation-drawer app v-model="drawer" color="secondary" dark>
          <SideMenuBar />
        </v-navigation-drawer>
        <v-app-bar app elevation="0" color="white">
          <v-icon @click="toggleSidebar">mdi-menu</v-icon>
          <label class="ml-3">Name: {{ USER_DETAILS.name }}</label>
        </v-app-bar>
      </template>
      <template v-if="$route.meta.showNavBar">
        <v-app-bar app dark elevation="0">
          <NavBar />
        </v-app-bar>
      </template>
      <router-view v-if="routerViewVisible" />
    </v-main>
  </v-app>
</template>

<script>
import SideMenuBar from "@/views/components/SideMenuBar.vue";
import NavBar from "@/views/components/NavBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { SideMenuBar, NavBar },
  data: () => ({
    routerViewVisible: false,
    drawer: true,
    navbarColor: "white",
  }),
  async created() {
    // Simulate a delay of 1 second (adjust as needed)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // After the delay, set routerViewVisible to true to render the router-view
    this.routerViewVisible = true;
  },
  computed: {
    ...mapGetters(["SIDE_NAV", "USER_DETAILS"]),
  },
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style>
* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
