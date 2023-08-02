import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('darkMode', () => {
    // Get local storage or system default - default to false
    const localStoragePreference = localStorage.getItem('theme');
    const prefersDark = (!!localStoragePreference && localStoragePreference == 'dark') ?? window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) { document.documentElement.classList.add('dark'); }

    const darkMode = ref(prefersDark);

    const toggle = () => {
        darkMode.value = !darkMode.value;
        document.documentElement.classList.toggle('dark');

        localStorage.theme = darkMode.value ? 'dark' : 'light';
    }

    return { darkMode, toggle };
})