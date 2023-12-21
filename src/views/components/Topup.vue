<template>
  <v-app style="background: #d0dae3">
    <v-card class="topup">
      <v-card elevation="2" outlined class="amount-to-add">
        <p>Amount to Add</p>
        <v-form @submit.prevent="topup" ref="myForm">
          <v-text-field
            outlined
            v-model="topupAmount"
            label="Amount"
            type="number"
          ></v-text-field>
          <v-card-title>Add Payment Method</v-card-title>
          <v-radio-group
            v-model="selectedPaymentMethod"
            :rules="rules.required"
          >
            <v-row>
              <v-col cols="11">
                <div class="payment-info">
                  <v-card-subtitle>Debit or Credit Card</v-card-subtitle>
                  <img
                    :src="require('@/assets/payments_pic/visa.png')"
                    alt="Visa Logo"
                    width="50"
                    height="50"
                  />
                  <img
                    :src="require('@/assets/payments_pic/masterCard.png')"
                    alt="Visa Logo"
                    width="50"
                    height="50"
                  />
                </div>
              </v-col>
              <v-col cols="1">
                <v-radio value="visa" class="float-right mr-5"></v-radio>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="11">
                <div class="payment-info">
                  <v-card-subtitle>PayMaya Wallet</v-card-subtitle>
                  <img
                    :src="require('@/assets/payments_pic/paymaya.png')"
                    alt="PayMaya Logo"
                    width="50"
                    height="50"
                  />
                </div>
              </v-col>
              <v-col cols="1">
                <v-radio value="paymaya" class="float-right mr-5"></v-radio>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="11">
                <div class="payment-info">
                  <v-card-subtitle>GCash</v-card-subtitle>
                  <img
                    :src="require('@/assets/payments_pic/gcash.png')"
                    alt="GCash Logo"
                    width="50"
                    height="50"
                  />
                </div>
              </v-col>
              <v-col cols="1">
                <v-radio value="gcash" class="float-right mr-5"></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
          <v-row>
            <v-col cols="12">
              <v-btn @click="topup" color="primary" class="float-right mr-4"
                >Next</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
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
.topup {
  border-top: 5px solid #1976d2;
}
.topup,
.amount-to-add {
  padding: 1rem;
}
</style>
