<template>
  <div>
    <v-card elevation="2" outlined v-if="PRODUCT_TABLE_VIEWER != 'STORE'">
      <v-data-table :headers="headers" :items="PRODUCT">
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-chip color="green" dark>₱{{ item.price }}</v-chip>
            </td>
            <td>{{ item.stock < 0 ? 0 : item.stock }}</td>
            <td>
              <v-img contain :src="item.base64img" eager width="100"></v-img>
            </td>
            <td v-if="PRODUCT_TABLE_VIEWER === 'INVENTORY'">
              <v-icon @click="editItem(item)" color="orange">mdi-pencil</v-icon>
              <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
            </td>
            <td
              v-if="
                PRODUCT_TABLE_VIEWER === 'STORE' && store_id !== item.store_id
              "
            >
              <v-text-field
                label="QTY"
                type="number"
                v-model="item.quantity"
              ></v-text-field>
              <v-btn
                v-if="item.stock > 0"
                class="mb-2"
                @click="addToCart(item)"
              >
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
              <v-btn v-else>
                <v-icon>mdi-alert-circle-outline</v-icon>
              </v-btn>
            </td>
            <td v-else></td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-row v-if="PRODUCT_TABLE_VIEWER === 'STORE'">
      <v-col v-for="(item, index) in PRODUCT" :key="index" cols="12" md="4">
        <v-card class="card" outlined>
          <v-img
            contain
            :src="item.base64img"
            eager
            width="500"
            height="200"
          ></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <h3>Price: ₱{{ item.price }}</h3>
            <h3
              v-if="
                PRODUCT_TABLE_VIEWER === 'STORE' && store_id !== item.store_id
              "
            >
              Stock: {{ item.stock < 0 ? 0 : item.stock }}
            </h3>
            <h3 v-else>Stock: {{ item.stock }}</h3>
          </v-card-text>
          <v-card-actions v-if="store_id !== item.store_id">
            <!-- <v-text-field label="QTY" type="number" v-model="item.quantity"></v-text-field> -->
            <v-btn
              v-if="item.stock > 0"
              @click="addToCart(item)"
              color="#0c3a68"
              dark
              class="cart-btn"
            >
              Add To Cart
            </v-btn>
            <v-btn v-else icon>
              <v-icon>mdi-alert-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "No.", align: "center", sortable: false },
        {
          text: "Name",
          value: "name",
          align: "center",
          sortable: false,
          width: "25%",
        },
        {
          text: "Price",
          value: "price",
          align: "center",
          sortable: false,
          width: "25%",
        },
        {
          text: "Stock",
          value: "stock",
          align: "center",
          sortable: false,
          width: "25%",
        },
        { text: "Picture", align: "center", sortable: false, width: "20%" },
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
          width: "25%",
        },
      ],
      store_id: null,
    };
  },
  computed: {
    ...mapGetters([
      "PRODUCT",
      "USER_DETAILS",
      "PRODUCT_TABLE_VIEWER",
      "SELECTED_STORE",
      "PRODUCT_DIALOG",
      "SELECTED_PRODUCT_DETAILS",
      "PRODUCT_CUSTOMER_VIEW_DIALOG",
    ]),
  },
  methods: {
    addToCart(item) {
      if (item.stock - item.quantity >= 0) {
        item.stock -= item.quantity;
        const payload = {
          product_id: item.id,
          store_id: item.store_id,
          quantity: item.quantity,
        };
        this.$store.dispatch("ADD_CART_PRODUCT", payload);
      } else {
        this.$swal.fire({
          icon: "warning", // Set a warning icon (you can choose a different icon class)
          title: "Invalid Quantity!", // Updated title
          text: "Quantity is greater than Stocks!", // Updated text message
          showConfirmButton: false, // Remove the "OK" button
          timer: 2000, // Auto-close the alert after 1.5 seconds (adjust as needed)
        });
      }
    },
    getStoreId() {
      return (this.store_id = this.USER_DETAILS.user_role_details.find(
        (item) => item.id === 3 && item.status === "active"
      )?.store_details[0].store_id);
    },
    editItem(item) {
      this.$store.commit("SELECTED_PRODUCT_DETAILS", item);
      this.$store.commit("PRODUCT_DIALOG", "UPDATE");
      console.log(this.PRODUCT_DIALOG);
    },
    deleteItem(item) {
      console.log(item);
      this.$swal
        .fire({
          icon: "warning",
          title: "Delete Item",
          text: "Are you sure you want to delete this item?",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it",
          cancelButtonText: "No, cancel",
          confirmButtonColor: "#d33",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("DELETE_PRODUCT_BY_ID", item.id)
              .then((response) => {
                if (response === "success") {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Item Deleted Successfully.",
                  });
                  // this.$store.dispatch("GET_PRODUCT",this.SELECTED_PRODUCT_DETAILS.id);
                  this.$store.dispatch("GET_PRODUCT_BY_ID", this.store_id);
                }
              });
          }
        });
    },
  },
  watch: {
    SELECTED_STORE: {
      handler(val) {
        console.log(val);
        if (this.PRODUCT_TABLE_VIEWER === "STORE") {
          this.$store.dispatch("GET_PRODUCT_BY_ID", val.id).then(() => {
            const updatedProduct = this.PRODUCT.map((item) => ({
              ...item,
              quantity: 1,
            }));
            this.$store.commit("PRODUCT", updatedProduct);
          });
        }
      },
    },
  },
  async created() {
    this.$store.commit("PRODUCT", []);
    await this.getStoreId();
    if (this.PRODUCT_TABLE_VIEWER === "INVENTORY") {
      this.$store.dispatch("GET_PRODUCT_BY_ID", this.store_id);
    }
    if (this.PRODUCT_CUSTOMER_VIEW_DIALOG) {
      this.$store
        .dispatch("GET_PRODUCT_BY_ID", this.SELECTED_STORE.id)
        .then(() => {
          const updatedProduct = this.PRODUCT.map((item) => ({
            ...item,
            quantity: 1,
          }));
          this.$store.commit("PRODUCT", updatedProduct);
        });
    }
  },
};
</script>

<style>
td {
  text-align: center;
  padding: 10px;
}
.image-small {
  height: 100px;
}
.card {
  padding: 1rem;
}
.cart-btn {
  width: 100%;
}
</style>
