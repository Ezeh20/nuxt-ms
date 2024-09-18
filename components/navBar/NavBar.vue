<script setup lang="ts">
import styles from './NavBar.module.scss';
import { useRoute } from 'vue-router';
const router = useRoute();
</script>

<template>
    <Container>
        <header :class="`${styles.header} flex items-center justify-between z-50 px-2 h-[70px] bg-black`">
            <nav class="flex items-center  justify-between w-full">
                <div class="flex w-[50%] px-3 items-center gap-2 bg-background-color rounded-full">
                    <Icon name="uil:search" class="text-white" style="width: 28px; height: 28px;" />
                    <input type="text" placeholder="Search"
                        class="w-full h-[100%] text-sm text-text-color px-2 bg-transparent py-[15px] outline-none">
                    <div class="w-[1px] h-[30px] bg-text-color/20" />
                    <NuxtLink to="explore" class=" flex items-center">
                        <Icon name="mdi:compass" :class="router.path === '/explore' ? 'text-primary-color' : 'text-white'"
                            style="width: 32px; height: 32px;" />
                    </NuxtLink>
                </div>
                <div class="flex items-center gap-2">
                    <button class=" flex items-center justify-center w-[32px]  h-[32px] rounded-full bg-white">
                        <Icon name="uil:user" class="text-black text-2xl" />
                    </button>
                </div>
            </nav>
        </header>
    </Container>
</template>