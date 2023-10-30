<template>
    <v-container>
        <v-row justify="center">
            <v-btn @click="startStop" :color="isRunning ? 'red' : 'green'">
                {{ isRunning ? 'Stop' : 'Start' }}
            </v-btn>
        </v-row>

        <!-- Display elapsed time -->
        <v-row v-if="isRunning" justify="center">
            <v-display-3>{{ formattedElapsedTime }}</v-display-3>
        </v-row>
    </v-container>
</template>

  
  
<script>
export default {
    data() {
        return {
            isRunning: false,
            startTime: null,
            laps: [],
            progress: 0,
            timer: null,
        };
    },
    computed: {
        formattedElapsedTime() {
            return this.formatTime(this.laps[this.laps.length - 1] || 0);
        },
    },
    methods: {
        startStop() {
            if (this.isRunning) {
                // Stop the timer
                clearInterval(this.timer);
                this.timer = null;
            } else {
                // Start the timer
                this.startTime = new Date().getTime();
                this.timer = setInterval(this.updateTime, 100);
            }
            this.isRunning = !this.isRunning;
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
};
</script>
  
<style scoped>
/* Add your custom styles here */
</style>
  