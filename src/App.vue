<template>
  <v-app>
    <template v-if="$route.meta.showSideMenuBar">
      <v-navigation-drawer
        app
        dark
        v-model="drawer"
        :style="{ backgroundColor: sidebarBackgroundColor }"
      >
        <SideMenuBar />
      </v-navigation-drawer>
    </template>
    <v-main>
      <v-container>
        <v-app-bar
          app
          dark
          :style="{ backgroundColor: sidebarBackgroundColor }"
        >
          <v-btn @click="toggleSidebar" elevation="0" color="black">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-app-bar>
      </v-container>
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
    sidebarBackgroundColor: "black",
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
