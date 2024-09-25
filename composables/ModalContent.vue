<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['update:isOpen'])

const closeModal = () => {
    emit('update:isOpen', false)
}
</script>

<template>
    <div>
        <UModal :model-value="props.isOpen" @update:model-value="emit('update:isOpen', $event)" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Modal
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="closeModal" />
                    </div>
                </template>

                <Placeholder class="h-32" />
                <slot />
            </UCard>
        </UModal>
    </div>
</template>
