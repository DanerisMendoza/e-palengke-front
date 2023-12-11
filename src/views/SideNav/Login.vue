<template>
    <v-app>
        <Login />
    </v-app>
</template>

<script>
import Login from '../components/Login.vue';
import '@capacitor/toast';
import '@capacitor/geolocation';
export default {
    components: { Login },
    async mounted() {
        const a = await Capacitor.Plugins.Geolocation.getCurrentPosition();
        Capacitor.Plugins.Toast.show({
            text: 'Location'+a.coords.latitude,
        });
    }
}
</script>