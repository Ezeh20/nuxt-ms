<script setup>
const id = useRoute().params.id
import { useUserStore } from '#imports';
import { ref } from '#imports';
import { usePlayerStore } from '~/stores/playingState';
import { storeToRefs } from '#imports';
const userData = useUserStore()
const playerState = usePlayerStore()
const { token, player } = storeToRefs(userData)
const { duration, playingState, trackUri } = storeToRefs(playerState)

import { getSP_Token } from '#imports';
const tokenResponse = await getSP_Token();
const { data, error, pending } = await useAsyncData('playlist', () => _getAuthRequest_(`playlists/${id}`, tokenResponse?.token))
import { formatTime } from '#imports';

import { formatDate } from '~/utils/formatTime';
import { noImage } from '~/assets/icons';

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

const ade = ref(true);
watchEffect(() => {
    if (id === trackUri?.value?.split(':')[2]) {
        ade.value = true;
    } else {
        ade.value = false;
    }
})


</script>



<template>
    <main>
        <section v-if="data">
            <div :style="{ backgroundColor: `hsl(${Math.random() * 360}, ${50 + Math.random() * 0}%, ${30 + Math.random() * 0}%)` }"
                class="h-[250px] w-full flex items-center relative">
                <div class="flex items-center gap-4">
                    <img :src="data?.images?.[0]?.url ?? noImage" alt="" class=" w-[250px] h-[250px]">
                    <div>
                        <p class="text-xl text-white">{{ data?.name }}</p>
                        <div class="flex items-center gap-4">
                            <p class="text-sm">By {{ data?.owner?.display_name }}</p>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute bottom-0 bg-white/10 backdrop-blur-[2px]  w-full flex gap-4 items-center  px-2 h-[80px] border border-white/0">
                    <div v-if="!ade" class="flex gap-4 items-center">
                        <button @click="handleSetTrack(data?.uri)" class="btn-circle" style="width: 50px; height: 50px">
                            <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                        </button>
                        <p class="font-bold text-white">{{ data?.tracks?.total }} {{ data?.tracks?.total > 1 ?
                            "tracks" :
                            "track" }}</p>
                    </div>
                    <div v-else class="flex gap-4 items-center">
                        <button v-if="playingState" @click="pause" class="btn-circle" style="width: 50px; height: 50px">
                            <Icon name="mdi:pause" class="text-black w-[35px] h-[35px]" />
                        </button>
                        <div v-else>
                            <button v-if="duration === 0" @click="handleSetTrack(data?.uri)" class="btn-circle"
                                style="width: 50px; height: 50px">
                                <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                            </button>
                            <button v-else @click="play" class="btn-circle" style="width: 50px; height: 50px">
                                <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                            </button>
                        </div>
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
                            <th class="px-4 py-2  text-left">Added Date</th>
                            <th class="px-4 py-2  text-left">Duration</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="(track, idx) in data?.tracks?.items" :key="track.id" class="hover:bg-gray-800/50">
                            <td class="px-4 py-2">{{ idx + 1 }}</td>
                            <td class="px-4 py-2">{{ track?.track?.name }}</td>
                            <td class="px-4 py-2">{{ formatDate(track?.added_at) }}</td>
                            <td class="px-4 py-2">{{ formatTime(track?.track?.duration_ms) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    </main>
</template>
