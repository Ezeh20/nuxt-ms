<script setup>
import { useGeneralStore } from "@/stores/generalStore";
import Card from "@/components/card/Card.vue";
import Heading from "~/components/atomic/Heading.vue";
import { storeToRefs } from "pinia";
const generalStore = useGeneralStore();
const { episodes } = storeToRefs(generalStore);
import PrimarySkeleton from "../../atomic/Skeletons/PrimarySkeleton.vue";

if (!episodes.value.data.length) {
    generalStore.fetchEpisodes();
}

const cards = [1, 2, 3, 4, 5, 6];
</script>




<template>
    <section v-if="episodes.data.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <PrimarySkeleton v-for="card in cards" :key="card" class="h-[300px] w-full rounded-md" />
    </section>
    <main v-else class="flex flex-col">
        <Heading tag="h2" size="md" text="Episodes" />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card v-for="episode in episodes.data" :key="episode.id" :image="episode.images[0].url"
                :title="episode.name" :description="episode.description" :hideInfo="true" />
        </div>
    </main>
</template>