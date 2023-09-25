<template>
    <v-container fluid>
        <v-dialog v-model="dialog" persistent>
            <v-card>
                <v-row>
                    <v-col>
                        <v-btn text icon class="float-right" @click="closeDialog()">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <CartTable/>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import CartTable from '../Tables/CartTable.vue';
export default{
    components:{
        CartTable   
    },
    data(){
        return{
            dialog: true
        }
    },
    methods:{
        closeDialog(){
            this.$store.commit('CART',false)
        }
    }
}

</script>