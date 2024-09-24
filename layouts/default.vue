<script setup lang="ts">
import Library from '~/components/level1/library/Library.vue';
import styles from './Default.module.scss';
import Player from '~/components/player/Player.vue';
const userStore = useUserStore();
const { user, loading, error } = storeToRefs(userStore);

const isActive = useCookie("isActive")

onMounted(async () => {
    await userStore.fetchUser();
});
</script>


<template>
    <section :class="` ${styles.main}`">
        <SideBar class="sticky top-0 h-screen" />
        <section class="bg-background-color w-full flex flex-col h-screen">
            <NavBar class="sticky top-0 z-10" />
            <div class="relative overflow-y-auto flex-grow">
                <Container>
                    <slot />
                </Container>
                <Footer />
            </div>
        </section>
        <Library />
        <Player v-if="isActive && user" class=" fixed bottom-0 w-full bg-black h-[100px] z-40" />
    </section>
    <UNotifications />
</template>