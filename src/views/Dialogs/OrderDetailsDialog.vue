<template>
  <v-dialog v-model="dialog" width="1000" persistent>
    <v-card class="card">
      <v-card-title class="card-title">Order Detail</v-card-title>
      <v-card-text>
        <v-row
          v-if="
            SELECTED_ORDER_DETAILS.status === 'To Receive' ||
            SELECTED_ORDER_DETAILS.transactions_status === 'To Pickup' ||
            SELECTED_ORDER_DETAILS.transactions_status === 'Dropped off'
          "
        >
          <v-col cols="12">
            <v-container>
              <v-card>
                <v-row>
                  <!-- Delivery Information -->
                  <v-col>
                    <v-card-title>Delivery</v-card-title>
                    <v-card-text>
                      Name: {{ TRANSACTION.delivery_name }}
                      <br />
                      Contact: {{ TRANSACTION.phone_number }}
                    </v-card-text>
                  </v-col>

                  <!-- Profile Picture -->
                  <v-col>
                    <v-img
                      v-if="TRANSACTION.profile_pic_path == null"
                      :src="require('@/assets/profilePic.jpg')"
                      class="mr-3 float-right"
                      max-width="150"
                      style="border-radius: 5rem"
                    ></v-img>
                    <v-img
                      v-else
                      :src="TRANSACTION.base64img"
                      class="mr-3 float-right"
                      max-width="150"
                      style="border-radius: 5rem"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <OrderDetailsTable />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="12"> -->
            <!-- <v-text-field outlined readonly class="float-right mr-15 mt-15">
                          <template v-slot:append>
                              Total: ₱{{ total.toFixed(2) }}
                          </template>
</v-text-field> -->
          <!-- </v-col>
        </v-row> -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import OrderDetailsTable from "../Tables/OrderDetailsTable.vue";
export default {
  components: { OrderDetailsTable },
  data() {
    return {
      dialog: true,
    };
  },
  computed: {
    ...mapGetters(["ORDERS", "SELECTED_ORDER_DETAILS", "TRANSACTION"]),
    total() {
      return "";
      // return this.ORDERS[this.SELECTED_ORDER_DETAILS].order_details.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit("SELECTED_ORDER_DETAILS", null);
    },
    async getTransactionDetails() {
      const payload = {
        params: {
          transaction_id: this.SELECTED_ORDER_DETAILS.transaction_id,
        },
      };
      await this.$store.dispatch("GET_TRANSACTION_BY_ID", payload).then(() => {
        console.log(this.TRANSACTION);
      });
    },
  },
  mounted() {
    this.getTransactionDetails();

    // console.log(this.SELECTED_ORDER_DETAILS)
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
