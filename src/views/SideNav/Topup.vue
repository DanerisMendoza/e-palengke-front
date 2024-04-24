<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Top Up</p>
      </div>

      <Topup />
    </v-container>
  </v-app>
</template>

<script>
import Topup from "../components/Topup.vue";
export default {
  components: { Topup },
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
