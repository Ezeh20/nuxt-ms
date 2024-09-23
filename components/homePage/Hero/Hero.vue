<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '@/stores/generalStore';
import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';

const generalStore = useGeneralStore();
const { artists } = storeToRefs(generalStore);

const activeCardIndex = ref(0);
let intervalId;
const isHovered = ref(false);

const updateActiveCard = () => {
  if (artists.value.data.length > 0) {
    activeCardIndex.value = (activeCardIndex.value + 1) % artists.value.data.length;
  }
};

if (!artists.value.data.length) {
  generalStore.fetchArtists();
}
const startInterval = () => {
  intervalId = setInterval(updateActiveCard, 3500);
};

const stopInterval = () => {
  clearInterval(intervalId);
};

onMounted(() => {
  startInterval();
});

onUnmounted(() => {
  stopInterval();
});

const handleMouseEnter = () => {
  isHovered.value = true;
  stopInterval();
};

const handleMouseLeave = () => {
  isHovered.value = false;
  startInterval();
};

watch(() => artists.value.data, () => {
  activeCardIndex.value = 0;
}, { deep: true });


</script>

<template>
  <main>
    <div class="hero">
      <div class="hero__content">
        <div class="relative h-[400px] w-full" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
           <PrimarySkeleton v-if="artists.data.length === 0" class="h-full w-full"/>
          <section v-for="(artist, index) in artists.data" :key="artist.id"
            class="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out" :style="{
              opacity: index === activeCardIndex ? 1 : 0,
              transform: `translateX(${index === activeCardIndex ? '0%' : '-1.3%'})`,
              transition: 'opacity 0.8s ease-in-out, transform .8s ease-in-out',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }">
            <div class="absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-black/95"></div>
            <div class="absolute inset-0 z-20 flex flex-col justify-between p-4">
              <div class="flex items-center justify-between">
                <p class="text-white font-bold opacity-80 text-xl">{{ artist.name }}</p>
                <p :class="[
                  'text-white text-sm px-2 py-1 rounded',
                  artist.popularity <= 30 ? 'bg-red-500/50' :
                    artist.popularity <= 50 ? 'bg-gray-400' :
                      artist.popularity <= 79 ? 'bg-yellow-500/50' :
                        'bg-primary-color'
                ]">
                  {{ artist.popularity }}
                </p>
              </div>
              <div class="text-white px-4 py-2  self-start transition-all duration-1000 ease-in-out" :style="{
                transform: index === activeCardIndex ? 'translateY(0)' : 'translateY(40%)',
                opacity: index === activeCardIndex ? 1 : 0
              }">
                <div class="flex flex-wrap gap-4">
                  <p v-for="genre in artist.genres" :key="genre"
                    class="flex items-center border opacity-55 border-text-color/80 text-sm rounded-[4px]  px-4 py-2">
                    {{ genre }}</p>
                </div>
              </div>
            </div>
            <img :src="artist.images[0].url" alt="artist image"
              class="w-full h-full object-cover object-top shadow-lg" />
          </section>
        </div>
      </div>
    </div>
  </main>
</template>