<template>
  <v-container>
    <h2>PROFILE PAGE</h2>

    <ProfileTable />
  </v-container>
</template>

<script>
import ProfileTable from "../Tables/ProfileTable.vue";
export default {
  components: { ProfileTable },
};
</script>
