import { onMounted } from 'vue';

export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'chat_ui_theme_mode';
const THEME_ATTR = 'data-theme';

const applyThemeToDocument = (theme: ThemeMode) => {
    if (!import.meta.client) return;

    const root = document.documentElement;
    root.setAttribute(THEME_ATTR, theme);
    root.style.colorScheme = theme;
};

const resolveInitialTheme = (): ThemeMode => {
    if (!import.meta.client) return 'light';

    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useTheme = () => {
    const theme = useState<ThemeMode>('theme-mode', () => 'light');
    const initialized = useState<boolean>('theme-initialized', () => false);

    const setTheme = (nextTheme: ThemeMode) => {
        theme.value = nextTheme;
        applyThemeToDocument(nextTheme);

        if (import.meta.client) {
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        }
    };

    const toggleTheme = () => {
        setTheme(theme.value === 'light' ? 'dark' : 'light');
    };

    onMounted(() => {
        if (initialized.value) {
            applyThemeToDocument(theme.value);
            return;
        }

        const initialTheme = resolveInitialTheme();
        theme.value = initialTheme;
        applyThemeToDocument(initialTheme);
        initialized.value = true;
    });

    return {
        theme,
        setTheme,
        toggleTheme
    };
};
