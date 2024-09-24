<script setup>
import Playlist from './playlist/Playlist.vue';
import PrimarySkeleton from '~/components/atomic/Skeletons/PrimarySkeleton.vue';
import Heading from '~/components/atomic/Heading.vue';
import Text from '~/components/atomic/Text.vue';
import styles from './Library.module.scss';
const userStore = useUserStore();
import { _getAuthRequest_ } from '~/utils/apiClient';
import { useUserStore } from '~/stores/userStore';
const { user, loading } = storeToRefs(userStore);
import { useAuth } from '~/composables/useAuth';
const { login } = useAuth()
import { useUtilStore } from '~/stores/utilStore';
const isActive = useCookie('active');
const blocks = [1, 2, 3]


const utilStore = useUtilStore();
const { rightBarActive } = storeToRefs(utilStore)

const toggleOpen = () => {
  utilStore.toggleRightBar()
}

import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();
</script>

<template>
  <main :class="`flex flex-col bg-background-color ${!rightBarActive ? 'w-[150px]' : ''}`">
    <div class="flex relative justify-between">
      <Icon v-if="width >= 1024" name="mdi:library"
        :class="`absolute cursor-pointer top-[15px] text-[80px] text-text-color transform ${rightBarActive ? 'rotate-[-90deg]' : 'rotate-[90deg]'}`"
        style="width:25px; height:25px" @click="toggleOpen" />
      <div></div>
      <Heading tag="h1" size="md" text="Your Library" class="p-4" />
    </div>
    <section v-if="!isActive && !user" class="h-full">
      <button @click="login" class="flex items-center h-[100%] w-[100%] justify-center gap-2">
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