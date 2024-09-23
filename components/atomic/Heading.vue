<script setup lang="ts">
import { defineProps } from 'vue';

interface HeaderProps {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size: 'sm' | 'md' | 'lg';
    altColor?: string;
    text?: string;
}
const props = defineProps<HeaderProps>()
</script>

<template>
    <component :is="props.tag" :class="{
        'text-2xl font-bold': props.size === 'lg',
        'text-base font-semibold': props.size === 'md',
        'text-lg font-medium': props.size === 'sm',
        [props.altColor || 'text-white']: true,
       
    }" style="margin-bottom: 20px; font-weight: 500;">
        {{ props.text ?? "Default Text" }}
    </component>
</template>