<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="home">
        <v-row>
          <v-col cols="12">
            <!-- Bar Graph for ORDERS_ANALYSIS -->
            <apexchart type="bar" :options="chartOptionsOrders" :series="seriesOrders" />
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
      ordersAnalysisData: [],
    };
  },
  computed: {
    ...mapGetters(["ORDERS_ANALYSIS"]),
    chartOptionsOrders() {
      // Calculate the height based on the number of data points
      const chartHeight = Math.max(300, this.ordersAnalysisData.length * 30);

      return {
        xaxis: {
          categories: this.ordersAnalysisData.map((item) => item.name),
        },
        chart: {
          height: chartHeight + 'px', // Set the chart height
          type: 'bar',
        },
      };
    },
    seriesOrders() {
      return [{
        name: 'Orders',
        data: this.ordersAnalysisData.map((item) => item.count),
      }];
    },
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("GET_ORDERS_ANALYSIS").then(() => {
        // console.log(this.ORDERS_ANALYSIS);
      });
      this.ordersAnalysisData = this.ORDERS_ANALYSIS;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.home {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
