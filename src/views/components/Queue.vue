<template>
    <v-container>
        <v-row justify="start" class="ml-3">
            <v-btn @click="startStop" :color="isRunning ? 'red' : 'green'">
                {{ isRunning ? 'Stop' : 'Start' }}
            </v-btn>
        </v-row>

        <v-row>
            <v-col>
                <MAP_COMPONENT :sidenavViewer="'delivery'" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <!-- <v-slider v-model="circleRadius" class="mt-3" thumb-label="always">
                    <template v-slot:thumb-label="{ value }">
                        <div class="custom-thumb-label">{{ value }} meters</div>
                    </template>
                </v-slider> -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import MAP_COMPONENT from "./Map.vue";
export default {
    components: { MAP_COMPONENT },
    data() {
        return {
            isRunning: false,
            startTime: null,
            laps: [],
            progress: 0,
            timer: null,
            circleRadius: 500
        };
    },
    watch: {
        circleRadius: {
            handler(val) {
                this.$store.commit("CIRCLE_RADIUS", val * 3)
                this.FIND_NEAR_BY()
            },
        }
    },
    computed: {
        formattedElapsedTime() {
            return this.formatTime(this.laps[this.laps.length - 1] || 0);
        },
        ...mapGetters(["USER_DETAILS", "USER_INSIDE_RADIUS", "CIRCLE_RADIUS", "TRANSACTION"]),
    },
    methods: {
        registeredLocation() {
            const userDetails = this.USER_DETAILS.user_role_details
            const targetItem = userDetails.find(item => item.id === 4 && item.status === 'active');
            const latitude = targetItem.delivery_details[0].latitude
            const longitude = targetItem.delivery_details[0].longitude
            this.$store.commit("MARKER_LAT_LNG", [0, 0])
            this.$store.commit("CENTER", [0, 0])
            this.$store.commit("MARKER_LAT_LNG", [latitude, longitude])
            this.$store.commit("CENTER", [latitude, longitude])
            this.$store.commit("ZOOM", 19)
        },

        FIND_NEAR_BY() {
            if (this.isRunning) {
                const userDetails = this.USER_DETAILS.user_role_details
                const targetItem = userDetails.find(item => item.id === 4 && item.status === 'active');
                const latitude = targetItem.delivery_details[0].latitude
                const longitude = targetItem.delivery_details[0].longitude
                const payload = {
                    latitude: latitude,
                    longitude: longitude,
                    radius: this.CIRCLE_RADIUS,
                    user_id: this.USER_DETAILS.user_id
                }
                this.$store.dispatch('FIND_ORDER_WITHIN_RADIUS', payload).then((response) => {
                    console.log(response)
                })
            }
        },

        startStop() {
            // Stop the timer
            if (this.isRunning) {
                clearInterval(this.timer);
                this.timer = null;
                this.isRunning = !this.isRunning;
                // this.$store.dispatch('MarkOffline', payload)
            }
            // Start the timer
            else {
                this.startTime = new Date().getTime();
                this.timer = setInterval(this.updateTime, 100);
                this.isRunning = !this.isRunning;
                this.FIND_NEAR_BY()
                // this.$store.dispatch('MarkOnline', payload)
                // this.$store.dispatch('FIND_ORDER', payload)
            }
        },
        reset() {
            // Reset the timer and laps
            this.isRunning = false;
            this.startTime = null;
            this.laps = [];
            this.progress = 0;
            clearInterval(this.timer);
            this.timer = null;
        },
        updateTime() {
            // Update the elapsed time and progress
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - this.startTime;
            this.laps.push(elapsedTime);

            // Update the progress (limited to 100%)
            this.progress = Math.min((elapsedTime / (60 * 1000)) * 100, 100);
        },
        formatTime(time) {
            // Format the time in minutes and seconds (without milliseconds)
            const minutes = Math.floor(time / 60000);
            const seconds = Math.floor((time % 60000) / 1000);
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        },

    },
    mounted() {
        this.registeredLocation()
    }
};
</script>
  
<style scoped>
.custom-thumb-label {
    max-width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
}
</style>
