import { createI18n } from 'vue-i18n';
import en from './en.json';
import no from './no.json';
type MessageSchema = typeof en;

export const i18n = createI18n<{
    message: MessageSchema
}, 'en' | 'no'>
    ({
        locale: import.meta.env.VITE_DEFAULT_LOCALE,
        fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
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