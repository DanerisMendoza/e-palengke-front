<template>
    <v-dialog v-model="dialog" persistent>

        <v-card>
            <v-card-title>
                <v-btn text icon @click="closeDialog" class="ml-auto">
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
            </v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field outlined readonly class="float-left ml-5">
                            <template v-slot:prepend-inner>
                                Date: {{ currentDateTime }}
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-card-text>
                    <CartTable />
                    <v-row>
                        <v-col cols="12">
                            <v-text-field outlined readonly class="float-right mr-4">
                                <template v-slot:append>
                                    Balance: ₱{{ USER_DETAILS.balance }}
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field outlined readonly class="float-right mr-4">
                                <template v-slot:append>
                                    Total: ₱{{ total.toFixed(2) }}
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-btn class="float-right mr-4" @click="order">
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-container>
        </v-card>
    </v-dialog>
</template>





<script>
import CartTable from '../Tables/CartTable.vue';
import { mapGetters } from 'vuex';
export default {
    components: {
        CartTable
    },
    data() {
        return {
            dialog: true,
            currentDateTime: new Date().toLocaleString(),
        }
    },
    computed: {
        ...mapGetters(["SELECTED_STORE", "CART", "USER_DETAILS"]),
        total() {
            return this.CART.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    },
    methods: {
        closeDialog() {
            this.$store.commit('CART_DIALOG', false)
            const selectedStore = this.SELECTED_STORE
            this.$store.commit('SELECTED_STORE', null)
            this.$store.commit('SELECTED_STORE', selectedStore)
        },
        order() {
            if (this.USER_DETAILS.balance < this.total) {
                this.$swal.fire({
                    icon: 'warning', // Set a warning icon (you can choose a different icon class)
                    title: 'Insufficient Balance', // Updated title
                    text: 'Balance is less than Order Total Amount!', // Updated text message
                    showConfirmButton: false, // Remove the "OK" button
                    timer: 2000 // Auto-close the alert after 1.5 seconds (adjust as needed)
                });
                return
            }
            this.CART.forEach(item => {
                if (item.stock < 0) {
                    this.$swal.fire({
                        icon: 'warning', // Set a warning icon (you can choose a different icon class)
                        title: 'Invalid Item', // Updated title
                        html: 'Stock is Less than Quantity <br> Please Check your Cart!', // Updated text message
                        showConfirmButton: false, // Remove the "OK" button
                        timer: 2000 // Auto-close the alert after 1.5 seconds (adjust as needed)
                    });
                    return
                }
            });
            const payload = {
                cart: this.CART,
                status: 'pending',
                total: this.total,
            }
            this.$store.dispatch('ORDER', payload).then((response) => {
                if (response == 'invalid') {
                    this.$swal.fire({
                        icon: 'warning',
                        title: 'Invalid Item',
                        html: 'Stock is Less than Quantity <br> Please Check your Cart!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                //server side validation of balance and total amount of order
                else if (response == 'insufficient balance') {
                    this.$swal.fire({
                        icon: 'warning',
                        title: 'Invalid Item',
                        html: 'Stock is Less than Quantity <br> Please Check your Cart!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else if (response == 'success') {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Order Success',
                        text: 'Thank you for Ordering!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                this.$store.dispatch('GET_CART')
                this.$store.dispatch("GetUserDetails")
            })
        }
    },
}

</script>
