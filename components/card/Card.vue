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
    }
});

const { image, title, description } = props;
</script>


<template>
    <div class="card flex flex-col gap-2 h-full border border-text-color/50 rounded-md hover:border-text-color cursor-pointer overflow-hidden">
        <div class="card__image flex-shrink-0">
            <img :src="image" alt="image" class="w-full h-[150px] object-cover object-top rounded-t-md hover:scale-[1.02] transition-all duration-1000">
        </div>
        <div class="card__content flex flex-col justify-between flex-grow p-[10px]">
            <h2 class="card__content__title text-sm text-text-color font-semibold mb-2">{{ truncateText(title, 20) }}</h2>
            <p class="card__content__description text-xs text-text-color/60">{{ truncateText(description, 30) }}</p>
        </div>
    </div>
</template>