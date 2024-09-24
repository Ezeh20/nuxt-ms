<script setup>
import { ref } from 'vue';
const props = defineProps({
    uri: {
        type: String,
        required: true
    }
});

const isAddingToQueue = ref(false);

const isOpen = ref(false);

//add a track to the queue
const addToQueue = async () => {
    isAddingToQueue.value = true;
    try {
        await $fetch(`${useRuntimeConfig().public.SP_BASE_URL}me/player/queue`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${useUserStore().token}`,
            },
            params: {
                uri: props?.uri
            }
        });
        useToast().add({
            title: 'Success',
            description: 'Track added to queue',
            icon: 'i-heroicons-check-circle',
            color: "green"
        });
    } catch (error) {
        useToast().add({
            title: 'Error',
            description: 'Failed to add track to queue',
            icon: 'i-heroicons-x-circle',
            color: 'red',
        });
    } finally {
        isAddingToQueue.value = false;
        isOpen.value = false;
    }
};
</script>

<template>
    <UPopover v-model:open="isOpen">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
        <template #panel>
            <div class="p-4 space-y-2">
                <button @click="addToQueue" :disabled="isAddingToQueue"
                    class="w-full  text-left p-2 text-sm text-gray-white hover:text-background-color hover:bg-gray-100 transition-colors duration-150 ease-in-out rounded-md">
                    {{ isAddingToQueue ? "Adding to Queue" : " Add to Queue" }}
                </button>
            </div>
        </template>
    </UPopover>
</template>
