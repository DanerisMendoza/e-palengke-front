<template>
    <v-container>
        <v-card>
            <v-data-table :headers="headers" :items="APPLICANTS">
                <template v-slot:item="{ item }">
                    <tr>
                        <td style="text-align: center;">{{ item.applicant_name }}</td>
                        <td style="text-align: center;">{{ item.status }}</td>
                        <td style="text-align: center;">{{ item.user_role_name }}</td>
                        <td style="text-align: center;">{{ item.gender }}</td>
                        <td style="text-align: center;">{{ item.age }}</td>
                        <td style="text-align: center;">
                            <v-btn text @click="view(item.user_role_id)">
                                <v-icon>mdi-file-multiple</v-icon>
                            </v-btn>
                            <v-btn v-if="item.status === 'pending'" text @click="dissaprove(item.user_role_id)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-btn v-if="item.status === 'pending'" text @click="approve(item.user_role_id)">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            headers: [
                { text: "Name", value: 'applicant_name', align: "center", sortable: false },
                { text: "Status", value: 'status', align: "center", sortable: false },
                { text: "Role", value: 'user_role_name', align: "center", sortable: false },
                { text: "Gender", value: 'gender', align: "center", sortable: false },
                { text: "Age", value: 'age', align: "center", sortable: false },
                { text: 'Actions', value: 'actions', align: "center", sortable: false },
            ],
        }
    },

    methods: {
        view(item) {
            this.$store.commit('SELECTED_CREDENTIAL', item)
        },
        approve(item) {
            this.$store.dispatch('APPROVE_USER_ROLE', item).then(() => {
                this.$store.dispatch('GET_APPLICANTS')
            })
        },
        dissaprove(item) {
            this.$store.dispatch('DISAPPROVE_USER_ROLE', item).then(() => {
                this.$store.dispatch('GET_APPLICANTS')
            })
        }
    },

    computed: {
        ...mapGetters([
            "APPLICANTS",
        ]),
    },

    mounted() {
        this.$store.dispatch('GET_APPLICANTS')
    }
}
</script>