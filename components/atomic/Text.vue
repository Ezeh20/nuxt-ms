<script setup lang="ts">
import { defineProps } from 'vue';

interface TextProps {
    size: 'sm' | 'md' | 'lg';
    altColor?: string;
    text?: string;
}
const props = defineProps<TextProps>()
</script>

<template>
    <p :class="{
        'text-base': props.size === 'lg',
        'text-sm': props.size === 'md',
        'text-xs': props.size === 'sm',
        [props.altColor || 'text-text-color']: true,
    }">
        {{ props.text ?? "Default Text" }}
    </p>
</template>
