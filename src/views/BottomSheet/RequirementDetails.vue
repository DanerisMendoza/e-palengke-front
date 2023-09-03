<template>
    <v-bottom-sheet v-model="bottom_sheet" persistent>
        <v-form ref="myForm" @submit.prevent >
            <v-sheet height="300px">
                <v-row>
                    <v-col>
                        <v-btn text icon class="float-right" @click="closeDialog()">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="ml-12">
                    <v-col cols="12" lg="4" class="text-center mx-auto">
                        <v-text-field v-model="name" label="Enter new Requirement-detail"></v-text-field>
                        <v-btn class="float-right" @click="submit()">
                            {{ REQUIREMENT_DETAIL_BOTTOMSHEET }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-form>
    </v-bottom-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
    export default{
        data(){
            return{
                bottom_sheet: true,
                name:null
            }
        },
        methods:{
            closeDialog(){
                this.$store.commit("SELECTED_REQUIREMENT_DETAIL",null)
                this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET",null)
            },
            submit(){
                if(this.REQUIREMENT_DETAIL_BOTTOMSHEET === 'ADD'){
                    const payload={requirement_id: this.SELECTED_REQUIREMENT.id, name: this.name}
                    console.log(payload)
                    this.$store.dispatch("STORE_REQUIREMENT_DETAIL",payload).then((response)=>{
                        if(response == 'success'){
                            this.$store.dispatch("GET_REQUIREMENTS")
                            this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_ID",this.SELECTED_REQUIREMENT.id)
                        }
                    })
                }
            },
        },
        computed: {
        ...mapGetters([
            'SELECTED_REQUIREMENT',
            'REQUIREMENT_DETAIL_BOTTOMSHEET',
        ])
	  },
    }
</script>