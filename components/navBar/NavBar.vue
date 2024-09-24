<script setup>
import styles from './NavBar.module.scss';
import { useRoute } from 'vue-router';
const router = useRoute();
import { useSearch } from '~/stores/searchStore';
import { storeToRefs } from 'pinia';
const searchStore = useSearch()
const { query } = storeToRefs(searchStore)
const updateQuery = (event) => {
    searchStore.setQuery(event.target.value)
}
</script>

<template>
    <Container>
        <header :class="`${styles.header} flex items-center justify-between z-50 px-2 h-[70px] bg-black`">
            <nav class="flex items-center  justify-between w-full">
                <div class="flex w-[50%] px-3 items-center gap-2 bg-gray-500/15 rounded-full">
                    <NuxtLink to="/search" class="w-full h-[100%]">
                        <input type="text" :value="query" @input="updateQuery" placeholder="Search"
                            class="w-full h-[100%] text-sm text-text-color px-2 bg-transparent py-[15px] outline-none">
                    </NuxtLink>
                    <div class="w-[1px] h-[30px] bg-text-color/20" />
                    <NuxtLink to="explore" class=" flex items-center">
                        <Icon name="mdi:compass"
                            :class="router.path === '/explore' ? 'text-primary-color' : 'text-white'"
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