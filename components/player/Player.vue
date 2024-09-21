<script setup>
import { useUserStore } from "#imports";
import { storeToRefs } from "#imports";

const userStore = useUserStore();
const { player } = storeToRefs(userStore);

const play = () => {
    if (player.value) {
        player.value.resume().then(() => {
            console.log('Playback started');
        }).catch(err => {
            console.error('Error starting playback:', err);
        });
    }
};

const pause = () => {
    if (player.value) {
        player.value.pause().then(() => {
            console.log('Playback paused');
        }).catch(err => {
            console.error('Error pausing playback:', err);
        });
    }
};
</script>



<template>
    <div>
        <button @click="play">Play</button>
        <button @click="pause">Pause</button>
    </div>
</template>
