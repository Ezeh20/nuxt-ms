<script setup lang="ts">

import Library from '~/components/level1/library/Library.vue';
import styles from './Default.module.scss';
</script>




<template>
    <main :class="`grid ${styles.main}`"">
        <SideBar />
        <section>
            <NavBar />
            <Container>
                <slot />
            </Container>
            <Footer />
        </section>
        <Library />
    </main>
</template>