<script setup>
import { ref } from 'vue';
import { usePlayerStore } from '#imports';
const playerStore = usePlayerStore()
const { trackUri } = storeToRefs(playerStore)

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
            <div v-if="trackUri" class="space-y-2">
                <button @click="addToQueue" :disabled="isAddingToQueue"
                    class="w-full flex items-center gap-2  text-left p-4 text-sm text-white  transition-colors duration-150 ease-in-out rounded-md">
                    <Icon v-if="!isAddingToQueue" name="mdi:plus" />
                    {{ isAddingToQueue ? "adding to Queue" : " add to queue" }}
                </button>
            </div>
            <p v-else class="p-4 text-sm">No active queue</p>
        </template>
    </UPopover>
</template>
