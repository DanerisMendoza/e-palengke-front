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
              The E-Palengke System is its commitment to community empowerment
              and socioeconomic development. By offering employment
              opportunities to local residents as delivery personnel, the
              platform not only provides a valuable service to customers but
              also contributes to income generation and economic growth within
              communities.
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
              <h1>Foods</h1>
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
              <h1>Apparel</h1>
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
                The E-Palengke System is a virtual “palengke” product ordering
                and delivery platform that connects users to the nearby stores
                within their vicinity or geomap radius. It consists of four
                users: customer, seller, delivery, and admin. It has a web and
                mobile version. It has responsive design to be able to be used
                in any kind of devices like Mobile, Tablet, Laptop, and PC. It
                is an online shopping system for homebound individuals, enabling
                convenient “palengke” product purchases. It also provides
                employment to local residents as foot-based delivery personnel,
                fostering income generation without any initial investment. The
                system offers employment to those unemployed, eliminating the
                need for external transportation like motorcycles. This platform
                empowers registered community members to engage in local buying
                and selling, and streamlining shopping.
              </p>
              <p>
                In today's digital age, the integration of technology into daily
                activities has become increasingly prevalent, transforming
                traditional practices across various sectors. The E-Palengke
                System represents an innovative approach to revolutionize the
                traditional concept of "palengke" by providing a virtual
                platform for product ordering and delivery. Designed to cater to
                the needs of homebound individuals, the system bridges the gap
                between consumers and nearby stores within their locality. With
                its user-friendly web and mobile versions, coupled with
                responsive design, the platform ensures accessibility across
                different devices, offering convenience and flexibility to
                users.
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
            Welcome to our E-Palengke System! We understand that sometimes you
            may need assistance or have inquiries regarding our services. Our
            Contact Us page is designed to ensure that you can reach out to us
            easily and receive the support you need. Whether you have questions
            about placing an order, need assistance with navigating our
            platform, or have suggestions for improvement, we're here to help.
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
