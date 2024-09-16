<script setup lang="ts">
import styles from './SideBar.module.scss';
import { sideBarItems } from './constant';


import { useRoute } from 'vue-router';

const route = useRoute().path;

console.log(route);

</script>


<template>
    <aside
        :class="`${styles.main} flex flex-col justify-between min-h-screen pt-2 rounded-tr-[20px] rounded-br-[20px]`">
        <nav class="flex flex-col gap-[3rem]">
            <h1 class="text-2xl font-alt-font ml-5">Echo∏</h1>
            <ul class="flex flex-col gap-4">
                <li v-for="item in sideBarItems.menu" :class="[
                    'pl-5 py-2 relative cursor-pointer font-3rd-font group',
                    { 'active-route': $route.path === item.path }
                ]">
                    <NuxtLink :to="item.path" class="flex items-center gap-2">
                        <Icon :name="`mdi:${item.icon}`" :class="`${$route.path === item.path ? 'text-primary-color' : 'text-secondary-color'}`" />
                        {{ item.name }}
                    </NuxtLink>
                    <div v-if="$route.path === item.path"
                        class="absolute left-0 top-0 h-full w-[10%] group-hover:w-[100%] bg-gradient-to-r
                         from-primary-color from-[4.5%] group-hover:from-[.5%] via-primary-color/30 via-[6%] group-hover:via-[0%] to-transparent">
                    </div>
                </li>
            </ul>

            <section class="flex flex-col gap-2">
                <h2 class="font-3rd-font text-sm ml-5 opacity-50">Activity</h2>
                <ul class="flex flex-col gap-4">
                    <li v-for="item in sideBarItems.activity" :class="[
                        'pl-5 py-2 relative cursor-pointer font-3rd-font group',
                        { 'active-route': $route.path === item.path }
                    ]">
                        <NuxtLink :to="item.path" class="flex items-center gap-2">
                            <Icon :name="`mdi:${item.icon}`" :class="`${$route.path === item.path ? 'text-primary-color' : 'text-secondary-color'}`" />
                            {{ item.name }}

                        </NuxtLink>
                        <div v-if="$route.path === item.path"
                            class="absolute left-0 top-0 h-full w-[10%] group-hover:w-[100%] bg-gradient-to-r
                         from-primary-color from-[4.5%] group-hover:from-[.5%] via-primary-color/30 via-[6%] group-hover:via-[0%] to-transparent">
                        </div>
                    </li>
                </ul>
            </section>
        </nav>


        <section class="flex flex-col gap-2 ml-5">
            <p>user settings</p>
        </section>
    </aside>
</template>
