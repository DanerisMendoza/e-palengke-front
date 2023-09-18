<template>
  <v-app>
    <template v-if="$route.meta.showSideMenuBar">
      <v-navigation-drawer app dark v-model="drawer">
        <SideMenuBar />
      </v-navigation-drawer>
      <v-app-bar app dark>
        <v-btn @click="toggleSidebar">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
        Name: {{ USER_DETAILS.name }}
      </v-app-bar>
    </template>
    <v-main>
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
