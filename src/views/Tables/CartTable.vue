<template>
    <v-container>
        <v-card class="mt-4 mb-4">
            <v-data-table :headers="headers" :items="CART">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>₱{{ item.price }}</td>
                        <td>{{ item.stock }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn v-if="item.stock > 0" @click="increaseItem(item)">
                                        <v-icon >mdi-plus</v-icon>
                                    </v-btn>
                                    <v-btn v-else>
                                        <v-icon >mdi-alert-circle-outline</v-icon>
                                    </v-btn>
                                    <v-btn @click="decreaseItem(item)">
                                        <v-icon >mdi-minus</v-icon>
                                    </v-btn>
                                    <v-btn @click="removeItem(item)">
                                        <v-icon>mdi-cart-off</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-row>
                <v-col cols="12">
                    <v-btn class="float-right mr-2">
                        <v-icon>
                            mdi-cart-outline
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            headers: [
                { text: "Name", value: "name", align: "center", sortable: false },
                { text: "Price (₱)", value: "price", align: "center", sortable: false },
                { text: "Stock", value: "stock", align: "center", sortable: false },
                { text: "Quantity", value: "quantity", align: "center", sortable: false },
                { text: "Actions", align: "center", value: "actions", sortable: false },
            ],
            data: []
        }
    },
    computed: {
        ...mapGetters(["CART","SELECTED_STORE"]),
    },
    methods: {
        async increaseItem(item) {
            if(item.stock > 0){
            item.stock -= 1
            item.quantity += 1
            const payload = {
                product_id: item.id
            }
                await this.$store.dispatch('INCREASE_CART_PRODUCT',payload).then(()=>{
                    const selectedStore = this.SELECTED_STORE
                    this.$store.commit('SELECTED_STORE',null)
                    this.$store.commit('SELECTED_STORE',selectedStore)
                })
            }
        },
        async decreaseItem(item) {
            item.stock += 1
            item.quantity -= 1
            if(item.quantity <= 0){
                const newCart = this.CART.filter((item2) => item2 !== item);
                this.$store.commit('CART',newCart)
            }
            // this.$store.dispatch('GET_CART')
            const payload = {
                product_id: item.id
            }
            await this.$store.dispatch('DECREASE_CART_PRODUCT',payload).then(()=>{
                const selectedStore = this.SELECTED_STORE
                this.$store.commit('SELECTED_STORE',null)
                this.$store.commit('SELECTED_STORE',selectedStore)
            })
        },
        async removeItem(item) {
            const payload = {
                product_id: item.id
            }
            await this.$store.dispatch('REMOVE_CART_PRODUCT',payload).then(()=>{
                this.$store.dispatch('GET_CART').then(()=>{
                    const selectedStore = this.SELECTED_STORE
                    this.$store.commit('SELECTED_STORE',null)
                    this.$store.commit('SELECTED_STORE',selectedStore)
                })
            })
        },
    },
    mounted() {
        this.$store.dispatch('GET_CART')
    },
}

</script>