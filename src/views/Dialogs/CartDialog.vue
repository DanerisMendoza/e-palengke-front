<template>
  <v-dialog v-model="dialog" width="1000" persistent>
    <v-card class="card">
      <v-card-title class="card-title">Cart</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              readonly
              outlined
              class="float-left"
              hide-details="auto"
            >
              <template v-slot:prepend-inner>
                {{ currentDateTime }}
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <CartTable />

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field outlined readonly hide-details="auto">
              <template v-slot:append>
                Balance: ₱{{ USER_DETAILS.balance }}
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field outlined readonly hide-details="auto">
              <template v-slot:append>
                Total: ₱{{ total.toFixed(2) }}
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="order" color="#0c3a68" :loading="isOrdering" dark text
          >Check out</v-btn
        >
        <v-btn @click="closeDialog()" color="red" dark text>Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CartTable from "../Tables/CartTable.vue";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    CartTable,
  },
  data() {
    return {
      isOrdering: false,
      dialog: true,
      currentDateTime: moment().format("MMMM D, YYYY - hh:mm A"),
    };
  },
  computed: {
    ...mapGetters(["SELECTED_STORE", "CART", "USER_DETAILS"]),
    total() {
      return this.CART.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit("CART_DIALOG", false);
      const selectedStore = this.SELECTED_STORE;
      this.$store.commit("SELECTED_STORE", null);
      this.$store.commit("SELECTED_STORE", selectedStore);
    },
    order() {
      this.isOrdering = true;
      if (this.USER_DETAILS.balance < this.total) {
        this.$swal.fire({
          icon: "warning", // Set a warning icon (you can choose a different icon class)
          title: "Insufficient Balance", // Updated title
          text: "Balance is less than Order Total Amount!", // Updated text message
          showConfirmButton: false, // Remove the "OK" button
          timer: 2000, // Auto-close the alert after 1.5 seconds (adjust as needed)
        });
        this.isOrdering = false;
        return;
      }
      this.CART.forEach((item) => {
        if (item.stock < 0) {
          this.$swal.fire({
            icon: "warning", // Set a warning icon (you can choose a different icon class)
            title: "Invalid Item", // Updated title
            html: "Stock is Less than Quantity <br> Please Check your Cart!", // Updated text message
            showConfirmButton: false, // Remove the "OK" button
            timer: 2000, // Auto-close the alert after 1.5 seconds (adjust as needed)
          });
          this.isOrdering = false;
          return;
        }
      });
      const payload = {
        cart: this.CART,
        status: "pending",
        total: this.total,
      };
      this.$store.dispatch("ORDER", payload).then((response) => {
        if (response == "invalid") {
          this.$swal.fire({
            icon: "warning",
            title: "Invalid Item",
            html: "Stock is Less than Quantity <br> Please Check your Cart!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        //server side validation of balance and total amount of order
        else if (response == "insufficient balance") {
          this.$swal.fire({
            icon: "warning",
            title: "Invalid Item",
            html: "Stock is Less than Quantity <br> Please Check your Cart!",
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (response == "success") {
          this.$swal.fire({
            icon: "success",
            title: "Order Success",
            text: "Thank you for Ordering!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        this.isOrdering = false;
        this.$store.dispatch("GET_CART");
        this.$store.dispatch("GetUserDetails");
      });
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
