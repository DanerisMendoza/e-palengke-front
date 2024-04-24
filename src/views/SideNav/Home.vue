<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Home</p>
      </div>

      <v-row>
        <v-col cols="12">
          <!-- Bar Graph for ORDERS_ANALYSIS -->
          <v-card>
            <apexchart
              type="bar"
              :options="chartOptionsOrders"
              :series="seriesOrders"
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
          title: {
          text: "Trending Products",
          align: "center",
        },
        chart: {
          height: 400, // Set the chart height
        },
      };
    },
    seriesOrders() {
      return [
        {
          name: "Orders",
          data: this.ordersAnalysisData.map((item) => item.count),
        },
      ];
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
.page-title p {
  margin-bottom: 1rem;
  color: #0c3a68;
}
.container {
  padding: 0 2.5rem 0;
}
</style>
