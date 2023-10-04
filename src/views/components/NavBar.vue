<template>
  <v-container>
    <v-app-bar elevation="0">
      <h2>E-PALENGKE</h2>

      <v-spacer></v-spacer>

      <v-btn
        plain
        v-for="side_nav in SIDE_NAV"
        :key="side_nav.id"
        @click="navigateToRoute(side_nav.name, side_nav.id)"
        :class="{ 'active-item': isParentActive(side_nav.name) }"
      >
        <span
          :to="{ name: side_nav.name, params: { id: side_nav.id } }"
          exact-active-class=""
        >
          {{ side_nav.name }}
        </span>
      </v-btn>
      <v-btn plain @click="submitLogout()">Logout</v-btn>
    </v-app-bar>
  </v-container>
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
  },

  mounted() {
    this.$store.dispatch("GetUserDetails").then(() => {
      console.log(this.USER_DETAILS);
    });
    this.$store.dispatch("GetSideNav");
  },
};
</script>
