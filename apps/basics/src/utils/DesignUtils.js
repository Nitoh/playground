export default class DesignUtils {
    static setTheme(isDark) {
        const theme = isDark ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('user-theme', theme)
        return theme
    }

    static toggleTheme(currentIsDark) {
        const nextIsDark = !Boolean(currentIsDark)
        DesignUtils.setTheme(nextIsDark)
        return nextIsDark
    }

    static getSavedTheme() {
        const savedTheme = localStorage.getItem('user-theme')
        return savedTheme === 'dark'
    }
}