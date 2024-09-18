<script setup lang="ts">
import styles from './SideBar.module.scss';
import { sideBarItems } from './constant';
import { useRoute } from 'vue-router';
const route = useRoute().path;
</script>


<template>
    <aside :class="`${`${styles.main}`} flex flex-col justify-between min-h-screen pt-4 bg-background-color`">
        <nav class="flex flex-col gap-[3rem]">
            <h1 class="text-2xl  font-alt-font font-normal ml-5">Echo∏</h1>
            <ul v-for="item in sideBarItems.menu" :key="item.id" class="flex flex-col gap-4">
                <h2 class="font-3rd-font text-sm ml-5 opacity-50">{{ item.title }}</h2>
                <li v-for="link in item.links" :key="link.name" :class="[
                    'pl-5 h-[90px] relative cursor-pointer font-3rd-font group',
                    { 'active-route': $route.path === link.path }
                ]">
                    <NuxtLink :to="link.path" class="flex items-center gap-2 w-full h-full relative z-10">
                        <Icon :name="`mdi:${link.icon}`"
                            :class="`${$route.path === link.path ? 'text-primary-color' : 'text-secondary-color'}`" />
                        <p :class="`${$route.path === link.path ? 'text-primary-color' : 'text-text-color'} text-base`">
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


        <section class="flex flex-col gap-2 ml-5">
            <p>user settings</p>
        </section>
    </aside>
</template>
