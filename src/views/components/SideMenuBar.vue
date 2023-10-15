<template>
  <div>
    <v-list dense v-model="drawer" :mini-variant="isMobile">
      <v-list-item>
        <v-list-item-title>
          <h2 class="epalengke-title">E-PALENGKE ADMIN</h2>
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list v-for="side_nav in SIDE_NAV" :key="side_nav.id" @click="handleItemClick(side_nav)"
        :class="{ 'active-item': isParentActive(side_nav.name) }">
        <v-list-item v-if="!side_nav.side_nav_children || side_nav.side_nav_children.length === 0"
          :to="{ name: side_nav.name, params: { id: side_nav.id } }">
          {{ side_nav.name }}
        </v-list-item>

        <v-list-group v-else :value="isParentActive(side_nav.name)" color="white" active-class="my-active-class">
          <template v-slot:activator>
            <v-list-item-title>
              {{ side_nav.name }}
            </v-list-item-title>
          </template>
          <v-list-item v-for="child in side_nav.side_nav_children" :key="child.id" class="childSideNav"
            :to="{ name: child.name, params: { id: child.id } }">
            {{ child.name }}
          </v-list-item>
        </v-list-group>

      </v-list>

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

    handleItemClick(side_nav) {
      console.log(side_nav)
      if (!side_nav.side_nav_children || side_nav.side_nav_children.length === 0) {
        // this.navigateToRoute(side_nav.name, side_nav.id);
      }
    },

    navigateToRoute(child) {
      console.log(child)
      this.$router.push("/Customer Orders");
    },

    isParentActive(routeName) {
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
    this.$store.dispatch("GetSideNav").then((response) => {
      console.log(response)
    })
  },
};
</script>

<style scoped>
.epalengke-title {
  margin: 6px 0 5px;
}

.active-item {
  /* background-color: #606060; */
  /* Change to the color you want for the active item */
}

.childSideNav {
  /* list-style-type: disc; */
  /* or your preferred bullet style */
  margin-left: 20px;
  /* adjust as needed */
}
</style>
