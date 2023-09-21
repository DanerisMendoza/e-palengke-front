<template>
    <v-data-table :headers="headers" :items="PRODUCT">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>₱{{ item.price }}</td>
          <td>{{ item.stock }}</td>
          <td>
            <v-img contain :src="item.base64img" eager class="image-small" style="max-height: 100px; max-width: 100px;"></v-img>
          </td>
          <td v-if="PRODUCT_TABLE_VIEWER === 'INVENTORY'">
            <v-icon @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        headers: [
          { text: "Name", value: "name", align: "center", sortable: false, width: "20%" },
          { text: "Price (₱)", value: "price", align: "center", sortable: false, width: "15%" },
          { text: "Stock", value: "stock", align: "center", sortable: false, width: "15%" },
          { text: "Picture", align: "center", sortable: false, width: "20%" },
          { text: "Actions", align: "center", value: "actions", sortable: false, width: "15%" },
        ],
        store_id: null,
      };
    },
    computed: {
      ...mapGetters(["PRODUCT", "USER_DETAILS","PRODUCT_TABLE_VIEWER","SELECTED_STORE"]),
    },
    methods: {
      getStoreId() {
        return (this.store_id = this.USER_DETAILS.user_role_ids.find((item) => item.id === 3 && item.status === 'active')?.store_id);
      },
      editItem(item) {
      
      },
      deleteItem(item) {
        console.log(item)
        this.$store.dispatch("DELETE_PRODUCT_BY_ID", item.id);
        this.$store.dispatch("GET_PRODUCT_BY_ID",  this.store_id);
      },
    },
    watch: {
      SELECTED_STORE: {
            handler(val) {
              if(this.PRODUCT_TABLE_VIEWER === 'STORE'){
                this.$store.dispatch("GET_PRODUCT_BY_ID", val.id);
                console.log(val)
              }
            },
        }
    },
    async created() {
      this.$store.commit("PRODUCT", []);
      if(this.PRODUCT_TABLE_VIEWER === 'INVENTORY'){
        await this.getStoreId();
        this.$store.dispatch("GET_PRODUCT_BY_ID", this.store_id);
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
  </style>
  