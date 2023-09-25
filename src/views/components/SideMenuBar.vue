<template>
  <div>
    <v-list dense v-model="drawer" :mini-variant="isMobile">
      <v-list-item>
        <v-list-title>
          <h2 class="epalengke-title">E-PALENKE ADMIN</h2>
        </v-list-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-content
        v-for="side_nav in SIDE_NAV"
        :key="side_nav.id"
        @click="navigateToRoute(side_nav.name, side_nav.id)"
      >
        <v-list-item :to="{ name: side_nav.name, params: { id: side_nav.id } }">
          {{ side_nav.name }}
        </v-list-item>
      </v-list-content>
    </v-list>

    <v-list>
      <v-divider></v-divider>
      <v-list-item @click="submitLogout()"> LOGOUT </v-list-item>
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
.epalengke-title{
  margin: 5px 0 5px;
}
</style>