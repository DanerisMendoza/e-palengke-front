<template>
  <v-app>
    <template v-if="$route.meta.showSideMenuBar">
      <SideMenuBar />
    </template>
    <router-view v-if="routerViewVisible"/>
  </v-app>
</template>

<script>
import SideMenuBar from  '@/views/components/SideMenuBar.vue'
export default {
  name: 'App',
  components: { SideMenuBar},
  data: () => ({
    routerViewVisible: false,
  }),
  async created() {
    // Simulate a delay of 1 second (adjust as needed)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // After the delay, set routerViewVisible to true to render the router-view
    this.routerViewVisible = true;
  },
};
</script>
