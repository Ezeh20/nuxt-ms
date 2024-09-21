<script setup>
import Heading from '~/components/atomic/Heading.vue';
import { useGeneralStore } from '@/stores/generalStore';
import { storeToRefs } from "pinia";
import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';

const generalStore = useGeneralStore();
const { shows } = storeToRefs(generalStore);

if (!shows.value.length) {
    generalStore.fetchShows();
}

const cards = [1, 2, 3, 4];
</script>


<template>
    <main>
        <section v-if="shows.data.length === 0" class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            <PrimarySkeleton v-for="card in cards" :key="card" class="h-[200px] w-full rounded-md" />
        </section>
        <section v-else class="flex flex-col gap-6">
            <Heading tag="h1" size="lg" text="Shows" />
            <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            <Card v-for="show in shows.data" :key="show.id" :image="show.images[0].url"
                    :title="show.name" :description="show.publisher" alt="true" />
            </div>
        </section>
    </main>
</template>