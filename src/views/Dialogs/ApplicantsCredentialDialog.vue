<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="80rem" persistent>
        <v-card>
          <v-card-title>
            Applicants

            <v-btn icon @click="closeDialog" class="ml-auto">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-carousel v-model="currentCarouselIndex">
              <v-carousel-item
                v-for="(imageData, index) in imagesData"
                :key="index"
              >
                <div class="image-container">
                  <v-card-text>{{ imageData.name }}</v-card-text>
                  <v-img contain :src="imageData.base64img" class="image">
                  </v-img>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
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

<!-- <style scoped>
.image-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.image {
  flex: 8;
}
</style> -->
