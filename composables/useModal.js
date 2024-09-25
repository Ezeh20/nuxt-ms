import { ref } from 'vue';

export const useModal = () => {
  const isOpen = ref(false);

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    toggleModal,
  };
};
