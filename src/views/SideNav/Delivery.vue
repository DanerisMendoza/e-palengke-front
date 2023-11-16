<template>
    <v-container>
        <Queue v-if="showComponent" />
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Queue from '../components/Queue.vue';
import MAP_COMPONENT from "../components/Map.vue";
export default {
    components: { Queue, MAP_COMPONENT },
    data() {
        return {
            showComponent: true,
        };
    },
    watch: {
        RESTART: {
            handler(val) {
                if (val) {
                    this.showComponent = false;
                    this.$store.commit('RESTART',false)
                    this.showComponent = true;
                }
            },
        },
    },
    computed: {
        ...mapGetters(["RESTART"]),
    },
}
</script>