<template>
    <v-container>
        <v-row justify="start" class="ml-3">
            <v-btn @click="startStop" :color="isRunning ? 'red' : 'green'">
                {{ isRunning ? 'Stop' : 'Start' }}
            </v-btn>
        </v-row>

        <!-- <v-row>
            <v-col>
                <MAP_COMPONENT :sidenavViewer="'delivery'" />
            </v-col>
        </v-row> -->
        <v-row>
            <v-col>
                <v-slider v-show="isVisible" v-model="circleRadius" class="mt-3" thumb-label="always">
                    <template v-slot:thumb-label="{ value }">
                        <div class="custom-thumb-label">{{ value }} </div>
                    </template>
                </v-slider>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card v-if="newOrder">
                    <v-progress-linear color="red lighten-2" buffer-value="0" stream></v-progress-linear>
                    <v-card-title>New Order Incoming</v-card-title>
                    <v-card-text>
                        <v-row v-for="(item, index) in TRANSACTION[0].orders">
                            <v-col>Order {{ index + 1 }}
                                <v-row v-for="(item2, index2) in item.order_details">
                                    <v-col>
                                        {{ item2.quantity }} {{ item2.name }} ₱{{ item2.price }}
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="accept">Accept</v-btn>
                        <v-btn @click="decline">Decline</v-btn>
                    </v-card-actions>
                    {{ countdown }}
                    <v-progress-linear color="red lighten-2" buffer-value="0" stream></v-progress-linear>
                </v-card>
                <v-skeleton-loader v-else class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
            </v-col>
            <v-col cols="6">
                <MAP_COMPONENT :sidenavViewer="'delivery'" />
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
            newOrder: false,
            isRunning: false,
            startTime: null,
            laps: [],
            progress: 0,
            timer: null,
            circleRadius: 500,
            isVisible: false,
            countdown: 10,
            isOrderAccept: false,
            declinedOrders: []
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
        ...mapGetters(["USER_DETAILS", "USER_INSIDE_RADIUS", "CIRCLE_RADIUS", "TRANSACTION", "ORDER_STORE_LAT_LNG"]),
    },
    methods: {
        accept() {
            this.newOrder = false
        },
        decline() {
            this.newOrder = false
        },
        registeredLocation() {
            const userDetails = this.USER_DETAILS.user_role_details
            const targetItem = userDetails.find(item => item.id === 4 && item.status === 'active');
            const latitude = targetItem.delivery_details[0].latitude
            const longitude = targetItem.delivery_details[0].longitude
            this.$store.commit("MARKER_LAT_LNG", [0, 0])
            this.$store.commit("CENTER", [0, 0])
            this.$store.commit("MARKER_LAT_LNG", [latitude, longitude])
            this.$store.commit("CENTER", [latitude, longitude])
            this.$store.commit("ZOOM", 17)
        },

        FIND_NEAR_BY() {
            if (this.isRunning && this.newOrder === false) {
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
                    this.$store.commit('ORDER_STORE_LAT_LNG', this.TRANSACTION[0].orders)
                    this.newOrder = true
                    this.startCountdown()
                })
            }
        },

        startCountdown() {
            // Set up an interval that decrements the countdown every second
            this.countdownInterval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    // Clear the interval when the countdown reaches 0
                    this.newOrder = false
                    this.countdown = 10
                    if(this.isRunning){
                        this.FIND_NEAR_BY()
                    }
                    clearInterval(this.countdownInterval);
                }
            }, 1000);
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
