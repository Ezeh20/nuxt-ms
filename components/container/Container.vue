<script setup>
import styles from "./Container.module.scss"
</script>

<template>
    <main :class="`${styles.main}`">
        <slot />
    </main>
</template>