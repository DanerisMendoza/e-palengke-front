<template>
  <v-app style="background: #F5F5F5">
    <v-container>
      <v-btn @click="backToLogin" plain text>
        <v-icon> mdi-arrow-left </v-icon>
        Back to Login
      </v-btn>
      <Registration />
    </v-container>
  </v-app>
</template>

<script>
import Registration from "../components/Registration.vue";

export default {
  components: { Registration },
  methods: {
    backToLogin() {
      this.$router.push("/Login");
    },
  },
};
</script>
