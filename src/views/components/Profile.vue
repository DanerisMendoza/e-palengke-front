<template>
  <v-app style="background: #d0dae3">
    <v-card class="profile">
      <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>

      <v-row class="text-center">
        <v-col cols="12" sm="7">
          <v-card elevation="2" outlined class="user-info">
            <p class="display-1 font-weight-bold">USER INFORMATION <v-icon @click="editProfile()">mdi-pencil</v-icon></p>

            <!-- user information -->
            <v-row>
              <v-col cols="6" sm="4">
                <img :src="PROFILE_PATH" alt="Profile Picture" class="profile-picture" width="250" />
              </v-col>
              <v-col cols="6" >
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
                        <v-chip v-for="role in USER_DETAILS.user_role_details" :key="role.id" class="mr-2">
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
        <v-col cols="12" sm="5">
          <v-card elevation="2" outlined class="store-info" v-if="StoreDetails.isStoreOwner">
            <p class="display-1 font-weight-bold">STORE INFORMATION</p>

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
                    <v-chip v-for="(detail, index) in StoreDetails.store_type_details" :key="index" class="mr-2">
                      {{ detail.name }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>

          <!-- delivery information -->
          <v-card elevation="2" outlined class="store-info" v-if="DeliveryDetails.isDelivery">
            <p class="display-1 font-weight-bold">DELIVERY INFORMATION</p>

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
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["USER_DETAILS","PROFILE_PATH"]),
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
  methods:{
    editProfile(){
      this.$store.commit("PROFILE_UPDATE", true);
    }
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
.profile {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}

.profile-picture {
  border-radius: 2rem;
}

.user-info,
.store-info {
  padding: 1rem;
}
</style>
