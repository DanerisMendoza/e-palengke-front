<template>
    <v-container fluid class="picture">
        <v-dialog v-model="dialog" persistent>
            <v-card>
                <v-row>
                    <v-col>
                        <v-btn text icon class="float-right" @click="closeDialog()">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-carousel class="img my-carousel" v-model="currentCarouselIndex"  height="605px" max-height="705px">
                    <!-- Carousel Items -->
                    <v-carousel-item v-for="(imageData, index) in imagesData" :key="index" eager>
                        <div class="image-container">
                            <v-card-title>{{ imageData.name }}</v-card-title>
                        <v-img contain :src="imageData.base64img" eager class="image">
                            <!-- You can add optional overlay content or labels here -->
                        </v-img>
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </v-dialog>
    </v-container>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        dialog: true,
        imagesData: [],
        currentCarouselIndex: 0,
      };
    },
    computed: {
      ...mapGetters(['SELECTED_CREDENTIAL']),
    },
    methods: {
      closeDialog() {
        this.$store.commit('SELECTED_CREDENTIAL', null);
      },
      loadImages() {
        this.$store.dispatch('GET_APPLICANT_CREDENTIAL_BY_ID', this.SELECTED_CREDENTIAL).then((response) => {
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
  /* .picture {
      display: block;
      width: auto;
      height: auto;
      object-fit: contain;
  } */
  
  .outlined-col {
      border: 1px solid #999;
      padding: 8px;
      border-radius: 4px;
  }
  
  .no-outline {
      border: none;
  }
  
  .img {
      align-self: center;
      object-fit: contain;
  
  }
  
  .image-container {
      display: flex;
      flex-direction: column;
      height: 100%;
  }
  
  .image {
      flex: 8;
  }
  
  .image-label {
      flex: 2;
      align-self: center;
      object-fit: contain;
  }
  
  .my-carousel /deep/ .mdi-circle {
      opacity: 1;
  }
  
  .my-carousel /deep/ .v-btn--active {
      opacity: 1;
  }</style>