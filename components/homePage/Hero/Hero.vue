<script setup lang="ts">
import styles from './Hero.module.scss';
import { getSP_Token } from '@/utils/apiClient';
const token = ref(null);
const error = ref(null);


 token.value = await getSP_Token();
</script>

<template>
    <main>
        <p>Hero</p>
        <p v-if="error">Error: {{ error }}</p>
        <p v-else-if="token">Access Token: {{ token }}</p>
  
    </main>
</template>