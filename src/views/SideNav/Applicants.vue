<template>
  <v-app style="background: #d0dae3">
    <v-container>
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
