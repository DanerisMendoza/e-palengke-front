<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Delivery</p>
      </div>

      <Queue v-if="showComponent" />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Queue from "../components/Queue.vue";
export default {
  components: { Queue },
  data() {
    return {
      showComponent: true,
    };
  },
  watch: {
    RESTART: {
      handler(val) {
        if (val) {
          this.restart();
        }
      },
    },
  },
  methods: {
    async restart() {
      this.showComponent = false;
      this.$store.commit("CIRCLE_RADIUS", 50);
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.$store.commit("RESTART", false);
      this.showComponent = true;
    },
  },
  computed: {
    ...mapGetters(["RESTART"]),
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
