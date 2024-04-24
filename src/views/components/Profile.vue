<template>
  <v-app style="background: #c8e0f6">
    <v-row class="text-center">
      <v-col cols="12" md="8">
        <v-card class="card">
          <v-card-title class="card-title">
            User Information
            <v-icon @click="editProfile()" color="#0c3a68" class="ml-2"
              >mdi-pencil</v-icon
            ></v-card-title
          >
          <!-- user information -->
          <v-row>
            <v-col cols=" 6" md="4">
              <img
                :src="PROFILE_PATH"
                alt="Profile Picture"
                class="profile-picture"
                width="250"
              />
            </v-col>
            <v-col cols="6" md="8">
              <v-simple-table outlined>
                <tbody>
                  <tr>
                    <td class="font-weight-bold">Name:</td>
                    <td>{{ USER_DETAILS.name }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Gender:</td>
                    <td>{{ USER_DETAILS.gender }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Email:</td>
                    <td>{{ USER_DETAILS.email }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Address:</td>
                    <td>{{ USER_DETAILS.address }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Balance:</td>
                    <td>₱{{ USER_DETAILS.balance }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Roles:</td>
                    <td>
                      <v-chip
                        v-for="role in USER_DETAILS.user_role_details"
                        :key="role.id"
                        class="mr-2"
                        color="#0c3a68"
                        dark
                      >
                        {{ role.name }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- store information -->
      <v-col cols="12" md="4">
        <v-card class="card" v-if="StoreDetails.isStoreOwner">
          <v-card-title class="card-title">Store Information</v-card-title>

          <v-simple-table outlined>
            <tbody>
              <tr>
                <td class="font-weight-bold">Name:</td>
                <td>{{ StoreDetails.name }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Address:</td>
                <td>{{ StoreDetails.address }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Store Type Details:</td>
                <td>
                  <v-chip
                    v-for="(detail, index) in StoreDetails.store_type_details"
                    :key="index"
                    class="mr-2"
                    color="#0c3a68"
                    dark
                  >
                    {{ detail.name }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>

        <!-- delivery information -->
        <v-card class="card" v-if="DeliveryDetails.isDelivery">
          <v-card-title class="card-title">Delivery Information</v-card-title>

          <v-simple-table outlined>
            <tbody>
              <tr>
                <td class="font-weight-bold">Latitude:</td>
                <td>{{ DeliveryDetails.latitude }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Longitude:</td>
                <td>{{ DeliveryDetails.longitude }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["USER_DETAILS", "PROFILE_PATH"]),
  },
  data() {
    return {
      StoreDetails: {
        isStoreOwner: false,
        name: null,
        address: null,
        store_type_details: [],
      },
      DeliveryDetails: {
        isDelivery: false,
        latitude: null,
        longitude: null,
      },
    };
  },
  methods: {
    editProfile() {
      this.$store.commit("PROFILE_UPDATE", true);
    },
  },
  mounted() {
    const userDetails = this.USER_DETAILS.user_role_details;
    let targetItem = userDetails.find(
      (item) => item.id === 3 && item.status === "active"
    );
    if (targetItem) {
      this.StoreDetails.isStoreOwner = true;
      this.StoreDetails.name = targetItem.store_details[0].name;
      this.StoreDetails.address = targetItem.store_details[0].address;
      this.StoreDetails.store_type_details =
        targetItem.store_details[0].store_type_details;
    }
    targetItem = userDetails.find(
      (item) => item.id === 4 && item.status === "active"
    );
    if (targetItem) {
      this.DeliveryDetails.isDelivery = true;
      this.DeliveryDetails.latitude = targetItem.delivery_details[0].latitude;
      this.DeliveryDetails.longitude = targetItem.delivery_details[0].longitude;
    }
  },
};
</script>

<style scoped>
.card {
  padding: .5rem;
}
.card-title {
  color: #0c3a68;
  font-weight: 400;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
</style>
