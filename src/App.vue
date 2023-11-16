<template>
  <v-app>
    <v-main>
      <template v-if="$route.meta.showSideMenuBar">
        <v-navigation-drawer app v-model="drawer" color="primary" dark>
          <SideMenuBar />
        </v-navigation-drawer>
        <v-app-bar app elevation="0" color="white">
          <v-icon @click="toggleSidebar">mdi-menu</v-icon>

          <v-spacer></v-spacer>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <div>
                  <img
                    :src="require('@/assets/sample.jpg')"
                    alt="Profile Picture"
                    width="50"
                    class="mr-2 profile-picture"
                  />
                </div>
                {{ USER_DETAILS.name }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-btn plain color="error" @click="submitLogout()"
                  ><v-icon class="mr-2">mdi-power</v-icon>Logout</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
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

<style scoped>
.profile-picture {
  border-radius: 2rem;
  border: 1px solid rgb(130, 128, 128);
}
</style>
