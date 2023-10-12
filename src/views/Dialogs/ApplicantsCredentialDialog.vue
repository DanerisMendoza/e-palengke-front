<template>
  <v-container>
    <v-row justify="center">
      <template>
        <v-dialog v-model="dialog" max-width="1000px" persistent>
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="11">Applicants Details</v-col>
                <v-col cols="1">
                  <v-icon
                    text
                    icon
                    @click="closeDialog()"
                    class="float-right"
                    >mdi-close</v-icon
                  >
                </v-col>
              </v-row>
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
                      <!-- You can add optional overlay content or labels here -->
                    </v-img>
                  </div>
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
          </v-card>
        </v-dialog>
      </template>
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

<style scoped>
.image-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.image {
  flex: 8;
}
</style>
