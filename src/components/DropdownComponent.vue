<script setup lang="ts">
import { ref, type PropType, onUnmounted } from 'vue';
import Button from './ButtonComponent.vue';

// Animations
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/utilities/prefers-reduced-motion';

defineProps({
    position: {
        type: String as PropType<'left' | 'right'>,
        default: 'left'
    },
    buttonType: {
        type: String as PropType<'outline' | 'solid'>,
        default: 'outline'
    }
});

const dropdownOpen = ref(false);

// Animations
const reducedMotion = usePrefersReducedMotion();

function toggleDropdown(closeDropdown: boolean = false) {
  if (closeDropdown) dropdownOpen.value = false;
  else dropdownOpen.value = !dropdownOpen.value;

  if (dropdownOpen.value) {
    gsap.fromTo('.dropdown-parent', {
      opacity: 0,
      height: 0
    }, {
      opacity: 1,
      height: 'auto',
      duration: reducedMotion.value ? 0 : 0.2,
      delay: reducedMotion.value ? 0 : 0.08,
    });
  } else {
    gsap.to('.dropdown-parent', {
      opacity: 0,
      height: 0,
      duration: reducedMotion.value ? 0 : 0.2,
    });
  }
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
      :size="'lg'"
      :icon="dropdownOpen ? 'close' : 'menu'"
      @click="toggleDropdown()"
    />
    <div
      v-if="dropdownOpen"
      class="dropdown-parent absolute z-10 top-14 mb-2 min-w-[10rem] rounded-lg"
      :class="{ 'right-0': position == 'right', 'left-0': position == 'left' }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
:slotted(.dropdown-parent > *) {
  @apply px-4 py-2 block text-center
    text-primary-darkest dark:text-primary-lighter
    bg-primary-lighter dark:bg-accent-darker
    hover:bg-primary-light dark:hover:bg-accent-darkest
    transition-colors duration-200;
}
</style>
