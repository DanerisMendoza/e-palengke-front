<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Admin</p>
      </div>

      <v-row>
        <v-col cols="12" md="6">
          <!-- First Pie Chart for USER_ROLES_ANALYSIS -->
          <v-card>
            <apexchart
              type="pie"
              :options="chartOptionsRoles"
              :series="seriesRoles"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <!-- Second Pie Chart for USER_ROLES_STATUS_ANALYSIS -->
          <v-card>
            <apexchart
              type="pie"
              :options="chartOptionsStatus"
              :series="seriesStatus"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userRolesAnalysisData: [],
      userRolesStatusAnalysisData: [],
    };
  },
  computed: {
    ...mapGetters(["USER_ROLES_ANALYSIS", "USER_ROLES_STATUS_ANALYSIS"]),
    chartOptionsRoles() {
      return {
        labels: this.userRolesAnalysisData.map((item) => item.name),
      };
    },
    seriesRoles() {
      return this.userRolesAnalysisData.map((item) => item.count);
    },
    chartOptionsStatus() {
      return {
        labels: this.userRolesStatusAnalysisData.map((item) =>
          item.status.toUpperCase()
        ),
      };
    },
    seriesStatus() {
      return this.userRolesStatusAnalysisData.map((item) => item.count);
    },
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("GET_USER_ROLES_ANALYSIS");
      this.userRolesAnalysisData = this.USER_ROLES_ANALYSIS;

      await this.$store.dispatch("GET_USER_ROLES_STATUS_ANALYSIS");
      this.userRolesStatusAnalysisData = this.USER_ROLES_STATUS_ANALYSIS;
    },
  },
  mounted() {
    this.fetchData();
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
