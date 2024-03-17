<template>
  <v-app style="background: #c8e0f6">
    <v-card class="card">
      <v-card-title class="card-title">Amount to Add</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="topup" ref="myForm">
          <v-text-field
            outlined
            v-model="topupAmount"
            label="Enter Amount"
            type="number"
            hide-details="auto"
          ></v-text-field>

          <h2 class="mt-5">Add Payment Method</h2>
          <v-radio-group
            v-model="selectedPaymentMethod"
            :rules="rules.required"
          >
            <v-row>
              <v-col>
                <div class="payment-info">
                  <v-card-title>Debit or Credit Card</v-card-title>
                  <img
                    :src="require('@/assets/payments_pic/visa.png')"
                    alt="Visa Logo"
                    width="100"
                    height="50"
                  />
                  <img
                    :src="require('@/assets/payments_pic/masterCard.png')"
                    alt="Visa Logo"
                    width="100"
                    height="50"
                  />
                </div>
              </v-col>
              <v-col>
                <v-radio value="visa" class="float-right mr-5"></v-radio>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div class="payment-info">
                  <v-card-title>PayMaya Wallet</v-card-title>
                  <img
                    :src="require('@/assets/payments_pic/paymaya.png')"
                    alt="PayMaya Logo"
                    width="50"
                    height="50"
                  />
                </div>
              </v-col>
              <v-col>
                <v-radio value="paymaya" class="float-right mr-5"></v-radio>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div class="payment-info">
                  <v-card-title>GCash</v-card-title>
                  <img
                    :src="require('@/assets/payments_pic/gcash.png')"
                    alt="GCash Logo"
                    width="50"
                    height="50"
                  />
                </div>
              </v-col>
              <v-col>
                <v-radio value="gcash" class="float-right mr-5"></v-radio>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn @click="topup" color="#0c3a68" dark class="float-right"
                  >Next</v-btn
                >
              </v-col>
            </v-row>
          </v-radio-group>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<style scoped>
.payment-info {
  display: flex;
  align-items: center;
}
</style>

<script>
export default {
  data() {
    return {
      topupAmount: 0,
      selectedPaymentMethod: "",
      rules: {
        required: [(v) => !!v || "*Select Payment Method"],
      },
    };
  },
  methods: {
    topup() {
      if (this.$refs.myForm.validate()) {
        const payload = {
          topupAmount: this.topupAmount,
          selectedPaymentMethod: this.selectedPaymentMethod,
        };
        this.$store.dispatch("UpdateUserBalance", payload).then((response) => {
          if (response === "success") {
            this.$refs.myForm.resetValidation();
            this.$store.dispatch("GetUserDetails");
            this.topupAmount = 0;
            this.selectedPaymentMethod = "";
            this.$swal.fire({
              icon: "success", // Set the success icon
              title: "Success", // Title of the alert
              text: "Operation was successful!", // Text message
              showConfirmButton: false, // Remove the "OK" button
              timer: 1500, // Auto-close the alert after 1.5 seconds (adjust as needed)
            });
          }
        });
      }
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
