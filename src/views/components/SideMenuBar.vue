<template>
  <div>
    <v-list dense v-model="drawer" :mini-variant="isMobile">
      <p class="e-palengke ma-0 pa-0 ml-5">E-PALENGKE</p>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <!-- SIDEBAR -->
      <v-list
        v-for="side_nav in SIDE_NAV"
        :key="side_nav.id"
        :class="{ 'active-item': isParentActive(side_nav.name) }"
      >
        <v-list-item
          v-if="
            !side_nav.side_nav_children ||
            side_nav.side_nav_children.length === 0
          "
          :to="{ name: side_nav.name, params: { id: side_nav.id } }"
        >
          <v-icon class="mr-3">{{ side_nav.mdi_icon }}</v-icon>
          {{ side_nav.name }}
        </v-list-item>

        <!-- DROPDOWN -->
        <v-list-group
          v-else
          :value="isParentActive(side_nav.name)"
          color="white"
          active-class="my-active-class"
        >
          <template v-slot:activator>
            <v-list-item-title>
              <v-icon class="mr-3">{{ side_nav.mdi_icon }}</v-icon>
              {{ side_nav.name }}
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="child in side_nav.side_nav_children"
            :key="child.id"
            :to="{ name: child.name, params: { id: child.id } }"
            style="background: rgb(35, 105, 176)"
          >
            <!-- <v-icon class="mr-3">{{ child.mdi_icon }}</v-icon> -->
            {{ child.name }}
          </v-list-item>
        </v-list-group>
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
    };
  },

  methods: {
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
      // console.log(response);
    });
  },
};
</script>

<style scoped>
.e-palengke {
  font-size: 1.95rem;
  font-weight: 800;
}
</style>
