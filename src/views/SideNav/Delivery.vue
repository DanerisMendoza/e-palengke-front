<template>
    <v-container>
        <Queue/>
        <MAP_COMPONENT :sidenavViewer="'delivery'"/>
    </v-container>
</template>

<script>
    import Queue from '../components/Queue.vue';
    import MAP_COMPONENT from "../components/Map.vue";
    export default {
        components: { Queue, MAP_COMPONENT }
    }
</script>