<script setup>

import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';
import { useUserStore } from '~/stores/userStore';
import { usePlayerStore } from '#imports';
const userStore = useUserStore();
const playerStore = usePlayerStore();
const { token, user } = storeToRefs(userStore);
const { trackUri } = toRefs(playerStore);
import { reactive, ref } from 'vue';
import { noImage } from '~/assets/icons';


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

const create_Playlist = reactive({
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
}


watchEffect(async () => {
    if (token.value) {
        await getPlaylist(token.value);
        await getAlbums(token.value);
        await getArtists(token.value);
    }
});

const options = ['playlists', 'albums', 'artists']
const isOpen = ref(false)

const playlistName = ref('')
const description = ref('')

const createPlaylist = async () => {
    if (!token.value) {
        return;
    }
    create_Playlist.pending = true;
    create_Playlist.error = null;
    try {
        const response = await $fetch(`${useRuntimeConfig().public.SP_BASE_URL}users/${user?.value?.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token?.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName.value,
                description: description.value,
                public: false
            })
        });

        if (response) {
            await getPlaylist(token.value);
            isOpen.value = false;
            playlistName.value = '';
            description.value = '';
        }
    } catch (error) {
        create_Playlist.error = error;
    } finally {
        create_Playlist.pending = false;
    }
}

watch(playlist, (newValue) => {
  console.log('Playlist updated:', newValue);
}, { deep: true });

const isPlayer = ref(trackUri)
</script>

<template>
    <main>
        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" class="p-[10px]">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Create a playlist
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 "
                            @click="isOpen = false" />
                    </div>
                </template>

                <Placeholder class="h-32" />
                <form @submit.prevent="createPlaylist" class="space-y-4 flex flex-col gap-2">
                    <UFormGroup label="Playlist Name" name="playlistName" class="flex flex-col gap-2">
                        <input v-model="playlistName" placeholder="Enter playlist name"
                            class="w-full px-3 py-4 text-sm text-text-color border focus:outline-none  border-text-color/50  rounded focus:border-text-color/100 " />
                    </UFormGroup>
                    <UFormGroup label="Description" name="description" class="flex flex-col gap-2">
                        <textarea v-model="description" placeholder="Enter playlist description"
                            class="  w-full px-3 py-2 text-sm text-text-color border border-text-color/50 focus:outline-none rounded focus:border-text-color/100  resize-none h-24"></textarea>
                    </UFormGroup>

                    <button type="submit" :disabled="create_Playlist.pending || !playlistName || !description" :class="[
                        'w-full text-base py-2 px-4 rounded-md transition duration-300 ease-in-out',
                        (create_Playlist.pending || !playlistName || !description)
                            ? 'bg-primary-color/30 text-white/50 cursor-not-allowed'
                            : 'bg-primary-color/50 text-white/80 hover:bg-primary-color'
                    ]">
                        {{ create_Playlist.pending ? "Please wait..." : "Create a new Playlist" }}
                    </button>
                </form>
            </UCard>
        </UModal>
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
            <section :class="`overflow-y-scroll ${isPlayer ? 'h-[72vh]' : 'h-[80vh]'}`">
                <section v-if="activeTab === 0" class="flex flex-col gap-5 overflow-y-scroll">
                    <button class=" flex items-center gap-4 text-primary-color" @click="isOpen = true">Create new
                        <Icon name="mdi:plus" class=" text-primary-color" />
                    </button>
                    <div v-if="playlist?.data?.items?.length > 0" v-for="playlist in playlist.data.items"
                        :key="playlist?.id">
                        <NuxtLink :to="`/playlist/${playlist?.id}`"
                            class="flex flex-col gap-2 text-text-color/90 text-xs cursor-pointer  h-full">
                            <img :src="playlist?.images?.[0]?.url ?? noImage" alt="playlist image"
                                class="h-[150px] w-full object-cover object-top opacity-70 hover:opacity-100 transition-all duration-300 rounded-t-lg" />
                            <div class="flex flex-col gap-1 justify-between ">
                                <p>{{ playlist?.name }}</p>
                                <p>{{ playlist?.tracks?.total }} {{ playlist?.tracks?.total > 1 ? 'tracks' :
                                    'track' }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                    <div v-else>
                        <p>you have no playlists</p>
                    </div>
                </section>

                <section v-if="activeTab === 1" class="flex flex-col gap-5">
                    <div v-if="albums?.data?.items?.length > 0" v-for="album in albums.data.items" :key="album?.id">
                        <NuxtLink class="flex flex-col gap-2 text-text-color/90 text-xs cursor-pointer  h-full">
                            <img :src="album?.album?.images?.[0]?.url ?? noImage" alt="album image"
                                class="h-[150px] w-full object-cover object-top opacity-70 hover:opacity-100 transition-all duration-300 rounded-t-lg" />
                            <div class="flex flex-col gap-1 justify-between ">
                                <p>{{ album?.album?.artists?.[0]?.name }}</p>
                                <p>{{ album?.album?.total_tracks }} {{ album?.album?.total_tracks > 1 ? 'tracks' :
                                    'track' }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                    <div v-else>
                        <p>you have no albums</p>
                    </div>
                </section>

                <section v-if="activeTab === 2" class="flex flex-col gap-5">
                    <div v-if="artists?.data?.artists?.items?.length > 0" v-for="artist in artists.data.artists.items"
                        :key="artist?.id">
                        <NuxtLink class="grid  gap-4 text-text-color/90 text-base cursor-pointer h-full">
                            <img :src="artist?.images?.[0]?.url" alt="artist image"
                                class="h-[100%] w-[100%] opacity-70 hover:opacity-100 transition-all duration-300 rounded-full " />
                            <div class="flex flex-col gap-1 justify-between text-center">
                                <p>{{ artist?.name }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                    <div v-else>
                        <p>empty</p>
                    </div>
                </section>
            </section>
        </section>
    </main>
</template>