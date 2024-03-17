<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Profile</p>
      </div>

      <Profile v-if="PROFILE_UPDATE == null" />
      <profileUpdate v-else />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Profile from "../components/Profile.vue";
import profileUpdate from "@/views/components/profileUpdate.vue";
export default {
  components: { Profile, profileUpdate },
  computed: {
    ...mapGetters(["PROFILE_UPDATE"]),
  },
  mounted() {
    this.$store.commit("PROFILE_UPDATE", null);
  },
};
</script>

<style scoped>
.page-title p {
  margin-bottom: 1rem;
  color: #0c3a68;
}
.container {
  padding: 0 2.5rem 0;
}
</style>
