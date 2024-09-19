<script setup>
import { useGeneralStore } from '@/stores/generalStore';
import { storeToRefs } from "pinia";
import Card from '~/components/card/Card.vue';
import Heading from '~/components/atomic/Heading.vue';
const generalStore = useGeneralStore();
const { albums } = storeToRefs(generalStore);

if (!albums.value.length) {
    generalStore.fetchAlbums();
}

</script>



<template>
    <main class="flex flex-col gap-6">
        <Heading tag="h1" size="lg" text="Albums" />
        <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            <Card v-for="album in albums.data" :key="album.id" :image="album.images[0].url"
                :title="album.name" :description="album.label" alt="true"/>
        </div>
    </main>
</template>