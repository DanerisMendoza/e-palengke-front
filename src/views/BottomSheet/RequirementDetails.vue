<template>
    <v-bottom-sheet v-model="bottom_sheet" persistent>
        <v-sheet height="300px">
            <v-row>
                    <v-col>
                        <v-btn text icon class="float-right" @click="closeDialog()">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            <h1>bottom_sheet</h1>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
    export default{
        data(){
            return{
                bottom_sheet: true
            }
        },
        methods:{
            closeDialog(){
                this.$store.commit("SELECTED_REQUIREMENT_DETAIL",null)
            },
        }
    }
</script>