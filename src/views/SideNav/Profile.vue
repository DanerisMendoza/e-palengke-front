<template>
  <v-app style="background: #d0dae3">
    <v-container>
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
  components: { Profile,profileUpdate },
  computed: {
    ...mapGetters(["PROFILE_UPDATE"]),
  },
  mounted() {
    this.$store.commit("PROFILE_UPDATE", null);
  },
};
</script>
