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
        'text-xl font-semibold': props.size === 'md',
        'text-lg font-medium': props.size === 'sm',
        [props.altColor || 'text-primary-color']: true,
    }">
        {{ props.text ?? "Default Text" }}
    </component>
</template>