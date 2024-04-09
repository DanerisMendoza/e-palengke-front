<template>
  <v-app style="background: #0c3a68">
    <v-app-bar
      color="#0c3a68"
      dark
      app
      height="90"

      elevation="0"
    >
    <div class="navbar">
      <v-toolbar-title>
        <img
          src="../../assets/white-ep-3.png"
          alt="E-Palengke Logo"
          width="70"
        />
      </v-toolbar-title>
      <div style="flex-grow: 1; "></div> 
      <div >
        <v-btn text @click="registration">Sign Up</v-btn>
        <label>|</label>
        <v-btn text @click="login">Login</v-btn>
      </div>
    </div>
    </v-app-bar>
    <v-container>
    <main class="main">
      <section class="section1" >
        <img class="image-container" src="../../assets/shopping.png" alt="Illustration" />
        <div class="content-container">
          <p class="p1" >Online Shopping</p>
          <p class="p2" >Unleash the power of convenience</p>
          <p class="p3" >
            The E-Palengke System is its commitment to community empowerment
            and socioeconomic development. By offering employment
            opportunities to local residents as delivery personnel, the
            platform not only provides a valuable service to customers but
            also contributes to income generation and economic growth within
            communities.
          </p>
           <v-btn  style="width: 30%;" color="primary" class="shop-btn" @click="login"
              >Shop Now</v-btn
            >  
          </div>
      </section>
      <section class="section2">
        <h1 class="text-h4">CATEGORY</h1>
        <div class="chip-group">
        <v-chip color="#c8e0f6" >Fresh Produce</v-chip>
        <v-chip color="#c8e0f6" >Dairy Products</v-chip>
        <v-chip color="#c8e0f6" >Meat and Poultry</v-chip>
        <v-chip color="#c8e0f6" >Seafood</v-chip>
        <v-chip color="#c8e0f6" >Bakery Items</v-chip>
        <v-chip color="#c8e0f6" >Beverages</v-chip>
        <v-chip color="#c8e0f6" >Snacks</v-chip>
        <v-chip color="#c8e0f6" >Canned Goods</v-chip>
        <v-chip color="#c8e0f6" >Frozen Foods</v-chip>
        <v-chip color="#c8e0f6" >Condiments and Sauces</v-chip>
        <v-chip color="#c8e0f6" >Breakfast Cereals and Grains</v-chip>
      </div>
      </section>
    </main>
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
  height: 100%;
  width: 100%;
  display: flex;
  gap: 5rem;
  flex-direction: column;
}

.section1{
  display: grid; 
  grid-template-columns: repeat(1, minmax(0, 1fr));
  align-items: start;
}

.section2{
 display: flex;
 flex-direction:column;
 gap: 1rem;
}

.chip-group{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.2rem;
}

/* mobile */

@media (max-width: 640px) {
  .image-container{
    width: 22rem;
  }  
  .p1{
    font-size: 2rem;
  }
  .p2{
    font-size: 1.35rem;
  }
  .p3{
    font-size: 1rem;
    max-width: 20rem;
  }
}

/* higer width than mobile */

@media (min-width: 640px) {
  .section1{
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .image-container{
    width: 40rem;
    order: 2;
  }  
  .p1{
    font-size: 5rem;
  }
  .p2{
    font-size: 3.35rem;
  }
  .p3{
    font-size: 1.5rem;
  }
}



/* .main h1 {
  font-weight: 500;
} */
/* .shop-btn {
  margin: 0 0 10rem;
} */
/* .card {
  padding: 1rem;
}
.footer {
  background: #c8e0f6;
  padding: 1rem 16rem 0;
}
.submit-btn {
  width: 100%;
} */
</style>
