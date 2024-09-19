<script setup>
import { useGeneralStore } from "@/stores/generalStore";
import Card from "@/components/card/Card.vue";
import Heading from "~/components/atomic/Heading.vue";
import { storeToRefs } from "pinia";
const generalStore = useGeneralStore();
const { episodes } = storeToRefs(generalStore);

if (!episodes.value.data.length) {
    generalStore.fetchEpisodes();
}
</script>




<template>
    <main class="flex flex-col gap-6">
        <Heading tag="h1" size="lg" text="Episodes" />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card v-for="episode in episodes.data" :key="episode.id" :image="episode.images[0].url"
                :title="episode.name" :description="episode.description" :hideInfo="true" />
        </div>
    </main>
</template>