<script setup>
import Hero from '~/components/homePage/Hero/Hero.vue';
import Episodes from '~/components/homePage/Episodes/Episodes.vue';
import Albums from '~/components/homePage/Albums/Albums.vue';
import Shows from '~/components/homePage/Shows/Shows.vue';
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
