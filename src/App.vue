<template>
  <v-app>
    <div v-if="$route.meta.showSideMenuBar">
      <v-navigation-drawer
        app
        v-model="drawer"
        color="primary"
        dark
        :width="drawerWidth"
      >
        <SideMenuBar />
      </v-navigation-drawer>

      <v-app-bar app elevation="0" color="#C8E0F6">
        <v-icon @click="toggleSidebar" class="ml-5 mr-2" color="#0C3A68"
          >mdi-menu</v-icon
        >
        <!-- <v-toolbar-title>{{ $route.name }}</v-toolbar-title> -->
        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              {{ USER_DETAILS.name }}
              <div>
                <img
                  :src="PROFILE_PATH"
                  alt="Profile Picture"
                  width="50"
                  class="mr-2"
                />
              </div>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn text block color="error" @click="submitLogout()">
                Logout
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>

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
    navbarColor: "white",
    drawerWidth: 300, // Adjust this value according to your preference
  }),
  async created() {
    // Simulate a delay of 1 second (adjust as needed)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // After the delay, set routerViewVisible to true to render the router-view
    this.routerViewVisible = true;
  },
  computed: {
    ...mapGetters(["SIDE_NAV", "USER_DETAILS", "PROFILE_PATH"]),
  },
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer;
      this.$store.commit("SIDE_NAV_TOGGLE", this.drawer);
    },
    submitLogout() {
      this.$store.dispatch("Logout").then((response) => {
        if (response === "success") {
          localStorage.removeItem("token");
          this.$store.commit("SIDE_NAV", null);
          this.$store.commit("USER_DETAILS", {});
          this.$router.push("/Login");
        }
      });
    },
  },
};
</script>
