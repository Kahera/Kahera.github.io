<script setup lang="ts">
import { ref, type PropType, onUnmounted } from 'vue';
import Button from './ButtonComponent.vue';

defineProps({
    position: {
        type: String as PropType<'left' | 'right'>,
        default: 'left'
    },
    buttonType: {
        type: String as PropType<'outline' | 'solid'>,
        default: 'outline'
    },
    buttonSize: {
        type: String as PropType<'sm' | 'md' | 'lg'>,
        default: 'md'
    }
});

const dropdownOpen = ref(false);

function toggleDropdown(closeDropdown: boolean = false) {
  if (closeDropdown) dropdownOpen.value = false;
  else dropdownOpen.value = !dropdownOpen.value;
}

// Close dropdown when clicking outside of it
const handleOutsideClick = (e: MouseEvent) => {
  if (!(e.target as HTMLElement).closest('.dropdown-btn')) {
    toggleDropdown(true);
  }
};

window.addEventListener('click', handleOutsideClick);
onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick);
});

</script>

<template>
  <div class="relative min-w-fit">
    <Button
      class="dropdown-btn"
      :type="'solid'"
      :size="buttonSize"
      :icon="dropdownOpen ? 'close' : 'menu'"
      @click="toggleDropdown()"
    />
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="dropdownOpen"
        class="dropdown-parent absolute z-10 top-14 mb-2 min-w-[10rem] rounded-lg"
        :class="{ 'right-0': position == 'right', 'left-0': position == 'left' }"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
:slotted(.dropdown-parent > *) {
  @apply px-4 py-2 block text-center
    text-primary-darkest bg-primary-lighter hover:bg-primary-light
    transition-colors duration-200;

      .dark & { /* For some reason, the tailwind dark-prefix don't work on the slotted elements */
         @apply text-primary-lighter bg-accent-darker hover:bg-accent-darkest;
      }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
