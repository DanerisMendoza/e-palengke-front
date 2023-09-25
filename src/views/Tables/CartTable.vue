<template>
    <v-container>
        <v-data-table 
        :headers="headers" 
        :items="data">
        </v-data-table>
    </v-container>
</template>

<script>

export default{
    data(){
        return{
            headers: [],
            data:[]
        }
    }
}

</script>