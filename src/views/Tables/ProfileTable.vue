<template>
  <v-container>
    <v-card class="user-info-container" elevation="10">
      <v-card-title class="user-info-title">User Information</v-card-title>
      <v-card-text class="user-info">
        <v-row>
          <v-col>
            <div class="user-info-item">
              <strong>Name:</strong> {{ USER_DETAILS.name }}
            </div>
            <div class="user-info-item">
              <strong>Age:</strong> {{ USER_DETAILS.age }}
            </div>
            <div class="user-info-item">
              <strong>Gender:</strong> {{ USER_DETAILS.gender }}
            </div>
            <div class="user-info-item">
              <strong>Email:</strong> {{ USER_DETAILS.email }}
            </div>
            <div class="user-info-item">
              <strong>Address:</strong> {{ USER_DETAILS.address }}
            </div>
            <div class="user-info-item">
              <strong>Balance:</strong> ₱{{ USER_DETAILS.balance }}
            </div>
            <div class="user-info-item">
              <strong>User Roles:</strong> 
              <v-chip v-for="role in USER_DETAILS.user_role_ids" :key="role.id" class="mr-2">
                {{ role.name }}
              </v-chip>
            </div>
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
  mounted() {
    console.log('USER_DETAILS:', this.USER_DETAILS.user_role_ids);
  },
};
</script>

<style scoped>
.user-info-container {
  border-radius: 10px;
}

.user-info-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.user-info-item {
  margin: 10px 0;
  font-size: 18px;
}

.user-info-item strong {
  font-weight: bold;
  margin-right: 5px;
}
</style>
