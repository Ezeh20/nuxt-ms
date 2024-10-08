<script setup>
import styles from './NavBar.module.scss';
import { useRoute } from 'vue-router';
const router = useRoute();
import { useQueryStore } from '~/stores/queryStore';
import { storeToRefs } from '#imports';
const queryStore = useQueryStore()

const updateQuery = (event) => {
    queryStore.setQuery(event.target.value)
}

const popoverOpen = ref(false);
import { useUserStore } from '#imports';
import { useAuth } from '~/composables/useAuth';
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const isActive = useCookie('active')
const { login, logout } = useAuth()


const handleToggle = () => {
    popoverOpen.value = false
}
</script>

<template>
    <Container>
        <header :class="`${styles.header} flex items-center justify-between z-50 px-2 h-[70px] bg-black`">
            <nav class="flex items-center  justify-between w-full">
                <div class="flex items-center gap-2 w-[100%] ">
                    <div :class="`items-center ${styles.mobile}`">
                        <NuxtLink to="/" class="flex items-end  ">
                            <Icon name="mdi:speaker" class="text-primary-color w-[40px] h-[40px]" />
                        </NuxtLink>
                        <UPopover v-model="popoverOpen" 
                            :popper="{ placement: 'bottom-end', offsetDistance: 18 }">
                            <button class=" flex items-center justify-center w-[32px]  h-[32px] rounded-full bg-white">

                                <Icon name="mdi:menu" class="text-black text-2xl" />
                            </button>
                            <template #panel>
                                <div class="">
                                    <NuxtLink @click="handleToggle" to="/" class="flex items-center gap-2 p-4">
                                        <Icon name="mdi:play-box" class="text-primary-color text-2xl" />
                                        <span class="text-sm text-white">Feed</span>
                                    </NuxtLink>
                                    <NuxtLink @click="handleToggle" to="/explore" class="flex items-center gap-2 p-4">
                                        <Icon name="mdi:compass" class="text-primary-color text-2xl" />
                                        <span class="text-sm text-white">Explore</span>
                                    </NuxtLink>
                                </div>
                            </template>
                        </UPopover>
                    </div>
                    <div class="flex w-[60%] px-3 items-center gap-2 bg-gray-500/15 rounded-full">
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
                </div>
                <div class="flex items-center gap-2">
                    <UPopover v-model="popoverOpen" 
                        :popper="{ placement: 'bottom-end', offsetDistance: 18 }">
                        <button class=" flex items-center justify-center w-[32px]  h-[32px] rounded-full bg-white">
                            <p v-if="user || isActive" class="text-black text-xl font-bold">{{
                                user?.display_name.charAt(0) }}
                            </p>
                            <Icon v-else name="uil:user" class="text-black text-2xl" />
                        </button>
                        <template #panel>
                            <div class="">
                                <button @click="isActive || user ? logout() : login()"
                                    class="flex items-center gap-4 p-4">
                                    <Icon :name="isActive || user ? 'mdi:logout' : 'mdi:login'"
                                        class="text-white text-2xl" />
                                    <span class="text-sm text-white">{{ isActive || user ? "Logout" : "Login" }}</span>
                                </button>
                            </div>
                        </template>
                    </UPopover>
                </div>
            </nav>
        </header>
    </Container>
</template>