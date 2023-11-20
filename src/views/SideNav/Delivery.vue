<template>
    <v-container>
        <Queue v-if="showComponent" />
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Queue from '../components/Queue.vue';
export default {
    components: { Queue },
    data() {
        return {
            showComponent: true,
        };
    },
    watch: {
        RESTART: {
            handler(val) {
                if (val) {
                    this.restart()
                }
            },
        },
    },
    methods: {
        async restart() {
            this.showComponent = false;
            this.$store.commit('CIRCLE_RADIUS',50)
            await new Promise((resolve) => setTimeout(resolve, 500));
            this.$store.commit('RESTART', false)
            this.showComponent = true;
        }
    },
    computed: {
        ...mapGetters(["RESTART"]),
    },
}
</script>