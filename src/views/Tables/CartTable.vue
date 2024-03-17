<template>
  <v-card elevation="2" outlined class="mt-5 mb-5">
    <v-data-table :headers="headers" :items="CART">
      <template v-slot:item="{ item, index }">
        <tr :style="{ 'background-color': item.stock < 0 ? 'grey' : '' }">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.store_name }}</td>
          <td>₱{{ item.price }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.quantity }}</td>
          <td>
            <v-row>
              <v-col cols="12">
                <v-btn
                  v-if="item.stock > 0"
                  @click="increaseItem(item)"
                  icon
                  color="green"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn v-else icon color="orange">
                  <v-icon>mdi-alert-circle-outline</v-icon>
                </v-btn>
                <v-btn @click="decreaseItem(item)" icon color="red">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn @click="removeItem(item)" icon color="black">
                  <v-icon>mdi-cart-off</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
.red-background {
  background-color: grey;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "No.", align: "center", sortable: false },
        { text: "Name", value: "name", align: "center", sortable: false },
        {
          text: "Store Name",
          value: "storeName",
          align: "center",
          sortable: false,
        },
        { text: "Price (₱)", value: "price", align: "center", sortable: false },
        { text: "Stock", value: "stock", align: "center", sortable: false },
        {
          text: "Quantity",
          value: "quantity",
          align: "center",
          sortable: false,
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      data: [],
    };
  },
  computed: {
    ...mapGetters(["CART", "SELECTED_STORE"]),
  },
  methods: {
    async increaseItem(item) {
      if (item.stock > 0) {
        item.stock -= 1;
        item.quantity += 1;
        const payload = {
          product_id: item.id,
        };
        await this.$store.dispatch("INCREASE_CART_PRODUCT", payload);
      }
    },
    async decreaseItem(item) {
      item.stock += 1;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        const newCart = this.CART.filter((item2) => item2 !== item);
        this.$store.commit("CART", newCart);
      }
      const payload = {
        product_id: item.id,
      };
      await this.$store.dispatch("DECREASE_CART_PRODUCT", payload);
    },
    async removeItem(item) {
      const payload = {
        product_id: item.id,
      };
      await this.$store.dispatch("REMOVE_CART_PRODUCT", payload).then(() => {
        const newCart = this.CART.filter((item2) => item2 !== item);
        this.$store.commit("CART", newCart);
      });
    },
    async getCart() {
      await this.$store.dispatch("GET_CART");
    },
  },
  created() {
    this.getCart();
  },
};
</script>
