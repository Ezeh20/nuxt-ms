<script setup>
import Text from '~/components/atomic/Text.vue';
import styles from './Library.module.scss';
import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore();
import { _getAuthRequest_ } from '~/utils/apiClient';
const { user, loading } = storeToRefs(userStore);
import Playlist from './playlist/Playlist.vue';
import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';
import Heading from '~/components/atomic/Heading.vue';


const currentLocation = window?.location.href
const handleLogin = async () => {
  const res = await $fetch('/api/utils/getAuthLink', {
    method: 'POST',
    body: { path: currentLocation }
  });
  window.location.href = res.spotifyAuthUrl;
};
const isActive = useCookie('active');
const blocks = [1, 2, 3]
</script>

<template>
  <main class="flex flex-col  bg-background-color">
    <Heading tag="h1" size="md" text="Your Library" class="p-4" />
    <section v-if="!isActive && !user" class="h-full">
      <button @click="handleLogin" class="flex items-center h-[100%] w-[100%] justify-center gap-2">
        <Icon name="mdi:login-variant" :class="`${styles.loginIcon}`" />
        <Text size="lg" text="Login" />
      </button>
    </section>
    <main v-else :class="`${`${styles.main}`} p-5 bg-background-color`">
      <div v-if="loading && !user" class="flex flex-col gap-5">
        <PrimarySkeleton v-for="block in blocks" :key="block" class="h-full w-full" />
      </div>
      <section v-if="user">
        <Playlist />
      </section>
    </main>
  </main>
</template>