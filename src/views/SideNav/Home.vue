<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="home">
        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  components: { Login },
};
</script>

<style scoped>
.home {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
