<template>
  <div>
    <v-navigation-drawer permanent app dark style="background-color: #383838">
      <v-app-bar absolute>
        <h1 class="white--text text-wrap">E-Palengke</h1>
      </v-app-bar>

      <v-list class="mt-8 ml-3">
        <br>
        <v-spacer></v-spacer>
        <v-subheader class="ma-0 pa-0">Access</v-subheader>
        <v-divider></v-divider>
        <v-list>
          <v-list>
            <v-list-item
              class="ma-0 pa-0"
              v-for="side_nav in SIDE_NAV"
              :key="side_nav.id"
              @click="navigateToRoute(side_nav.name, side_nav.id)"
            >
              <v-list-item-content>
                {{ side_nav.name }}
              </v-list-item-content>
            </v-list-item>
          </v-list>    
        </v-list>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#1976d2ff" app outlined class="ma-0 pa-0 w-100">
      <div class="ml-auto p-2">
        <v-menu offset-y :close-on-click="closeOnClick">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item class="pa-0 ma-0 py-1">
              <span class="text-caption ma-1 pa-1">
              </span>
              <v-btn class="ma-0 pa-0" icon v-bind="attrs" v-on="on">
                <v-icon color="black">mdi-chevron-down</v-icon>
              </v-btn>
            </v-list-item>
          </template>
          <v-list dense>
            <v-list-item @click="submitLogout()">
              <v-list-item-title> Logout </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
    }
  },
  data: () => ({
    drawer: null,
    closeOnClick: false,
    selectedItem: 1,
  }),
  methods: {
    submitLogout() {
      this.$store.dispatch('Logout').then((response) =>{
        if(response === 'success'){
          this.$router.push('/Login');
          localStorage.removeItem("token");
          this.$store.commit('SIDE_NAV',null)
        }
      })
    },
    
    navigateToRoute(routeName, id) {
      this.$router.push({ name: routeName, params: { id } });
    },
   
  },
  computed: {
    ...mapGetters([
      'SIDE_NAV'
    ])
  },

  mounted() {
    this.$store.dispatch('GetSideNav')
  },
}
</script>

<style scoped></style>