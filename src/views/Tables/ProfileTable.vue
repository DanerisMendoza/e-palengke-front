<!-- <template>
    <div class="text-center">
        <br><br>
        <h1>User Information</h1>
        <br>
        <h2>Name: {{ this.USER_DETAILS.name }}</h2>
        <h2>Age: {{ this.USER_DETAILS.age }}</h2>
        <h2>Gender: {{ this.USER_DETAILS.gender }}</h2>
        <h2>Email: {{ this.USER_DETAILS.email }}</h2>
        <h2>Address: {{ this.USER_DETAILS.address }}</h2>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
   computed: {
    ...mapGetters([
      'USER_DETAILS'
    ])
  }

}

</script>

<style scoped>
.text-center {
  text-align: center;
}
</style> -->

<template>
    <div class="center-container">
      <div class="user-info-container">
        <h1 class="user-info-title">User Information</h1>
        <div class="user-info-item">
          <strong>Name:</strong> {{ this.USER_DETAILS.name }}
        </div>
        <div class="user-info-item">
          <strong>Age:</strong> {{ this.USER_DETAILS.age }}
        </div>
        <div class="user-info-item">
          <strong>Gender:</strong> {{ this.USER_DETAILS.gender }}
        </div>
        <div class="user-info-item">
          <strong>Email:</strong> {{ this.USER_DETAILS.email }}
        </div>
        <div class="user-info-item">
          <strong>Address:</strong> {{ this.USER_DETAILS.address }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['USER_DETAILS']),
    },
  };
  </script>
  
  <style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* This will make the container take up the full height of the viewport */
  }
  
  .user-info-container {
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    max-width: 600px;
  }
  
  .user-info-title {
    font-size: 24px;
    margin-bottom: 20px;
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
<template>
    <div class="user-info-container">
      <h1 class="user-info-title">User Information</h1>
      <div class="user-info">
        <div class="user-info-item">
          <strong>Name:</strong> {{ this.USER_DETAILS.name }}
        </div>
        <div class="user-info-item">
          <strong>Age:</strong> {{ this.USER_DETAILS.age }}
        </div>
        <div class="user-info-item">
          <strong>Gender:</strong> {{ this.USER_DETAILS.gender }}
        </div>
        <div class="user-info-item">
          <strong>Email:</strong> {{ this.USER_DETAILS.email }}
        </div>
        <div class="user-info-item">
          <strong>Address:</strong> {{ this.USER_DETAILS.address }}
        </div>
        <div class="user-info-item">
          <strong>User Role:</strong> {{  USER_DETAILS.user_role_ids[0].name }}
        </div>
        <!-- <h2>Roles:</h2>
        <p>{{ USER_DETAILS.user_role_ids[0].name }}</p> -->
        <!-- <ul>
            <li v-for="role in USER_DETAILS.user_role_ids" :key="role.id">
            {{ role.name }}
            </li>
        </ul> -->
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {  
    computed: {
      ...mapGetters(['USER_DETAILS']),
    },
  };
  </script>
  
  <style scoped>
  .user-info-container {
    text-align: left;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    max-width: 400px;
    margin: 0 auto;
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
  