<template>
  <div>
    <v-app-bar>
      <h1>E-Palengke</h1>
    </v-app-bar>

    <v-list v-model="drawer" :mini-variant="isMobile">
      <v-list>
        <v-list-item
          v-for="side_nav in SIDE_NAV"
          :key="side_nav.id"
          @click="navigateToRoute(side_nav.name, side_nav.id)"
        >
          <v-list-item-content>
            <router-link
              :to="{ name: side_nav.name, params: { id: side_nav.id } }"
              class="white--text side_nav_link"
            >
              {{ side_nav.name }}
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="submitLogout()">
          <v-list-item-title> LOGOUT </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  data: () => ({
    closeOnClick: false,
    selectedItem: 1,
    drawer: true,
    drawer: !this.isMobile,
  }),
  methods: {
    submitLogout() {
      this.$store.dispatch("Logout").then((response) => {
        if (response === "success") {
          localStorage.removeItem("token");
          this.$store.commit("SIDE_NAV", null);
          this.$store.commit("USER_DETAILS", { name: null });
          this.$router.push("/Login");
        }
      });
    },

    navigateToRoute(routeName, id) {
      this.$router.push({ name: routeName, params: { id } });
    },
  },
  computed: {
    ...mapGetters(["SIDE_NAV", "USER_DETAILS"]),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown; // Hide the sidebar on small screens
    },
  },

  mounted() {
    this.$store.dispatch("GetUserDetails").then(() => {
      console.log(this.USER_DETAILS);
    });
    this.$store.dispatch("GetSideNav");
  },
};
</script>

<style scoped>
.side_nav_link {
  text-decoration: none;
}
</style>