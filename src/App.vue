<template>
  <v-app>
    <v-main>
      <template v-if="$route.meta.showSideMenuBar">
        <v-navigation-drawer app v-model="drawer" color="secondary" dark>
          <SideMenuBar />
        </v-navigation-drawer>
        <v-app-bar app elevation="0" color="white">
          <v-icon @click="toggleSidebar">mdi-menu</v-icon>
          <v-row align="center" justify="center">
            <v-col cols="4">
              <label class="ml-3">Name: {{ USER_DETAILS.name }}</label>
            </v-col>
            <v-col cols="8">
              <v-card class="mx-3 pa-1"   :style="{ width: '200px', 'text-align': 'center' }">
                <strong>{{ $route.name }}</strong>
              </v-card>
            </v-col>
          </v-row>
        </v-app-bar>
      </template>
      <router-view v-if="routerViewVisible" />
    </v-main>
  </v-app>
</template>

<script>
import SideMenuBar from "@/views/components/SideMenuBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { SideMenuBar },
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
