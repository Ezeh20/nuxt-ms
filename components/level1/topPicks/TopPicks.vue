<script setup>
import { storeToRefs } from '#imports';
import { useUserStore } from '#imports';
const userData = useUserStore()
const playerState = usePlayerStore()
const { loadingTracks, topTracks, player } = storeToRefs(userData)
const { duration, playingState, trackUri } = storeToRefs(playerState)
import Popover from '~/components/atomic/Popover.vue';
import Heading from '~/components/atomic/Heading.vue';
import truncateText from '~/utils/truncate';
import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';
const blocks = [1, 2, 3, 4, 5]

if (!topTracks?.value?.length) {
    userData.setTopTracks()
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
        <section v-if="loadingTracks && !topTracks" class="g-lay mb-6">
            <PrimarySkeleton v-for="block in blocks" :key="block" class="h-[120px] w-full" />
        </section>
        <section v-else>
            <Heading tag="h2" size="md" text="Your Top Tracks" />
            <div class="g-lay">
                <div v-for="(track, idx) in topTracks?.items" :key="idx"
                    class="bg-red-400 flex flex-col justify-between p-2 rounded-md h-[120px]"
                    :style="{ backgroundColor: `hsl(${Math.random() * 360}, ${70 + Math.random() * 10}%, ${25 + Math.random() * 10}%)` }">
                    <div class="flex relative justify-between items-center">
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
                                    style="width: 40px; height:40px">
                                    <Icon name="mdi:pause" class="text-black w-[35px] h-[35px]" />
                                </button>
                                <div v-else>
                                    <button v-if="duration === 0" @click="handleSetTrack(track?.uri)" class="btn-circle"
                                        style="width:40px; height:40px">
                                        <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                                    </button>
                                    <button v-else @click="play" class="btn-circle" style="width:40px; height:40px">
                                        <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Popover :uri="track?.uri" v-if="!isCurrentTrack(track?.uri)" />
                    <p class="text-sm text-white">{{ truncateText(track?.name, 20) }}</p>
                </div>
            </div>
        </section>
    </main>
</template>