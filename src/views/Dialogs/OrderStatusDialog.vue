<template>
    <v-container>
        <v-dialog v-model="dialog" persistent>
            <v-card>
                <v-row>
                    <v-col>
                        <v-btn text icon class="float-right" @click="closeDialog()">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-card-title>Order Status: </v-card-title>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            dialog: true
        }
    },
    computed: {
        ...mapGetters([
           "SELECTED_ORDER_STATUS"
        ]),
    },
    methods: {
        closeDialog() {
            this.$store.commit('SELECTED_ORDER_STATUS', null)
            console.log(this.SELECTED_ORDER_STATUS)
        }
    }
}
</script>