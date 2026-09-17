import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('darkMode', () => {
    function initialPreference() {
        try {
            const preference = localStorage.getItem('theme');
            if (preference === 'dark' || preference === 'light') return preference === 'dark';
        } catch {
            return document.documentElement.classList.contains('dark');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    const darkMode = ref(initialPreference());

    watch(darkMode, (dark) => {
        document.documentElement.classList.toggle('dark', dark);
    }, { immediate: true, flush: 'sync' });

    const toggle = () => {
        darkMode.value = !darkMode.value;
        try {
            localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
        } catch {
            return;
        }
    }

    return { darkMode, toggle };
})