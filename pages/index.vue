<script setup>
import Hero from '~/components/homePage/Hero/Hero.vue';
import Episodes from '~/components/homePage/Episodes/Episodes.vue';
import Albums from '~/components/homePage/Albums/Albums.vue';
import Shows from '~/components/homePage/Shows/Shows.vue';
import { useUserStore } from '~/stores/userStore';
const route = useRoute()
const router = useRouter()
const userStore = useUserStore();



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


</script>




<template>
    <main class="hide-scroll">
        <Hero />
        <section class="flex flex-col gap-[3rem] px-4 py-6">
            <Albums />
            <Shows />
            <Episodes />
        </section>
    </main>
</template>
