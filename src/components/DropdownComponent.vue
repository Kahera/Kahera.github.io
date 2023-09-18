<script setup lang="ts">
import { ref, type PropType, computed } from 'vue';
import type { RouteRecordNormalized } from 'vue-router';
import Button from './ButtonComponent.vue';

// Animations
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/utilities/prefers-reduced-motion';

const props = defineProps({
    links: {
        type: Array<RouteRecordNormalized>,
        required: true
    },
    position: {
        type: String as PropType<'left' | 'right'>,
        default: 'left'
    },
    buttonType: {
        type: String as PropType<'outline' | 'solid'>,
        default: 'outline'
    }
});

let dropdownOpen = ref(false);
const dropDownElements = computed(() => {
    if (dropdownOpen.value) return props.links ?? [];
    else return [];
})

// Close dropdown when clicking outside of it
window.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.dropdown-btn')) {
        dropdownOpen.value = false;
    }
});

// Animations
const reducedMotion = usePrefersReducedMotion();
function onEnter(el: any, done: any) {
    console.log(reducedMotion)
    gsap.fromTo(el, {
        opacity: 0,
        height: 0
    }, {
        opacity: 1,
        height: 'auto',
        duration: reducedMotion.value ? 0 : 0.2,
        delay: reducedMotion.value ? 0 : el.dataset.index * 0.08,
        onComplete: done
    })
}

function onLeave(el: any, done: any) {
    const delayModifier = props.links.length;
    gsap.to(el, {
        opacity: 0,
        height: 0,
        duration: reducedMotion.value ? 0 : 0.2,
        delay: reducedMotion.value ? 0 : (delayModifier - el.dataset.index) * 0.05,
        onComplete: done
    })
}
</script>

<template>
    <Button class="dropdown-btn" @click="dropdownOpen = !dropdownOpen" :type="'solid'" :size="'lg'">
        <template #icon>menu</template>
        <template #other>
            <!-- Wrapper with position styling -->
            <div class="dropdown absolute z-10 top-16 mb-2
                        min-w-[12rem] leading-8
                        overflow-hidden rounded-lg"
                :class="{ 'right-0': position == 'right', 'left-0': position == 'left' }">
                <!-- Dropdown items (list content) -->
                <TransitionGroup name="list" @enter="onEnter" @leave="onLeave">
                    <a v-for="(link, index) in dropDownElements" :key="index" :href=link.path :data-index="index" class="block 
                        bg-primary-lighter dark:bg-accent-darker
                        hover:bg-primary-light hover:dark:bg-accent-darker 
                        hover:opacity-100 hover:dark:opacity-100">
                        <span class="font-icon">
                            <slot name="icon"></slot>
                        </span>
                        <span class="text-primary-darker dark:text-primary-light">
                            {{ link.name }}
                        </span>
                    </a>
                </TransitionGroup>
            </div>
        </template>
    </Button>
</template>


