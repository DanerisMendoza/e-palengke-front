<template>
  <v-app style="background: #0c3a68;">
    <v-app-bar color="#0c3a68" dark app height="90" elevation="0">
      <div class="navbar">
        <v-toolbar-title>
          <img
            src="../../assets/white-ep-3.png"
            alt="E-Palengke Logo"
            width="70"
          />
        </v-toolbar-title>
        <div style="flex-grow: 1"></div>
        <div>
          <v-btn text @click="registration">Sign Up</v-btn>
          <label>|</label>
          <v-btn text @click="login">Login</v-btn>
        </div>
      </div>
    </v-app-bar>
      <v-container>
        <div class="main">    
            <section class="section1">
              <img src="../../assets/shopping.png" alt="Illustration" />
              <div></div>
              <div class="p_group">
                <p>Online Shopping</p>
                <p>Unleash the power of convenience</p>
                <p>
                  The E-Palengke System is its commitment to community empowerment
                  and socioeconomic development. By offering employment
                  opportunities to local residents as delivery personnel, the
                  platform not only provides a valuable service to customers but
                  also contributes to income generation and economic growth within
                  communities.
                </p>
                <v-btn
                  style="width: 30%"
                  color="primary"
                  class="shop-btn"
                  @click="login"
                  >Shop Now</v-btn
                >
              </div>
            </section>
            <section class="section2">
              <p class="text-h4">CATEGORY</p>
              <div class="chip-group">
                <v-chip color="#c8e0f6">Fresh Produce</v-chip>
                <v-chip color="#c8e0f6">Dairy Products</v-chip>
                <v-chip color="#c8e0f6">Meat and Poultry</v-chip>
                <v-chip color="#c8e0f6">Seafood</v-chip>
                <v-chip color="#c8e0f6">Bakery Items</v-chip>
                <v-chip color="#c8e0f6">Beverages</v-chip>
                <v-chip color="#c8e0f6">Snacks</v-chip>
                <v-chip color="#c8e0f6">Canned Goods</v-chip>
                <v-chip color="#c8e0f6">Frozen Foods</v-chip>
                <v-chip color="#c8e0f6">Condiments and Sauces</v-chip>
                <v-chip color="#c8e0f6">Breakfast Cereals and Grains</v-chip>
              </div>
            </section>
            <section class="section3">
              <p class="text-h4">PRODUCTS</p>
              <div class="card-group">
                <v-card class="card text-center">
                  <v-icon color="#0c3a68" x-large class="mb-2">mdi-food</v-icon>
                  <p>Foods</p>
                  <v-btn color="primary" class="mt-2" @click="login"
                    >Shop Now</v-btn
                  >
                </v-card>
                <v-card class="card text-center">
                  <v-icon color="#0c3a68" x-large class="mb-2"
                    >mdi-tshirt-crew</v-icon
                  >
                  <p>Apparel</p>
                  <v-btn color="primary" class="mt-2" @click="login"
                    >Shop Now</v-btn
                  >
                </v-card>
                <v-card class="card text-center">
                  <v-icon color="#0c3a68" x-large class="mb-2">mdi-home</v-icon>
                  <p>Home Appliance</p>
                  <v-btn color="primary" class="mt-2" @click="login"
                    >Shop Now</v-btn
                  >
                </v-card>
                <v-card class="card text-center">
                  <v-icon color="#0c3a68" x-large class="mb-2">mdi-pinwheel</v-icon>
                  <p>Toys and Games</p>
                  <v-btn color="primary" class="mt-2" @click="login"
                    >Shop Now</v-btn
                  >
                </v-card>
                <v-card class="card text-center">
                  <v-icon color="#0c3a68" x-large class="mb-2">mdi-paw</v-icon>
                  <p>Pet Supplies</p>
                  <v-btn color="primary" class="mt-2" @click="login"
                    >Shop Now</v-btn
                  >
                </v-card>
                <v-card class="card text-center">
                  <v-icon color="#0c3a68" x-large class="mb-2">mdi-pill</v-icon>
                  <p>Pharmaceutical</p>
                  <v-btn color="primary" class="mt-2" @click="login"
                    >Shop Now</v-btn
                  >
                </v-card>
              </div>
            </section>
            <section class="section4">
              <p class="text-h4">ABOUT US</p>
              <div>
                <img src="../../assets/about.png" alt="About Picture" />
                <div></div>
                <p>
                  The E-Palengke System is a virtual “palengke” product ordering and
                  delivery platform that connects users to the nearby stores within
                  their vicinity or geomap radius. It consists of four users:
                  customer, seller, delivery, and admin. It has a web and mobile
                  version. It has responsive design to be able to be used in any
                  kind of devices like Mobile, Tablet, Laptop, and PC. It is an
                  online shopping system for homebound individuals, enabling
                  convenient “palengke” product purchases. It also provides
                  employment to local residents as foot-based delivery personnel,
                  fostering income generation without any initial investment. The
                  system offers employment to those unemployed, eliminating the need
                  for external transportation like motorcycles. This platform
                  empowers registered community members to engage in local buying
                  and selling, and streamlining shopping. <br></br> In today's digital age,
                  the integration of technology into daily activities has become
                  increasingly prevalent, transforming traditional practices across
                  various sectors. The E-Palengke System represents an innovative
                  approach to revolutionize the traditional concept of "palengke" by
                  providing a virtual platform for product ordering and delivery.
                  Designed to cater to the needs of homebound individuals, the
                  system bridges the gap between consumers and nearby stores within
                  their locality. With its user-friendly web and mobile versions,
                  coupled with responsive design, the platform ensures accessibility
                  across different devices, offering convenience and flexibility to
                  users.
                </p>
              </div>
            </section>
  
        </div>

  </v-container>

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
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}
.main {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* overflow-x: hidden; */
  gap: 5rem;
  width: 100%;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.2rem;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.2rem;
}

.card {
  width: 9rem;
  display: flex;
  flex-direction: column;
    flex-grow: 1;
}

.card-group p {
  flex-grow: 1;
  font-size: 1rem;
}

/* mobile */
@media (max-width: 640px) {

  .section1 img{
    max-width: 22rem;
  }
  .section4 img {
    max-height: 22rem;
    max-width: 22rem;
  }

  .section1 div p:nth-child(1) {
    font-size: 2.5rem;
  }
  .section1 div p:nth-child(2) {
    font-size: 1.37rem;
  }
  .section1 div p:nth-child(3) {
    font-size: 1rem;
  }
}

/* higer width than mobile */
@media (min-width: 640px) {

  /* parent */
  .section1{
    display: flex;
    flex-direction: row-reverse;
  }

  .section4 div{
    display: flex;
    flex-direction: row;
  }
  /* child */
  .section1 div:nth-child(1){
    flex-grow: 1;
  }
  .section1 .p_group{
    /* max-width: 25rem; */
  }

  .section1 img{
    max-width: 40rem;
  }

  .section4 img{
    max-height: 40rem;
    max-width: 40rem;
  }

  .section4 div div{
     flex-grow: 1;
  }
  
  .section4 div p{
    max-width: 60rem;
  }

  .section4 div img{
    height: 33rem;
    width: 40rem;
  }
 
  .section1 div p:nth-child(1) {
    font-size: 3rem;
  }
  .section1 div p:nth-child(2) {
    font-size: 1.35rem;
  }
  .section1 div p:nth-child(3) {
    font-size: 1.25rem;
  }

}
</style>
