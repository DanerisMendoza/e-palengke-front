<template>
  <v-app>
    <template v-if="$route.meta.showSideMenuBar">
      <SideMenuBar />
    </template>
    <router-view/>
  </v-app>
</template>

<script>
import SideMenuBar from  '@/views/components/SideMenuBar.vue'
export default {
  name: 'App',
  components: { SideMenuBar},
  data: () => ({
    //
  }),
};
</script>
