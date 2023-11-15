<template>
    <v-container>
        <v-row justify="start" class="ml-3">
            <v-switch v-model="isRunning" label="Start Shift" :readonly="hasDeliver">

            </v-switch>
        </v-row>
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
                <v-card v-if="newOrder && isRunning && TRANSACTION.length != 0 && !hasDeliver">
                    <v-progress-linear color="red lighten-2" buffer-value="0" stream></v-progress-linear>
                    <v-card-title>New Order Incoming</v-card-title>
                    <v-card-text>
                        Customer Name: {{ TRANSACTION[0].customer_name }}
                        <br>
                        Customer Address: {{ TRANSACTION[0].customer_address }}
                        <br>
                        Status: {{ TRANSACTION[0].status }}
                        <br>
                        Contact: {{ TRANSACTION[0].phone_number }}
                        <v-divider></v-divider> 
                        <br>
                        <v-row v-for="(item, index) in TRANSACTION[0].orders" :key="index">
                            <v-col>
                                <v-divider></v-divider>
                                Store Name: {{ item.name }}
                                <br>
                                Store Address: {{ item.address }}
                                <br>
                                <v-divider></v-divider>
                                <div v-for="(item2, index2) in item.order_details" :key="index2">
                                    {{ item2.quantity }} {{ item2.name }} ₱{{ item2.price }}
                                    <br>
                                </div>
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="ACCEPT_TRANSACTION">Accept</v-btn>
                        <v-btn @click="decline">Decline</v-btn>
                    </v-card-actions>
                    {{ countdown }}
                    <v-progress-linear color="red lighten-2" buffer-value="0" stream></v-progress-linear>
                </v-card>
                <v-card v-else-if="hasDeliver">
                    <v-card-title>Order</v-card-title>
                    <v-card-text>
                        Customer Name: {{ TRANSACTION[0].customer_name }}
                        <br>
                        Customer Address: {{ TRANSACTION[0].customer_address }}
                        <br>
                        Status: {{ TRANSACTION[0].status }}
                        <br>
                        Contact: {{ TRANSACTION[0].phone_number }}
                        <v-divider></v-divider>                        
                        <br>
                        <v-row v-for="(item, index) in TRANSACTION[0].orders" :key="index">
                            <v-col>
                                <v-divider></v-divider>
                                Store Name: {{ item.name }}
                                <br>
                                Store Address: {{ item.address }}
                                <br>
                                <v-divider></v-divider>
                                <div v-for="(item2, index2) in item.order_details" :key="index2">
                                    {{ item2.quantity }} {{ item2.name }} ₱{{ item2.price }}
                                    <br>
                                </div>
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="TRANSACTION[0].status == 'To Pickup'" @click="PICKUP_ORDERS">Pickup</v-btn>
                        <!-- <v-btn v-else-if="TRANSACTION[0].status == 'To Deliver'" @click="PICKUP_ORDERS">Arrived at Customer Location</v-btn> -->
                        <v-btn v-else-if="TRANSACTION[0].status == 'Picked up'" @click="DROP_OFF">Drop off</v-btn>
                    </v-card-actions>
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
            defaultCountdown: 8,
            hasDeliver: false,
            newOrder: false,
            isRunning: false,
            circleRadius: 500,
            isVisible: false,
            countdown: 0,
            declinedTransactions: []
        };
    },
    watch: {
        circleRadius: {
            handler(val) {
                this.$store.commit("CIRCLE_RADIUS", val * 3)
                this.countdown = 0
            },
        },
        isRunning: {
            handler(val) {
                if (val) {
                    this.FIND_NEAR_BY()
                } else {
                    if (!this.hasDeliver && this.CURRENT_TRANSACTION_ID != null) {
                        const payload = {
                            transaction_id: this.CURRENT_TRANSACTION_ID,
                            user_id: this.USER_DETAILS.user_id,
                        }
                        this.$store.dispatch('REMOVE_TRANSACTION_DELIVERY_ID', payload)
                    }
                    this.$store.commit('ORDER_STORE_LAT_LNG', [])
                    this.$store.commit('TRANSACTION', [])
                    this.declinedTransactions = []
                    this.newOrder = false
                }
            }
        }
    },
    computed: {
        formattedElapsedTime() {
            return this.formatTime(this.laps[this.laps.length - 1] || 0);
        },
        ...mapGetters(["USER_DETAILS", "USER_INSIDE_RADIUS", "CIRCLE_RADIUS", "TRANSACTION", "ORDER_STORE_LAT_LNG", "CURRENT_TRANSACTION_ID"]),
    },
    methods: {
        DROP_OFF() {
            const payload = {
                transaction_id: this.CURRENT_TRANSACTION_ID,
            }
            this.$store.dispatch('DROP_OFF', payload).then((response) => {
                if (response == 'success') {
                    this.isRunning = false
                    this.hasDeliver = false
                }
            })
        },
        PICKUP_ORDERS() {
            const payload = {
                transaction_id: this.CURRENT_TRANSACTION_ID,
                user_id: this.USER_DETAILS.user_id,
            }
            this.$store.dispatch('PICKUP_ORDERS', payload).then((response) => {
                if (response != null) {
                    this.GET_IN_PROGRESS_TRANSACTION()
                }
            })
        },
        ACCEPT_TRANSACTION() {
            this.hasDeliver = true
            this.countdown = 0
            const payload = {
                transaction_id: this.CURRENT_TRANSACTION_ID,
                user_id: this.USER_DETAILS.user_id,
            }
            this.$store.dispatch('ACCEPT_TRANSACTION', payload).then(()=>{
                this.GET_IN_PROGRESS_TRANSACTION()
            })
        },
        decline() {
            this.countdown = 0
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
            this.$store.commit("ZOOM", 16)
        },

        FIND_NEAR_BY() {
            const userDetails = this.USER_DETAILS.user_role_details
            const targetItem = userDetails.find(item => item.id === 4 && item.status === 'active');
            const latitude = targetItem.delivery_details[0].latitude
            const longitude = targetItem.delivery_details[0].longitude
            const payload = {
                latitude: latitude,
                longitude: longitude,
                radius: this.CIRCLE_RADIUS,
                user_id: this.USER_DETAILS.user_id,
                declinedTransactions: this.declinedTransactions
            }
            this.$store.dispatch('FIND_ORDER_WITHIN_RADIUS', payload).then(async (response) => {
                if (response.length === 0) {
                    // if see nothing find again delay 3 seconds
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    if (this.isRunning && !this.hasDeliver) {
                        this.FIND_NEAR_BY()
                    }
                }
                else {
                    //find new order success delay 5 seconds before reflect
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    if (this.isRunning && !this.hasDeliver) {
                        this.$store.commit('TRANSACTION', response)
                        this.$store.commit('ORDER_STORE_LAT_LNG', this.TRANSACTION[0].orders)
                        this.newOrder = true
                        this.countdown = this.defaultCountdown
                        //new order popup
                        while (this.newOrder && this.countdown > 0 && !this.hasDeliver && this.isRunning) {
                            this.countdown--
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                            //countdown finish
                            if (this.isRunning && this.countdown <= 0) {
                                if (!this.hasDeliver) {
                                    this.declinedTransactions.push(this.TRANSACTION[0].transaction_id)
                                    this.$store.commit('ORDER_STORE_LAT_LNG', [])
                                    this.$store.commit('TRANSACTION', [])
                                    this.FIND_NEAR_BY()
                                }
                            }
                        }
                    }
                }
            })
        },

        GET_IN_PROGRESS_TRANSACTION() {
            const payload = {
                params: {
                    user_id: this.USER_DETAILS.user_id,
                }
            }
            this.$store.dispatch('GET_IN_PROGRESS_TRANSACTION', payload).then((response) => {
                if (response.length > 0) {
                    this.$store.commit('TRANSACTION', response)
                    this.$store.commit('CURRENT_TRANSACTION_ID', response[0].transaction_id)
                    this.$store.commit('ORDER_STORE_LAT_LNG', this.TRANSACTION[0].orders)
                    this.isRunning = true
                    this.hasDeliver = true
                }
                else{
                    this.isRunning = false
                    this.hasDeliver = false
                }
            })
        }

    },
    mounted() {
        this.registeredLocation()
        this.GET_IN_PROGRESS_TRANSACTION()
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
