<script setup lang="ts">

import Text from '~/components/atomic/Text.vue';
import styles from './Library.module.scss';
import Heading from '~/components/atomic/Heading.vue';

const isUser = false
</script>

<template>
    <main :class="`${`${styles.main}`}  min-h-screen p-5 bg-background-color`">
        <!-- <Heading tag="h1" size="md" text="Your Library" /> -->
        <button v-if="!isUser" class="flex items-center h-[100%] w-[100%] justify-center gap-2">
            <Icon name="mdi:login-variant" :class="`${styles.loginIcon}`"/>
            <Text size="lg" text="Login" />
        </button>
    </main>
</template>