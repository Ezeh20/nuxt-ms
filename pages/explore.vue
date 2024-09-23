<script setup>
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';
import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';
const generalStore = useGeneralStore();
const { categories } = storeToRefs(generalStore);

if (!categories.value.data.length) {
    generalStore.fetchCategories();
}
const skeletons = Array.from({ length: 20 }, (_, i) => i + 1)
</script>

<template>
    <main>
        <section v-if="categories.data.length === 0">
            <div class="grid gap-4 auto-rows-auto" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))">
                <PrimarySkeleton v-for="skeleton in skeletons" :key="skeleton" class="h-[170px] w-full" />
            </div>
        </section>
        <section v-else>
            <div class=" grid gap-4 auto-rows-auto" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))">
                <div v-for="category in categories?.data?.items" :key="category.id"
                    :style="{ backgroundColor: `hsl(${Math.random() * 360}, ${50 + Math.random() * 30}%, ${30 + Math.random() * 20}%)` }"
                    class="p-4 relative h-[170px] rounded-lg overflow-hidden cursor-pointer ">
                    <p class="text-xl font-bold text-white">
                        {{ category.name }}
                    </p>
                    <img :src="category?.icons[0].url" alt="Category icon"
                    class="w-[140px] h-[120px] object-cover object-top absolute right-[-1.6rem] bottom-0 rounded transform rotate-[20deg]">
                </div>
            </div>
        </section>
    </main>
</template>
