<template>
  <div>
    <v-app-bar elevation="0" color="secondary">
      <h1>E-PALENGKE</h1>
    </v-app-bar>

    <v-divider></v-divider>

    <v-list v-model="drawer" :mini-variant="isMobile">
      <v-list>
        <v-list-item
          v-for="side_nav in SIDE_NAV"
          :key="side_nav.id"
          @click="navigateToRoute(side_nav.name, side_nav.id)"
          :class="{ 'active-item': isParentActive(side_nav.name) }"
        >
          <v-list-item-content>
            <router-link
              :to="{ name: side_nav.name, params: { id: side_nav.id } }"
              class="white--text side_nav_link"
              exact-active-class=""
            >
              {{ side_nav.name }}
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="submitLogout()">
          <v-list-item-title>LOGOUT</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      closeOnClick: false,
      selectedItem: 1,
      drawer: true,
      drawer: !this.isMobile,
    };
  },

  methods: {
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

    navigateToRoute(routeName, id) {
      this.$router.push({ name: routeName, params: { id } });
    },

    isParentActive(routeName) {
      // Check if any child route of the given parent route is active
      return this.$route.matched.some((route) => route.name === routeName);
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

.active-item {
  background-color: #606060; /* Change to the color you want for the active item */
}
</style>
