<script setup>
const id = useRoute().params.id
import { useUserStore } from '#imports';
import { storeToRefs } from '#imports';
const userData = useUserStore()
const { token } = storeToRefs(userData)





const {data, error, pending } = await useAsyncData('playlist', () => _getAuthRequest_(`playlists/${id}`, token.value))

console.log( data.value);
</script>



<template>
    <p>{{ id }}</p>
</template>
