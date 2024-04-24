<template>
  <v-container>
    <v-dialog v-model="dialog" width="1000" persistent>
      <v-card class="card">
        <v-card-title class="card-title">Menu</v-card-title>
        <v-card-text>
          <ProductTable />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog()" color="red" dark text>Close</v-btn>
        </v-card-actions>
        <!-- <v-card-title>Order Status: </v-card-title> -->
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ProductTable from "../Tables/ProductTable.vue";
export default {
  components: { ProductTable },
  data() {
    return {
      dialog: true,
    };
  },
  computed: {
    ...mapGetters(["SELECTED_ORDER_STATUS"]),
  },
  methods: {
    closeDialog() {
      this.$store.commit("PRODUCT_CUSTOMER_VIEW_DIALOG", false);
    },
  },
};
</script>

<style scoped>
.card {
  padding: 0.5rem;
}
.card-title {
  color: #0c3a68;
  font-weight: 400;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
</style>
