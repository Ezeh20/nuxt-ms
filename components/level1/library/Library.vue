<script setup>
import Text from '~/components/atomic/Text.vue';
import styles from './Library.module.scss';
import Heading from '~/components/atomic/Heading.vue';
import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore();
import { _getAuthRequest_ } from '~/utils/apiClient';
const { user, loading } = storeToRefs(userStore);

import Playlist from './playlist/Playlist.vue';


const handleLogin = async () => {
  const res = await $fetch('/api/utils/getAuthLink');
  window.location.href = res.spotifyAuthUrl;
};
const isActive = useCookie('active');
</script>

<template>
  <section v-if="!isActive && !user">
    <button @click="handleLogin" class="flex items-center h-[100%] w-[100%] justify-center gap-2">
      <Icon name="mdi:login-variant" :class="`${styles.loginIcon}`" />
      <Text size="lg" text="Login" />
    </button>
  </section>
  <main v-else :class="`${`${styles.main}`}  min-h-screen p-5 bg-background-color`">
    <p v-if="loading && !user">Loading...</p>
    <section v-if="user">
      <Playlist />
    </section>
  </main>
</template>