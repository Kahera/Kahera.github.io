import { createI18n } from 'vue-i18n';
import { watch } from 'vue';
import en from './en.json';
import no from './no.json';
type MessageSchema = typeof en;

function initialLocale(): 'en' | 'no' {
    const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE === 'no' ? 'no' : 'en';
    try {
        const savedLocale = localStorage.getItem('locale');
        return savedLocale === 'en' || savedLocale === 'no' ? savedLocale : defaultLocale;
    } catch {
        return defaultLocale;
    }
}

export const i18n = createI18n<{
    message: MessageSchema
}, 'en' | 'no', false>
    ({
        locale: initialLocale(),
        fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE === 'no' ? 'no' : 'en',
        datetimeFormats: {
            'en': {
                month: {
                    month: 'long', year: '2-digit'
                },
                short: {
                    year: 'numeric', month: 'short', day: 'numeric',
                }
            },
            'no': {
                month: {
                    month: 'long', year: '2-digit'
                },
                short: {
                    year: 'numeric', month: 'short', day: 'numeric',
                }
            }
        },
        legacy: false,
        globalInjection: true,
        messages: {
            en,
            no
        }
    });

watch(i18n.global.locale, (locale) => {
    document.documentElement.lang = locale === 'no' ? 'nb' : 'en';
    try {
        localStorage.setItem('locale', locale);
    } catch {
        return;
    }
}, { immediate: true });