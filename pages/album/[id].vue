<script setup>
const id = useRoute().params.id
import { useUserStore } from '#imports';
import { ref } from '#imports';
import { usePlayerStore } from '~/stores/playingState';
import { storeToRefs } from '#imports';
const userData = useUserStore()
const playerState = usePlayerStore()
const { player } = storeToRefs(userData)
const { duration, playingState, trackUri } = storeToRefs(playerState)
import { getSP_Token } from '#imports';
const tokenResponse = await getSP_Token();
const { data, error, pending } = await useAsyncData('playlist', () => _getAuthRequest_(`albums/${id}`, tokenResponse?.token))
import { formatTime } from '#imports';
import { useModal } from '~/composables/useModal';
import { noImage } from '~/assets/icons';
import ModalContent from '~/composables/ModalContent.vue';
import LoginPrompt from '~/components/popups/LoginPrompt.vue';
const { isOpen, toggleModal } = useModal();


const handleSetTrack = (trackUri) => {
    if (userData.user) {
        playerState.setTrack(trackUri)
    } else {
        toggleModal()
    }
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

const ade = ref(true);
watchEffect(() => {
    if (id === trackUri?.value?.split(':')[2]) {
        ade.value = true;
    } else {
        ade.value = false;
    }
})

const currentTrack = ref(null);

const handleTrackPlay = (track) => {
    if (currentTrack.value === track.uri && playingState.value) {
        pause();
    } else {
        handleSetTrack(track.uri);
        play();
        currentTrack.value = track.uri;
    }
};
</script>



<template>
    <main>
        <section v-if="data">
            <div :style="{ backgroundColor: `hsl(${Math.random() * 360}, ${50 + Math.random() * 0}%, ${30 + Math.random() * 0}%)` }"
                class="h-[350px] w-full flex items-center relative">
                <div class="flex items-center gap-4">
                    <img :src="data?.images?.[0]?.url ?? noImage" alt="" class=" w-[350px] h-[350px]">
                    <div>
                        <p class="text-xl text-white">{{ data?.name }}</p>
                        <div class="flex items-center gap-4">
                            <p class="text-sm">By {{ data?.artists[0]?.name}}</p>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute bottom-0 bg-white/10 backdrop-blur-[2px]  w-full flex gap-4 items-center  px-2 h-[80px] border border-white/0">
                    <!-- <div v-if="!ade" class="flex gap-4 items-center">
                        <button @click="handleSetTrack(data?.uri)" class="btn-circle" style="width: 50px; height: 50px">
                            <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                        </button>
                        <p class="font-bold text-white">{{ data?.tracks?.total }} {{ data?.tracks?.total > 1 ?
                            "tracks" :
                            "track" }}</p>
                    </div> -->
                    <div  class="flex gap-4 items-center">
                        <!-- <button v-if="playingState" @click="pause" class="btn-circle" style="width: 50px; height: 50px">
                            <Icon name="mdi:pause" class="text-black w-[35px] h-[35px]" />
                        </button> -->
                        <!-- <div v-else>
                            <button v-if="duration === 0" @click="handleSetTrack(data?.uri)" class="btn-circle"
                                style="width: 50px; height: 50px">
                                <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                            </button>
                            <button v-else @click="play" class="btn-circle" style="width: 50px; height: 50px">
                                <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                            </button>
                        </div> -->
                        <div>
                            <p class="font-bold text-white">{{ data?.tracks?.total }} {{ data?.tracks?.total > 1 ?
                                "tracks" :
                                "track" }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <section class="mt-[50px]">
                <table class="min-w-full table-auto border-collapse ">
                    <thead>
                        <tr class="">
                            <th class="px-4 py-2  text-left">#</th>
                            <th class="px-4 py-2  text-left">Track Name</th>
                            <th class="px-4 py-2  text-left">Duration</th>
                            <th class="px-4 py-2  text-left"></th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="(track, idx) in data?.tracks?.items" :key="track.id" 
                            :class="{
                                'bg-gray-800/50 ': (currentTrack === track.uri && playingState) || (!playingState && idx === 0),
                                'hover:bg-gray-800/50': (currentTrack !== track.uri || !playingState) && idx !== 0
                            }"
                            class="group cursor-pointer" @click="handleTrackPlay(track)">
                            <td class="p-4">
                                <span v-if="currentTrack === track.uri && playingState" class="text-green-500">
                                    <Icon name="mdi:music-note" class="w-4 h-4 text-primary-color" />
                                </span>
                                <span v-else>{{ idx + 1 }}</span>
                            </td>
                            <td class="p-4">{{ track?.name }}</td>
                            <td class="p-4">{{ formatTime(track?.duration_ms) }}</td>
                            <td class="p-4">
                                <button @click="handleTrackPlay(track)" 
                                    :class="{
                                        'opacity-0 group-hover:opacity-100': currentTrack !== track.uri || !playingState,
                                        'opacity-100': (currentTrack === track.uri && playingState) || (!playingState && idx === 0)
                                    }"
                                    class="transition-opacity">
                                    <Icon :name="currentTrack === track.uri && playingState ? 'mdi:pause' : 'mdi:play'" class="w-6 h-6" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
        <ModalContent :is-open="isOpen" @update:isOpen="toggleModal" label="Log in" subLabel="You are not logged in">
            <LoginPrompt />
        </ModalContent>
    </main>
</template>
