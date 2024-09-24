<script setup>
import { useDebounceFn } from '@vueuse/core';
import { useUserStore } from '#imports';
import { storeToRefs } from 'pinia';

import { useQueryStore } from '~/stores/queryStore';
const q = useQueryStore()
const { query } = storeToRefs(q)
const userData = useUserStore()
const { player } = storeToRefs(userData);
import { _getAuthRequest_ } from '#imports';
import Heading from '~/components/atomic/Heading.vue';
import Card from '~/components/card/Card.vue';
import truncateText from '~/utils/truncate';
import { usePlayerStore } from '#imports';
const playerState = usePlayerStore()
const { duration, playingState, trackUri } = storeToRefs(playerState)
const searchType = ref(null)
const searchTypes = ['artist', 'playlist', 'track']
const options = ['all', 'artist', 'playlist', 'track']
const activeTab = ref('all');
const data = ref({});
const loading = ref(false)
import Popover from '~/components/atomic/Popover.vue';
import { getSP_Token } from '#imports';

const debouncedSearch = useDebounceFn(async () => {
    loading.value = true;
    const tokenResponse = await getSP_Token();
    useAsyncData("searchResults", () => _getAuthRequest_(`search?q=${query.value}&type=${searchType.value === null ? searchTypes.join(',') : searchType.value}`, tokenResponse?.token))
        .then(result => {
            data.value = result.data;
            loading.value = false;
        }).finally(() => {
            loading.value = false;
        });
}, 500);

watch(query, () => {
    if (query.value) {
        debouncedSearch();
    } else {
        data.value = null;
    }
});

watch(searchType, () => {
    if (query.value) {
        debouncedSearch();
    }
});


watch(data, (newData) => {
    console.log(newData, 'result');
}, { deep: true });

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

const handFilter = (type) => {
    if (type === "all") {
        activeTab.value = "all";
        searchType.value = null;
    } else {
        searchType.value = type;
        activeTab.value = type;
    }
}


</script>

<template>
    <main class="relative pb-10">
        <section class="px-4  flex flex-col gap-10">
            <!-- <div v-if="loading" class="w-full h-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse"></div> -->
            <section v-if="Object.keys(data).length > 0" class=" bg-background-color flex gap-2 mb-2 mt-6">
                <div v-for="option in options" :key="option">
                    <button
                        :class="` text-sm py-2 px-4 rounded-lg ${activeTab === option ? 'bg-white/90 text-black' : 'bg-[#1e1e1e] text-text-color/90'}`"
                        @click="handFilter(option)">{{ option
                        }}</button>
                </div>
            </section>
            <section v-if="data?.value?.tracks?.items">
                <Heading tag="h2" size="lg" text="Tracks" />
                <div class="g-lay" style="gap: 28px;">
                    <div v-for="(track, idx) in data?.value?.tracks?.items" :key="idx"
                        class="bg-red-400 flex flex-col justify-between p-2 rounded-md h-[120px]"
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
                                        <button v-if="duration === 0" @click="handleSetTrack(track?.uri)"
                                            class="btn-circle" style="width: 50px; height: 50px">
                                            <Icon name="mdi:play" class="text-black w-[35px] h-[35px]" />
                                        </button>
                                        <button v-else @click="play" class="btn-circle"
                                            style="width: 50px; height: 50px">
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
            <section v-if="data?.value?.artists?.items">
                <Heading tag="h2" size="lg" text="Artists" />
                <div class="g-lay" style="gap: 28px;">
                    <div v-for="artist in data?.value?.artists?.items">
                        <NuxtLink
                            class="flex flex-col items-center gap-4 text-text-color/90 text-base cursor-pointer h-full">
                            <img :src="artist?.images?.[0]?.url" alt="artist image"
                                class="h-[150px] w-[150px] opacity-70 hover:opacity-100 object-cover object-top transition-all duration-300 rounded-full " />
                            <div class="flex flex-col gap-1 justify-between text-center">
                                <p class="text-sm">{{ artist?.name }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </section>
            <section v-if="data?.value?.playlists?.items">
                <Heading tag="h2" size="lg" text="Playlist" />
                <div class="g-lay" style="gap: 28px;">
                    <div v-for="playlist in data?.value?.playlists?.items">
                        <NuxtLink :to="`/playlist/${playlist?.id}`">
                            <Card :image="playlist?.images[0]?.url" alt="true" :title="playlist?.name" />
                        </NuxtLink>
                    </div>
                </div>
            </section>

        </section>
    </main>
</template>
