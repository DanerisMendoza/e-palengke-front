<template>
    <v-app>
        <SideMenuBar/>
        <h1>END USER PAGE</h1>
    </v-app>
</template>

<script>
    import SideMenuBar from  '@/views/components/SideMenuBar.vue'
    import Login from '../components/Login.vue';
    export default{
        components: { Login,SideMenuBar}
    }
</script>