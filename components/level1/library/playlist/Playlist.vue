<script setup>

import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore();
const { token } = storeToRefs(userStore);

const playlist = reactive({
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


watchEffect(() => {
    const tk = token.value;
    if (tk) {
        getPlaylist(tk);
    }
});


</script>

<template>
<main>
 <p v-if="playlist.pending">Loading playlist</p>
 <p v-else>{{ playlist.data }}</p>
</main>
</template>