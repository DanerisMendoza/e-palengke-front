<template>
  <v-app style="background: #0c3a68">
    <v-container>
      <!-- <v-app-bar app color="primary" dark elevation="2">
        LOGIN PAGE
        <v-spacer></v-spacer>
        <v-btn plain @click="registration">sign up</v-btn>
        <span class="ml-5 mr-5">|</span>
        <v-btn plain @click="login">login</v-btn>
        <span class="ml-5 mr-5">|</span>
        <v-btn plain @click="mobile">mobile (apk)</v-btn>
      </v-app-bar> -->

      <v-card class="card text-center">
        <p class="card-title ma-0 pa-0">Scan QR Code</p>
        <v-card-text>
          <v-img
            src="../../assets/mobileQR.png"
            alt="E-Palengke Mobile QR CODE"
            width="500"
            class="mb-5"
          ></v-img>

          <div>
            <a href="https://epalengke.shop/E-Palengke.apk"
              >Download Mobile APK</a
            >
          </div>

          <v-btn @click="login" plain class="mt-2" color="primary">
            <v-icon class="mr-2">mdi-arrow-left</v-icon>Back to Login
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["SIDE_NAV"]),
  },

  methods: {
    login() {
      this.$router.push("/Login");
    },
    registration() {
      this.$router.push("/Registration");
    },
    mobile() {
      this.$router.push("/Mobile");
    },
  },
};
</script>

<style scoped>
.card {
  padding: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card-title {
  color: #0c3a68;
  font-weight: 500;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.card a {
  font-size: 2rem;
}
</style>
