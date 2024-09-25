<script setup lang="ts">
import Library from '~/components/level1/library/Library.vue';
import styles from './Default.module.scss';
import { usePlayerStore } from '#imports';
import Player from '~/components/player/Player.vue';
const userStore = useUserStore();
const playerState = usePlayerStore();
const { user } = storeToRefs(userStore);
const { trackUri } = storeToRefs(playerState)
const isActive = useCookie("active")

import { useUtilStore } from '~/stores/utilStore';
const utilStore = useUtilStore();
const { leftBarActive, rightBarActive } = storeToRefs(utilStore)

onMounted(async () => {
    await userStore.fetchUser();
});
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();

</script>


<template>
    <section
        :class="`${styles.main} ${(leftBarActive && rightBarActive) && styles.default}
         ${(!leftBarActive && rightBarActive) && styles.closeLeft} ${(leftBarActive && !rightBarActive) && styles.closeRight} 
         ${(!leftBarActive && !rightBarActive) && styles.closeBoth} grid`">
        <SideBar class="sticky top-0 h-screen" />
        <section class="bg-background-color w-full flex flex-col h-screen">
            <NavBar class="sticky top-0 z-10" />
            <div class="overflow-y-auto flex-grow ">
                <Container>
                    <slot />
                </Container>
                <Footer v-if="width > 1024" />
            </div>
        </section>
        <Library />
        <Player v-if="isActive && user && trackUri" class=" fixed bottom-0 w-full bg-black h-[100px] z-40" />
    </section>
    <UNotifications />
</template>