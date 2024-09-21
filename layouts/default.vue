<script setup lang="ts">
import Library from '~/components/level1/library/Library.vue';
import styles from './Default.module.scss';
const userStore = useUserStore();
const { user, loading, error } = storeToRefs(userStore);

onMounted(async () => {
    await userStore.fetchUser();
});
</script>


<template>
    <main :class="`grid  ${styles.main}`">
        <SideBar class="sticky top-0 h-screen" />
        <section class="bg-background-color w-full flex flex-col h-screen">
            <NavBar class="sticky top-0 z-10"/>
            <div class="overflow-y-auto flex-grow">
                <Container>
                    <slot />
                </Container>
                <Footer />
            </div>
        </section>
        <Library class="sticky top-0 h-screen" />
    </main>
</template>