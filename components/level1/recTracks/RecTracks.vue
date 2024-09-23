<script setup>

import { storeToRefs } from '#imports';
import { useUserStore } from '#imports';
const userData = useUserStore()
const { recTracks, player } = storeToRefs(userData)
import truncateText from '~/utils/truncate';
import Heading from '~/components/atomic/Heading.vue';
import { usePlayerStore } from '#imports';
const playerState = usePlayerStore()
const { duration, playingState, trackUri } = storeToRefs(playerState)

if (!recTracks?.value?.length) {
    userData.setRecTracks()
}

const handleSetTrack = (trackUri) => {
    playerState.setTrack(trackUri)
}

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
        } catch (err) {
            //
        }
    }
};

const currentTrackUri = ref(null);
const isCurrentTrack = (uri) => {
    return currentTrackUri.value === uri;
};


watchEffect(() => {
    currentTrackUri.value = trackUri.value;
});
</script>

<template>
    <main>
        <section>
            <Heading tag="h2" size="md" text="Recommended for you" />
            <div class="g-lay">
                <div v-for="(track, idx) in recTracks" :key="idx"
                    class="bg-red-400 flex flex-col justify-between p-2 rounded-md h-[100px]"
                    :style="{ backgroundColor: `hsl(${Math.random() * 360}, ${70 + Math.random() * 10}%, ${25 + Math.random() * 10}%)` }">
                    <div class="flex justify-between items-center">
                        <p class="text-white font-extrabold text-xl">{{ idx + 1 }}</p>
                        <div>
                            <div v-if="!isCurrentTrack(track?.uri)">
                                <button @click="handleSetTrack(track?.uri)" class="btn-circle"
                                    style="width: 25px; height: 25px">
                                    <Icon name="mdi:play" class="text-black w-[20px] h-[20px]" />
                                </button>
                            </div>
                            <div v-else>
                                <button v-if="playingState" @click="pause" class="btn-circle"
                                    style="width: 50px; height: 50px">
                                    <Icon name="mdi:pause" class="text-black w-[35px] h-[35px]" />
                                </button>
                                <div v-else>
                                    <button v-if="duration === 0" @click="handleSetTrack(track?.uri)" class="btn-circle"
                                        style="width: 50px; height: 50px">
                                        <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                                    </button>
                                    <button v-else @click="play" class="btn-circle" style="width: 50px; height: 50px">
                                        <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-white">{{ truncateText(track?.name, 20) }}</p>
                </div>
            </div>
        </section>
    </main>
</template>