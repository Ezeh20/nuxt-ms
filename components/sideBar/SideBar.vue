<script setup lang="ts">
import styles from './SideBar.module.scss';
import { sideBarItems } from './constant';

const isAuth = useCookie('active');
const renderSideBar = computed(() => {
    if (!isAuth.value) {
        return sideBarItems.menu.filter((item) => item.id !== 2)
    }
    return sideBarItems.menu
})

import { useUtilStore } from '#imports';

const utilStore = useUtilStore();
const {leftBarActive } = storeToRefs(utilStore)

const toggleOpen = () => {
  utilStore.toggleLeftBar()
}

import { useWindowSize } from '@vueuse/core';
const {width} = useWindowSize()
</script>


<template>
    <aside :class="`${`${styles.main}`}  flex-col justify-between  pt-4 bg-background-color`">
        <nav :class="`flex flex-col ${width > 1024 ? 'gap-[3rem]' : ''}`">
            <div class="flex flex-col">
                <NuxtLink to="/" class="flex items-end ml-4 mb-4 ">
                    <Icon name="mdi:speaker" class="text-primary-color w-[40px] h-[40px]" />
                    <p class=" text-primary-color font-semibold">Echo</p>
                </NuxtLink>
                <!-- <Icon v-if="width >= 1024" name="mdi:library"
        :class="`cursor-pointer top-[15px] text-[80px] text-text-color transform ${!leftBarActive ? 'rotate-[-90deg]' : 'rotate-[90deg]'} self-end`"
        style="width:25px; height:25px" @click="toggleOpen" /> -->
            </div>
            <ul v-for="item in renderSideBar" :key="item.id" class="flex flex-col gap-4">
                <h2 class="font-3rd-font text-sm ml-5 opacity-50">{{ item.title }}</h2>
                <li v-for="link in item.links" :key="link.name" :class="[
                    'pl-5 relative cursor-pointer font-3rd-font group',
                    { 'active-route': $route.path === link.path },
                    width >= 1024 ? (leftBarActive ? 'h-[90px]' : 'h-[60px]') : 'h-[50px]'
                ]">
                    <NuxtLink :to="link.path" class="flex items-center gap-2 w-full h-full relative z-10">
                        <Icon :name="`mdi:${link.icon}`"
                            :class="`${$route.path === link.path ? 'text-primary-color' : 'text-secondary-color'} ${!leftBarActive ? 'w-[30px] h-[30px]' : 'w-[24px] h-[24px]'}`" />
                        <p  v-if="leftBarActive" :class="`${$route.path === link.path ? 'text-primary-color' : 'text-text-color'} text-base`">
                            {{
                                link.name }}</p>
                    </NuxtLink>
                    <div :class="[
                        'absolute left-0 top-0 h-full w-[10%] group-hover:w-[100%] bg-gradient-to-r transition-all duration-300',
                        $route.path === link.path
                            ? 'from-primary-color from-[4.5%] group-hover:from-[.5%] via-primary-color/30 via-[6%] group-hover:via-[0%]'
                            : 'from-text-color from-[4.5%] group-hover:from-[.5%] via-text-color/30 via-[6%] group-hover:via-[0%]'
                    ]">
                    </div>
                </li>
            </ul>

            <!-- <section class="flex flex-col gap-2">
                <h2 class="font-3rd-font text-sm ml-5 opacity-50">Activity</h2>
                <ul class="flex flex-col gap-4">
                    <li v-for="item in sideBarItems.activity" :class="[
                        'pl-5 h-[100px] relative cursor-pointer font-3rd-font group',
                        { 'active-route': $route.path === item.path }
                    ]">
                        <NuxtLink :to="item.path" class="flex items-center gap-2 w-full h-full relative z-10">
                            <Icon :name="`mdi:${item.icon}`"
                                :class="`${$route.path === item.path ? 'text-primary-color' : 'text-text-color'}`" />
                            <p
                                :class="`${$route.path === item.path ? 'text-primary-color' : 'text-text-color'} text-sm`">
                                {{ item.name }}</p>
                        </NuxtLink>
                        <div :class="[
                            'absolute left-0 top-0 h-full w-[10%] group-hover:w-[100%] bg-gradient-to-r transition-all duration-300',
                            $route.path === item.path
                                ? 'from-primary-color from-[4.5%] group-hover:from-[.5%] via-primary-color/30 via-[6%] group-hover:via-[0%]'
                                : 'from-text-color from-[4.5%] group-hover:from-[.5%] via-text-color/30 via-[6%] group-hover:via-[0%]'
                        ]">
                        </div>
                    </li>
                </ul>
            </section> -->
        </nav>


        <!-- <section class="flex flex-col gap-2 ml-5">
            <p>user settings</p>
        </section> -->
    </aside>
</template>
