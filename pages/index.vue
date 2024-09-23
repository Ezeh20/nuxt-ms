<script setup>
import Hero from '~/components/homePage/Hero/Hero.vue';
import Episodes from '~/components/homePage/Episodes/Episodes.vue';
import Albums from '~/components/homePage/Albums/Albums.vue';
import Shows from '~/components/homePage/Shows/Shows.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/stores/userStore';


const route = useRoute()
const router = useRouter()
const userStore = useUserStore();
import TopPicks from '~/components/level1/topPicks/TopPicks.vue';
import RecTracks from '~/components/level1/recTracks/RecTracks.vue';

const { user } = storeToRefs(userStore)

//get the code from the url then send
const code = route?.query?.code

onMounted(async () => {
    if (code) {
        const res = await $fetch('/api/utils/callbackToken', {
            method: 'POST',
            body: { code }
        });

        router.replace({
            path: route.path,
            query: {}
        });

        if (res.success) {
            router.replace({
                path: route.path,
                query: {}
            });
            await userStore.fetchUser();
        }
    }
});
const isActive = useCookie('active');
</script>




<template>
    <main class="hide-scroll">
        <Hero />
        <section class="flex flex-col gap-[3rem] px-4 py-6">
            <TopPicks v-if="isActive && user" />
            <RecTracks v-if="isActive && user" />
            <Albums />
            <Shows />
            <Episodes />
        </section>
    </main>
</template>
