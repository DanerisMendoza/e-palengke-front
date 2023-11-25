<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="admin">
        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>
        <v-row>
          <v-col cols="6">
            <!-- First Pie Chart for USER_ROLES_ANALYSIS -->
            <apexchart type="pie" :options="chartOptionsRoles" :series="seriesRoles" />
          </v-col>
          <v-col cols="6">
            <!-- Second Pie Chart for USER_ROLES_STATUS_ANALYSIS -->
            <apexchart type="pie" :options="chartOptionsStatus" :series="seriesStatus" />
          </v-col>
        </v-row>
      </v-card>
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
        labels: this.userRolesStatusAnalysisData.map((item) => item.status.toUpperCase()),
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

