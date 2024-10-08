<script setup>
import { useAuth } from "~/composables/useAuth";
const { login, loading } = useAuth();
</script>

<template>
    <div class="flex flex-col items-center p-4 text-center">
        <p class="mb-4 text-lg text-gray-700 dark:text-gray-300">
            You need to log in to access this feature.
        </p>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Log in to see music recommendations, your top tracks, playlists, and control playback.
        </p>
        <button class=" bg-primary-color text-white px-4 py-2 rounded-md" @click="login" :disabled="loading">
            {{ loading ? "Loading..." : "Log in" }}
        </button>
    </div>
</template>