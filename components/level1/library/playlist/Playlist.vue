<script setup>

import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';
import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore();
const { token } = storeToRefs(userStore);
import { reactive, ref } from 'vue';

const activeTab = ref(0);
const playlist = reactive({
    data: null,
    pending: false,
    error: null
})

const albums = reactive({
    data: null,
    pending: false,
    error: null
})

const artists = reactive({
    data: null,
    pending: false,
    error: null
})


const getPlaylist = async (token) => {
    const { data, pending, error } = await useAsyncData('playlist', () => _getAuthRequest_('me/playlists', token))
    playlist.data = data.value;
    playlist.pending = pending.value;
    playlist.error = error.value;
}

const getAlbums = async (token) => {
    const { data, pending, error } = await useAsyncData('albums', () => _getAuthRequest_('me/albums', token))
    albums.data = data.value;
    albums.pending = pending.value;
    albums.error = error.value;
}

const getArtists = async (token) => {
    const { data, pending, error } = await useAsyncData('artists', () => _getAuthRequest_('me/following?type=artist', token))
    artists.data = data.value;
    artists.pending = pending.value;
    artists.error = error.value;
    console.log(data.value, 'rop');
}


watchEffect(async () => {
    if (token.value) {
        await getPlaylist(token.value);
        await getAlbums(token.value);
        await getArtists(token.value);
    }
});

const options = ['playlists', 'albums', 'artists']
</script>

<template>
    <main>
        <section v-if="playlist.pending" class="flex h-[100vh] flex-col gap-4 justify-between">
            <div v-for="option in options" :key="option" class="w-full h-[100vh]">
                <PrimarySkeleton class="w-full h-[100%]" />
            </div>
        </section>
        <section v-else>
            <section class="flex gap-2 mb-4">
                <div v-for="(option, idx) in options" :key="option">
                    <button
                        :class="` text-sm py-2 px-4 rounded-lg ${activeTab === idx ? 'bg-white/90 text-black' : 'bg-[#1e1e1e] text-text-color/90'}`"
                        @click="activeTab = idx">{{ option
                        }}</button>
                </div>
            </section>
            <section v-if="activeTab === 0" class="flex flex-col gap-5 overflow-y-scroll h-[85vh] pb-6">
                <div v-if="playlist?.data?.items?.length > 0" v-for="playlist in playlist.data.items"
                    :key="playlist?.id">
                    <div class="flex flex-col gap-2 text-text-color/90 text-xs cursor-pointer  h-full">
                        <img :src="playlist?.images?.[0]?.url" alt="playlist image"
                            class="h-[150px] w-full object-cover object-top opacity-70 hover:opacity-100 transition-all duration-300 rounded-t-lg" />
                        <div class="flex flex-col gap-1 justify-between ">
                            <p>{{ playlist?.name }}</p>
                            <p>{{ playlist?.tracks?.total }} {{ playlist?.tracks?.total > 1 ? 'tracks' :
                                'track' }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>you have no playlists</p>
                </div>
            </section>

            <section v-if="activeTab === 1" class="flex flex-col gap-5 overflow-y-scroll h-[85vh] pb-6">
                <div v-if="albums?.data?.items?.length > 0" v-for="album in albums.data.items" :key="album?.id">
                    <div class="flex flex-col gap-2 text-text-color/90 text-xs cursor-pointer  h-full">
                        <img :src="album?.album?.images?.[0]?.url" alt="album image"
                            class="h-[150px] w-full object-cover object-top opacity-70 hover:opacity-100 transition-all duration-300 rounded-t-lg" />
                        <div class="flex flex-col gap-1 justify-between ">
                            <p>{{ album?.album?.artists?.[0]?.name }}</p>
                            <p>{{ album?.album?.total_tracks }} {{ album?.album?.total_tracks > 1 ? 'tracks' :
                                'track' }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>you have no albums</p>
                </div>
            </section>

            <section v-if="activeTab === 2" class="flex flex-col gap-5 overflow-y-scroll h-[85vh] pb-6">
                <div v-if="artists?.data?.artists?.items?.length > 0" v-for="artist in artists.data.artists.items" :key="artist?.id">
                    <div class="grid  gap-4 text-text-color/90 text-base cursor-pointer h-full">
                        <img :src="artist?.images?.[0]?.url" alt="artist image"
                            class="h-[100%] w-[100%] opacity-70 hover:opacity-100 transition-all duration-300 rounded-full " />
                        <div class="flex flex-col gap-1 justify-between text-center">
                            <p>{{ artist?.name }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>empty</p>
                </div>
            </section>
        </section>
    </main>
</template>