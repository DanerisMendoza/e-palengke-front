<template>
  <v-dialog v-model="dialog" width="800" persistent>
    <v-card class="card">
      <v-card-title class="card-title">Applicants Details</v-card-title>
      <v-card-text>
        <v-carousel v-model="currentCarouselIndex">
          <v-carousel-item
            v-for="(imageData, index) in imagesData"
            :key="index"
          >
            <div class="image-container">
              <v-card-text>{{ imageData.name }}</v-card-text>
              <v-img contain :src="imageData.base64img" class="image"> </v-img>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="closeDialog()">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: true,
      imagesData: [],
      currentCarouselIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["SELECTED_CREDENTIAL"]),
  },
  methods: {
    closeDialog() {
      this.$store.commit("SELECTED_CREDENTIAL", null);
    },
    loadImages() {
      this.$store
        .dispatch("GET_APPLICANT_CREDENTIAL_BY_ID", this.SELECTED_CREDENTIAL)
        .then((response) => {
          this.imagesData = response;
        });
    },
  },
  mounted() {
    this.loadImages();
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
.image-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.image {
  flex: 8;
}
</style>
