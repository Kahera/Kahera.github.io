import { ref } from "vue";

const prefersReducedMotion = ref(false);
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
   prefersReducedMotion.value = e.matches;
});

export function usePrefersReducedMotion() {
   return prefersReducedMotion;
}
