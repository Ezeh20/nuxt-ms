<script setup lang="ts">
import styles from './NavBar.module.scss';
</script>

<template>
    <Container>
        <header :class="`${styles.header} sticky top-0 z-50 mt-2 bg-white`">
            <p>Nav</p>
        </header>
    </Container>
</template>