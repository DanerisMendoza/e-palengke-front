<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="admin">
        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.admin {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
