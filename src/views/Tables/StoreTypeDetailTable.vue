<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="STORE_TYPE_DETAIL"
        >
        <template v-slot:item="{ item }">
          <tr>
            <td style="text-align: center;">{{ item.name }}</td>
            <td style="text-align: center;"> 
              <!-- <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon> -->
              <v-icon @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
            </td>
          </tr>
          
        </template>

        </v-data-table>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default{
        data(){
            return {
                headers: [
                    { text: "name", value:'name', align: "center",  sortable: false },
                    { text: 'Actions', align: "center", value: 'actions', sortable: false },
                    ],
                } 
            },

        computed: {
            ...mapGetters([
                'STORE_TYPE_DETAIL',
            ])
	    },

        methods: {
            deleteItem(item) {
                this.$store.dispatch('DELETE_STORE_TYPE_DETAIL_BY_ID',item.id)
            },
            editItem(item) {
                console.log(item)
            // this.$store.commit("SELECTED_REQUIREMENT_DETAILS", item);
            // this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET", 'UPDATE');
            // console.log('Edit button clicked'); 
            },
        },


        mounted(){
            this.$store.dispatch('GET_STORE_TYPE_DETAIL').then((response)=>{
                // console.log(response)
                // console.log(this.STORE_TYPE_DETAIL)
            })
            // this.$store.commit('STORE_TYPE_DETAIL',[1,2,3])
            // console.log(this.STORE_TYPE_DETAIL)
            // console.log(this.headers)
            // this.$store.dispatch("GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS")
        }
    }
</script>