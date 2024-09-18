<script setup>
import Hero from '~/components/homePage/Hero/Hero.vue';
import Episodes from '~/components/homePage/Episodes/Episodes.vue';
</script>




<template>
    <main class="hide-scroll">
        <Hero />
        <section class="flex flex-col gap-6 px-4 py-6">
            <Episodes />
        </section>
    </main>
</template>
