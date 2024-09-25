<script setup>
import { storeToRefs } from "#imports";
import { formatTime } from '~/utils/formatTime';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from "#imports";
import { usePlayerStore } from '~/stores/playingState';
import { noImage } from "~/assets/icons";
const userStore = useUserStore();
const playerStore = usePlayerStore();
const { player, token } = storeToRefs(userStore);
const { trackUri, playingState } = storeToRefs(playerStore);
import truncateText from "~/utils/truncate";



const currentPosition = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
const hasNext = ref(false);
const hasPrevious = ref(false);
const currentTrack = ref(null);
let counter = null;

const play = async () => {
    if (player.value) {
        try {
            await player.value.resume();
        } catch (err) {
            //
        }
    }
};

const pause = async () => {
    if (player.value) {
        try {
            await player.value.pause();
            clearInterval(counter);
        } catch (err) {
            //
        }
    }
};

const nextTrack = async () => {
    if (player.value) {
        try {
            await player.value.nextTrack();
            startProgressUpdate();
        } catch (err) {
            console.error('Error skipping to next track:', err);
        }
    }
};

const previousTrack = async () => {
    if (player.value) {
        try {
            await player.value.previousTrack();
            startProgressUpdate();
        } catch (err) {
            console.error('Error skipping to previous track:', err);
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

const callTracks = async () => {
    if (!userStore.deviceId) {
        console.error('Device ID is not available');
        return;
    }

    try {
        const playOptions = {
            "offset": { "position": 0 },
            "position_ms": 0
        };
        if (trackUri.value.startsWith('spotify:track:')) {
            playOptions.uris = [trackUri.value];
        } else {
            playOptions.context_uri = trackUri.value;
        }

        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${userStore.deviceId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token.value}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(playOptions)
        });

        if (!response.ok) {
            console.error('Failed to start playback:', response.statusText);
            return;
        }

        // Wait for a second before fetching the playback state to ensure it has started
        setTimeout(async () => {
            const state = await player.value?.getCurrentState();
            if (state) {
                duration.value = state.track_window.current_track.duration_ms;
                currentPosition.value = state.position;
                isPlaying.value = true;
                startProgressUpdate();  // Start progress bar update
            } else {
                console.warn('No state available from the player');
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
            player.value.addListener('player_state_changed', (state) => {
                if (state) {
                    duration.value = state.track_window.current_track.duration_ms;
                    currentPosition.value = state.position;
                    updateTrackInfo(state);
                    playerStore.setDuration(state.duration)
                    playerStore.setPlayingState(!state.paused)
                    hasNext.value = state.track_window.next_tracks.length > 0;
                    hasPrevious.value = state.track_window.previous_tracks.length > 0;
                }
            });

            player.value.getCurrentState().then(state => {
                if (state) {
                    duration.value = state.track_window.current_track.duration_ms;
                    currentPosition.value = state.position;
                    updateTrackInfo(state);
                    playerStore.setDuration(state.duration)
                    playerStore.setPlayingState(!state.paused)
                    hasNext.value = state.track_window.next_tracks.length > 0;
                    hasPrevious.value = state.track_window.previous_tracks.length > 0;
                    startProgressUpdate();
                }
            });
        } else {
            setTimeout(checkPlayerReady, 100);
        }
    };

    checkPlayerReady();
});

const updateTrackInfo = (state) => {
    if (state && state.track_window.current_track) {
        currentTrack.value = state.track_window.current_track;
    }
};


onBeforeUnmount(() => {
    clearInterval(counter);
});

watchEffect(async () => {
    if (trackUri.value) {
        await callTracks();
    }
})
</script>

<template>
    <main class="flex w-full  justify-between items-center  gap-2 px-2">
        <div class="hidden w-[0%] xl:w-[20%] xl:flex  items-center gap-[8px]">
            <img v-if="currentTrack?.album?.images[0]?.url" :src="currentTrack?.album?.images[0]?.url ?? noImage"
                alt="img" class="  w-[50px] h-[50px] rounded-[100%]">
            <div class="hidden sm:flex flex-col">
                <p class="text-sm font-semibold">{{ truncateText(currentTrack?.name, 20) }}</p>
                <p class="text-xs font-light">{{ truncateText(currentTrack?.artists[0]?.name, 20) }}</p>
            </div>
        </div>
        <div class="flex flex-col gap-2 justify-center items-center w-[100%] xl:w-[50%]">
            <section class="flex items-center  gap-5">
                <button :disabled="!hasPrevious" @click="previousTrack"
                    :class="['btn-circle-alt', { 'opacity-50 cursor-not-allowed': !hasPrevious }]">
                    <Icon name="mdi:skip-previous" class="text-white w-[25px] h-[25px]" />
                </button>
                <section>
                    <button v-if="playingState" @click="pause" class="btn-circle ">
                        <Icon name="mdi:pause" class="text-black w-[25px] h-[25px]" />
                    </button>
                    <div v-if="!playingState">
                        <button v-if="duration === 0" @click="callTracks" class="btn-circle">
                            <Icon name="mdi:play" class="text-black w-[25px] h-[25px]" />
                        </button>
                        <button v-else @click="play" class="btn-circle ">
                            <Icon name="mdi:play" class="text-black w-[25px] h-[25px]" />
                        </button>
                    </div>
                </section>
                <button :disabled="!hasNext" @click="nextTrack"
                    :class="['btn-circle-alt', { 'opacity-50 cursor-not-allowed': !hasNext }]">
                    <Icon name="mdi:skip-next" class="text-white w-[25px] h-[25px]" />
                </button>
            </section>
            <div class="flex items-center gap-2 w-[70%]">
                <p class="text-xs">{{ formatTime(currentPosition) }} </p>
                <progress @click="seek" :value="currentPosition" :max="duration"
                    class="w-[100%] h-[6px] cursor-pointer rounded-full">
                </progress>
                <p class="text-xs">{{ formatTime(duration) }}</p>
            </div>
        </div>
        <div class="w-[0%] xl:w-[20%]">
            <p></p>
        </div>
    </main>
</template>
