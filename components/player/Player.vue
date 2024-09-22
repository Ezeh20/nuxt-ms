<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from "#imports";
import { storeToRefs } from "#imports";
const userStore = useUserStore();
const { player, token } = storeToRefs(userStore);
import { formatTime } from '~/utils/formatTime';

const currentPosition = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
let counter = null;

const play = async () => {
    if (player.value) {
        try {
            await player.value.resume();
            isPlaying.value = true;
        } catch (err) {
            //
        }
    }
};

const pause = async () => {
    if (player.value) {
        try {
            await player.value.pause();
            isPlaying.value = false;
            clearInterval(counter);
        } catch (err) {
            //
        }
    }
};

const setVolume = async (volume) => {
    if (player.value) {
        try {
            await player.value.setVolume(volume);
        } catch (err) {
            //
        }
    }
};

const callTrack = async () => {
    if (!userStore.deviceId) {
        console.error('Device ID is not available');
        return;
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${userStore.deviceId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token.value}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "context_uri": "spotify:playlist:1mTHRrUZN3qhRXPObuYSHq",
                "offset": { "position": 0 },
                "position_ms": 0
            })
        });

        if (!response.ok) {
            console.error('Failed to start playback:', response.statusText);
            return;
        }

        setTimeout(async () => {
            const state = await player.value?.getCurrentState();
            if (state) {
                duration.value = state.track_window.current_track.duration_ms;
                currentPosition.value = state.position;
                isPlaying.value = true;
                startProgressUpdate();
            } else {
                //
            }
        }, 1000);

    } catch (error) {
        console.error('Error playing track:', error);
    }
};


const updateProgress = async () => {
    const state = await player.value.getCurrentState();
    if (state) {
        currentPosition.value = state.position;
    }
};

const startProgressUpdate = () => {
    counter = setInterval(updateProgress, 1000);
};

const seek = async (event) => {
    if (player.value && duration.value) {
        const progressBar = event.target;
        const clickPosition = event.offsetX;
        const progressBarWidth = progressBar.offsetWidth;

        const newPosition = (clickPosition / progressBarWidth) * duration.value;
        try {
            await player.value.seek(newPosition);
            currentPosition.value = newPosition;
            play()
            startProgressUpdate()
        } catch (error) {
            //
        }
    }
};

onMounted(() => {
    setVolume(1);
    const checkPlayerReady = () => {
        if (player.value) {
            // Listen for playback state changes
            player.value.addListener('player_state_changed', (state) => {
                if (state) {
                    duration.value = state.track_window.current_track.duration_ms;
                    currentPosition.value = state.position;
                }
            });

            player.value.getCurrentState().then(state => {
                if (state) {
                    duration.value = state.track_window.current_track.duration_ms;
                    currentPosition.value = state.position;
                    startProgressUpdate();
                }
            });
        } else {
            // Retry after a short delay
            setTimeout(checkPlayerReady, 100);
        }
    };

    checkPlayerReady();
});


onBeforeUnmount(() => {
    clearInterval(counter);
});
</script>

<template>
    <main class="flex flex-col justify-center items-center">
        <section>
            <button v-if="isPlaying" @click="pause">Pause</button>
            <div v-if="!isPlaying">
                <button v-if="duration === 0" @click="callTrack">Play Track</button>
                <button v-else @click="play">Play</button>
            </div>
        </section>
        <div class="flex justify-center items-center gap-2 w-[100%]">
            <p class="text-xs">{{ formatTime(currentPosition) }} </p>
            <progress @click="seek" :value="currentPosition" :max="duration" class="w-[30%] h-[6px] cursor-pointer rounded-full">
            </progress>
            <p class="text-xs">{{ formatTime(duration) }}</p>
        </div>
    </main>
</template>
