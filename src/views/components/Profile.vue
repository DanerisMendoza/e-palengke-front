<template>
  <v-container>
    <v-card class="user-info-container" elevation="10">
      <v-card-title>User Information</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <strong>Name:</strong> {{ USER_DETAILS.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>Age:</strong> {{ USER_DETAILS.age }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>Gender:</strong> {{ USER_DETAILS.gender }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>Email:</strong> {{ USER_DETAILS.email }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>Address:</strong> {{ USER_DETAILS.address }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>Balance:</strong> ₱{{ USER_DETAILS.balance }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>User Roles: </strong>
            <v-chip v-for="role in USER_DETAILS.user_role_details" :key="role.id" class="mr-2">
              {{ role.name }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <br><br>
    <v-card v-if="StoreDetails.isStoreOwner" class="user-info-container" elevation="10">
      <v-card-title>Store Information</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <strong>Name:</strong> {{ StoreDetails.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>Address:</strong> {{ StoreDetails.address }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>Store Type Details: </strong>
            <v-chip v-for="(detail, index) in StoreDetails.store_type_details" :key="index" class="mr-2">
              {{ detail.name }}
            </v-chip>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['USER_DETAILS']),
  },
  data() {
    return {
      StoreDetails: {
        isStoreOwner: false,
        name: null,
        address: null,
        store_type_details: []
      }
    }
  },
  mounted() {
    const userDetails = this.USER_DETAILS.user_role_details
    let targetItem = userDetails.find(item => item.id === 3 && item.status === 'active');
    if (targetItem) {
      this.StoreDetails.isStoreOwner = true
      this.StoreDetails.name = targetItem.store_details[0].name
      this.StoreDetails.address = targetItem.store_details[0].address
      this.StoreDetails.store_type_details = targetItem.store_details[0].store_type_details
    }

  }
};
</script>

