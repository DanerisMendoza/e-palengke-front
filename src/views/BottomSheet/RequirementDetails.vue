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
                if (this.REQUIREMENT_DETAIL_BOTTOMSHEET === 'ADD') {
                    if (this.name.trim() === '') {
                        // Show an error message when the name is empty
                        this.$swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        text: 'Please enter a requirement name before adding.',
                        });
                    } else {
                    const payload = { requirement_id: this.SELECTED_REQUIREMENT.id, name: this.name };
                    this.$swal.fire({
                        icon: 'question',
                        title: 'Adding Requirement',
                        text: 'Are you sure you want to add a new requirement?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, Add it',
                        cancelButtonText: 'No, cancel',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                        this.$store.dispatch("STORE_REQUIREMENT_DETAIL", payload).then((response) => {
                            if (response === 'success') {
                            this.$swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Adding Requirement Successfully!.',
                        });
                            this.$store.commit("SELECTED_REQUIREMENT_DETAIL", null);
                            this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET", null);
                            this.$store.dispatch("GET_REQUIREMENTS");
                            this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_ID", this.SELECTED_REQUIREMENT.id);
                            }
                        });
                        } else {
                        this.$swal.fire({
                            icon: 'question',
                            title: 'Action Cancelled',
                            text: 'You cancelled the Adding operation.',
                        });
                        this.$store.commit("SELECTED_REQUIREMENT_DETAIL", null);
                        this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET", null);
                        }
                    });
            }
        }
                else if (this.REQUIREMENT_DETAIL_BOTTOMSHEET === 'UPDATE') {
                const originalName = this.SELECTED_REQUIREMENT_DETAIL.name;
                const payload = {
                    request: {
                    name: this.name,
                    },
                    id: this.SELECTED_REQUIREMENT_DETAIL.id,
                };
                this.$swal.fire({
                    icon: 'info',
                    title: 'Updating Requirement',
                    text: 'Are you sure you want to update this requirement?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Update it',
                    cancelButtonText: 'No, cancel',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    })
                    .then((result) => {
                if (result.isConfirmed) {
                    if (this.name !== originalName) {
                    this.$store.dispatch("UPDATE_REQUIREMENT_DETAIL_BY_ID", payload).then((response) => {
                        if (response === 'success') {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Requirement Updated Successfully!.',
                        });
                        this.$store.commit("SELECTED_REQUIREMENT_DETAIL", null);
                        this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET", null);
                        this.$store.dispatch("GET_REQUIREMENTS");
                        this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_ID", this.SELECTED_REQUIREMENT.id);
                        }
                    });
                    } else {
                    this.$swal.fire({
                        icon: 'info',
                        title: 'No Changes Detected',
                        text: 'No changes were made to the requirement name.',
                    });
                    }
                } else {
                    this.$swal.fire({
                    icon: 'info',
                    title: 'Action Cancelled',
                    text: 'You cancelled the update operation.',
                    });
                    this.$store.commit("SELECTED_REQUIREMENT_DETAIL", null);
                    this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET", null);
                }
                });
            }
                            

            },
        },
        
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
                'SELECTED_REQUIREMENT_DETAIL',
                'REQUIREMENT_DETAIL_BOTTOMSHEET',
            ]),
	    },

        mounted() {
            if (this.REQUIREMENT_DETAIL_BOTTOMSHEET === 'UPDATE') {
                // this.$swal.fire({
                //     icon: 'info',
                //     title: 'Update Requirement',
                //     text: 'Are you sure you want to update?',
                //     showCancelButton: true,
                //     confirmButtonText: 'Yes, update it!',
                //     cancelButtonText: 'No, cancel',
                // })
                // .then((result) => {
                //     if (result.isConfirmed) {
                //     this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET",'UPDATE');
                //     } else {
                //         this.$swal.fire({
                //          icon: 'info',
                //          title: 'Action Cancelled',
                //          text: 'You cancelled the update operation.',
                //         })
                //     }
                // });
                this.name = this.SELECTED_REQUIREMENT_DETAIL.name;
            }
        },

    }
    

</script>