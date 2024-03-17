<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Applicants</p>
      </div>

      <Applicants />
      <ApplicantsCredentialDialog v-if="this.SELECTED_CREDENTIAL !== null" />
    </v-container>
  </v-app>
</template>

<script>
import Applicants from "../Tables/Applicants.vue";
import ApplicantsCredentialDialog from "../Dialogs/ApplicantsCredentialDialog.vue";
import { mapGetters } from "vuex";
export default {
  components: { Applicants, ApplicantsCredentialDialog },
  computed: {
    ...mapGetters(["SELECTED_CREDENTIAL"]),
  },
};
</script>

<style scoped>
.page-title p {
  margin-bottom: 1rem;
  color: #0c3a68;
}
.container {
  padding: 0 2.5rem 0;
}
</style>
