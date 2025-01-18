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
      },
      backgroundColorClasses: {
         type: String as PropType<string>,
            default: 'bg-accent-lightest dark:bg-accent-darker shadow-sm shadow-accent-light dark:shadow-accent-dark'
         }
      });
      const dropdownOpen = ref(false);

function toggleDropdown(closeDropdown: boolean = false) {
  if (closeDropdown) dropdownOpen.value = false;
  else dropdownOpen.value = !dropdownOpen.value;
}

// Close dropdown when clicking outside of it
const handleOutsideClick = (e: MouseEvent) => {
  if (!(e.target as HTMLElement).closest('#dropdown-btn')) {
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
      id="dropdown-btn"
      :type="buttonType"
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
        class="absolute flex flex-col gap-2 top-14 p-4 min-w-[10rem] rounded-md *:primary-higher-contrast-hover-text"
        :class="[
          position == 'right' ? 'right-0' : 'left-0',
          backgroundColorClasses
        ]"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
