<template>
  <div>
    <v-list dense v-model="drawer" :mini-variant="isMobile">
      <div class="logo text-center">
        <img src="../../assets/white-ep-2.png" alt="Logo" width="150" />
      </div>
      <v-toolbar-title class="text-center mb-3">E-Palengke</v-toolbar-title>
    </v-list>

    <!-- SIDEBAR -->
    <v-list
      v-for="item in SIDE_NAV"
      :key="item.id"
      :class="{ 'active-item': isParentActive(item.name) }"
    >
      <v-list-item
        v-if="(!item.side_nav_children || item.side_nav_children.length === 0) "
        :to="{ name: item.name, params: { id: item.id } }"
      >
        <v-icon class="ml-3 mr-3">{{ item.mdi_icon }}</v-icon>
        {{ item.name }}
      </v-list-item>

      <!-- DROPDOWN -->
      <v-list-group
        v-else
        :value="isParentActive(item.name)"
        color="white"
        active-class="my-active-class"
      >
        <template v-slot:activator>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="child in item.side_nav_children"
          :key="child.id"
          class="childSideNav"
          :to="{ name: child.name, params: { id: child.id } }"
        >
          <!-- <v-icon class="mr-2">{{ child.mdi_icon }}</v-icon> -->
          {{ child.name }}
        </v-list-item>
      </v-list-group>
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
      this.$store.commit(
        "PROFILE_PATH",
        this.USER_DETAILS.base64img == null
          ? require("../../assets/sample.jpg")
          : this.USER_DETAILS.base64img
      );
    });
    this.$store.dispatch("GetSideNav").then((response) => {
      // console.log(response);
    });
  },
};
</script>

<style scoped>
/* .childSideNav {
  margin-left: 20px;
}

.e-palengke {
  font-size: 1.95rem;
  font-weight: 800;
} */
.logo {
  padding: 1.5rem 1rem 0.5rem;
}
</style>
