<template>
  <v-app style="background: #0c3a68">
    <v-app-bar
      color="#0c3a68"
      dark
      app
      height="90"
      class="navbar"
      elevation="0"
    >
      <v-toolbar-title>
        <img
          src="../../assets/white-ep-3.png"
          alt="E-Palengke Logo"
          width="70"
        />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <v-btn text @click="registration">Sign Up</v-btn>
        <label>|</label>
        <v-btn text @click="login">Login</v-btn>
      </div>
    </v-app-bar>

    <main class="main">
      <section class="mt-10" id="home">
        <v-row>
          <v-col cols="12" md="6">
            <p class="display-4 ma-0 mt-1">Online</p>
            <p class="display-4 ma-0">Shopping</p>
            <h1>Unleash the power of convenience</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <v-btn color="primary" class="shop-btn" @click="login"
              >Shop Now</v-btn
            >
          </v-col>
          <v-col cols="12" md="6">
            <img src="../../assets/shopping.png" alt="Illustration" />
          </v-col>
        </v-row>
      </section>

      <section class="mt-10" id="category">
        <h1 class="text-h4">CATEGORY</h1>
        <v-chip color="#c8e0f6" class="mr-2">Fresh Produce</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Dairy Products</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Meat and Poultry</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Seafood</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Bakery Items</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Beverages</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Snacks</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Canned Goods</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Frozen Foods</v-chip>
        <v-chip color="#c8e0f6" class="mr-2">Condiments and Sauces</v-chip>
        <v-chip color="#c8e0f6" class="mr-2"
          >Breakfast Cereals and Grains</v-chip
        >
      </section>

      <section class="mt-10" id="category">
        <h1 class="text-h4">PRODUCT</h1>
        <v-row>
          <v-col cols="12" md="2">
            <v-card class="card text-center">
              <v-icon color="#0c3a68" x-large class="mb-2">mdi-food</v-icon>
              <h1>Foods and Beverages</h1>
              <v-btn color="primary" class="mt-2" @click="login"
                >Shop Now</v-btn
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="2">
            <v-card class="card text-center">
              <v-icon color="#0c3a68" x-large class="mb-2"
                >mdi-tshirt-crew</v-icon
              >
              <h1>Apparel and Fashion</h1>
              <v-btn color="primary" class="mt-2" @click="login"
                >Shop Now</v-btn
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="2">
            <v-card class="card text-center">
              <v-icon color="#0c3a68" x-large class="mb-2">mdi-home</v-icon>
              <h1>Home Appliance</h1>
              <v-btn color="primary" class="mt-2" @click="login"
                >Shop Now</v-btn
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="2">
            <v-card class="card text-center">
              <v-icon color="#0c3a68" x-large class="mb-2">mdi-pinwheel</v-icon>
              <h1>Toys and Games</h1>
              <v-btn color="primary" class="mt-2" @click="login"
                >Shop Now</v-btn
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="2">
            <v-card class="card text-center">
              <v-icon color="#0c3a68" x-large class="mb-2">mdi-paw</v-icon>
              <h1>Pet Supplies</h1>
              <v-btn color="primary" class="mt-2" @click="login"
                >Shop Now</v-btn
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="2">
            <v-card class="card text-center">
              <v-icon color="#0c3a68" x-large class="mb-2">mdi-pill</v-icon>
              <h1>Pharmaceutical</h1>
              <v-btn color="primary" class="mt-2" @click="login"
                >Shop Now</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
      </section>

      <section class="mt-10" id="about-us">
        <h1 class="text-h4">ABOUT US</h1>
        <v-row>
          <v-col cols="12" md="6">
            <img src="../../assets/about.png" alt="About Picture" />
          </v-col>
          <v-col cols="12" md="6">
            <div class="mt-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
                elementum tempus egestas sed sed. Eu tincidunt tortor aliquam
                nulla facilisi cras fermentum odio. In fermentum posuere urna
                nec tincidunt praesent semper feugiat nibh. Risus ultricies
                tristique nulla aliquet enim tortor at auctor urna. Lectus sit
                amet est placerat. Mattis rhoncus urna neque viverra. Tempus
                imperdiet nulla malesuada pellentesque elit eget gravida cum.
                Accumsan lacus vel facilisis volutpat est velit. Duis tristique
                sollicitudin nibh sit amet commodo. Ut tristique et egestas quis
                ipsum suspendisse ultrices gravida. Dictum sit amet justo donec
                enim. Dictum fusce ut placerat orci nulla pellentesque
                dignissim. Tellus id interdum velit laoreet. Urna et pharetra
                pharetra massa massa ultricies.
              </p>

              <p>
                Risus feugiat in ante metus dictum. Urna duis convallis
                convallis tellus. Eu lobortis elementum nibh tellus molestie
                nunc non blandit massa. Ac odio tempor orci dapibus ultrices in
                iaculis nunc. Euismod lacinia at quis risus sed vulputate. Vel
                pretium lectus quam id leo in vitae. Lectus urna duis convallis
                convallis tellus. Nulla aliquet porttitor lacus luctus accumsan
                tortor posuere ac. Diam vulputate ut pharetra sit amet aliquam
                id. Sed faucibus turpis in eu mi. Condimentum vitae sapien
                pellentesque habitant morbi tristique senectus. Morbi tristique
                senectus et netus et malesuada. Dui nunc mattis enim ut tellus.
                Ut porttitor leo a diam sollicitudin tempor. Felis eget nunc
                lobortis mattis aliquam. Elit scelerisque mauris pellentesque
                pulvinar pellentesque habitant morbi tristique. Duis convallis
                convallis tellus id interdum velit laoreet id donec.
              </p>
            </div>
          </v-col>
        </v-row>
      </section>
    </main>
    <footer class="footer mt-10 text-center" color="primary">
      <v-row>
        <v-col cols="12" md="4">
          <h1 class="text-h4 mb-4">CONTACT US</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
            elementum tempus egestas sed sed. Eu tincidunt tortor aliquam nulla
            facilisi cras fermentum odio. In fermentum posuere urna nec
            tincidunt praesent semper feugiat nibh. Risus ultricies tristique
            nulla aliquet enim tortor at auctor urna.
          </p>

          <p>
            <v-icon class="mr-2">mdi-email</v-icon>
            e-palengke@gmail.com
          </p>
          <p>
            <v-icon class="mr-2">mdi-phone</v-icon>
            0900-000-0000
          </p>
        </v-col>
        <v-col cols="12" md="4">
          <h1 class="text-h4 mb-4">SOCIAL MEDIA</h1>
          <v-btn text color="#1877f2"
            ><v-icon class="mr-2">mdi-facebook</v-icon>Facebook</v-btn
          >
          <v-btn text color="#ff0000"
            ><v-icon class="mr-2">mdi-youtube</v-icon>YouTube</v-btn
          >
          <br />
          <v-btn text color="#e60023"
            ><v-icon class="mr-2">mdi-pinterest</v-icon>Pinterest</v-btn
          >
          <v-btn text color="#0077b5"
            ><v-icon class="mr-2">mdi-linkedin</v-icon>LinkedIn</v-btn
          >
          <br />
          <v-btn text color="#08a0e9"
            ><v-icon class="mr-2">mdi-twitter</v-icon>Twitter</v-btn
          >
          <v-btn text color="#8134af"
            ><v-icon class="mr-2">mdi-instagram</v-icon>Instagram</v-btn
          >
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Name"
            outlined
            hide-details="auto"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            label="Email"
            outlined
            hide-details="auto"
            class="mb-3"
            type="email"
          ></v-text-field>
          <v-text-field
            label="Subject"
            outlined
            hide-details="auto"
            class="mb-3"
          ></v-text-field>
          <v-textarea
            label="Message"
            outlined
            hide-details="auto"
            class="mb-3"
          ></v-textarea>
          <v-btn color="primary" dark class="submit-btn">Submit</v-btn>
        </v-col>
      </v-row>

      <v-divider class="mt-5 mb-5"></v-divider>
      <p>Copyright | All Rights Reserved.</p>
    </footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  methods: {
    registration() {
      this.$router.push("/Registration");
    },
    login() {
      this.$router.push("/Login");
    },
  },
};
</script>

<style scoped>
.navbar {
  padding: 0 15rem 0;
}
.main {
  padding: 0 16rem 0;
  color: white;
  /* margin: 8rem 0 0; */
}
.main h1 {
  font-weight: 500;
}
/* .shop-btn {
  margin: 0 0 10rem;
} */
.card {
  padding: 1rem;
}
.footer {
  background: #c8e0f6;
  padding: 1rem 16rem 0;
}
.submit-btn {
  width: 100%;
}
</style>
