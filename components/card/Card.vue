<script setup>
import { defineProps } from 'vue';
import truncateText from '@/utils/truncate';

const props = defineProps({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    alt: {
        type: Boolean,
        required: false
    },
    hideInfo: {
        type: Boolean,
        required: false,
        default: false
    }
});

const { image, title, description, alt } = props;
</script>


<template>
    <div :class="['relative flex flex-col gap-2 h-full border rounded-md cursor-pointer overflow-hidden transition-all duration-300', !alt ? 'border-text-color/50 hover:border-text-color hover:shadow-xl'
        : 'border-transparent hover:border-transparent hover:shadow-2xl hover:shadow-black hover:bg-[#2424247d]']">
        <div class="card__image flex-shrink-0">
            <img :src="image" alt="image"
                :class="['w-full object-cover object-top rounded-t-md hover:scale-[1.05] transition-all duration-1000', hideInfo ? 'h-[300px]' : 'h-[150px]']">
        </div>
        <div v-if="!hideInfo" class="card__content flex flex-col justify-between flex-grow p-[12px]">
            <h2 class="card__content__title text-sm text-text-color font-semibold mb-2">{{ truncateText(title, 20) }}</h2>
            <p class="card__content__description text-xs text-text-color/60">{{ truncateText(description, 30) }}</p>
        </div>
        <div v-else class="absolute bottom-0  w-full h-full z-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div class="absolute inset-0 bg-black bg-opacity-70  opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-[12px]">
                <h2 class="text-base text-white font-semibold mb-2">{{ truncateText(title, 20) }}</h2>
                <p class="text-sm text-white/90">{{ truncateText(description, 30) }}</p>
            </div>
        </div>
    </div>
</template>