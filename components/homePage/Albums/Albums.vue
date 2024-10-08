<script setup>
import { useGeneralStore } from '@/stores/generalStore';
import { storeToRefs } from "pinia";
import Card from '~/components/card/Card.vue';
import Heading from '~/components/atomic/Heading.vue';
import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';
const generalStore = useGeneralStore();
const { albums } = storeToRefs(generalStore);


if (!albums?.value?.length) {
    generalStore.fetchAlbums();
}

const cards = [1, 2, 3, 4, 5];

</script>



<template>
    <section v-if="albums.data.length === 0" class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        <PrimarySkeleton v-for="card in cards" :key="card" class="h-[200px] w-full rounded-md" />
    </section>
    <section v-else class="flex flex-col">
        <Heading tag="h2" size="md" text="Albums" />
        <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            <NuxtLink :to="`/album/${album?.id}`" v-for="album in albums.data" :key="album.id">
                <Card :image="album.images[0].url" :title="album.name" :description="album.label" alt="true" />
            </NuxtLink>
        </div>
    </section>
</template>
