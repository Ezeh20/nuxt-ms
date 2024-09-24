<script setup>
import { usePlayerStore } from '#imports';
const playerStore = usePlayerStore();
const { trackUri } = toRefs(playerStore);

const isPlayer = ref(trackUri)
</script>


<template>
    <footer :class="`sticky top-[100%] py-[30px] bg-primary-color mt-[50px] ${isPlayer && 'pb-[120px]'}`">
        <div class="px-4">
            <div class="flex justify-between items-center">
                <p class="text-white text-sm">Copyright © 2024 Echo. All rights reserved.</p>
                <ul class="flex">
                    <li class="mx-4">
                        <a href="https://github.com/Ezeh20/nuxt-ms" target="_blank"
                            class="text-white text-sm underline">View Repo</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>