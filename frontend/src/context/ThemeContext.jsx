import {createContext, useEffect, useMemo, useState} from "react";

const THEME_KEY = "promptforge_theme"

export const ThemeContext = createContext(null)

const getPreferredTheme = () => {
    if (typeof window === "undefined") {
        return "light"
    }

    const savedTheme = localStorage.getItem(THEME_KEY)
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
}

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(getPreferredTheme)

    useEffect(() => {
        const root = document.documentElement
        root.classList.toggle("dark", theme === "dark")
        localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    useEffect(() => {
        if (localStorage.getItem(THEME_KEY)) return

        const media = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = (event) => {
            setTheme(event.matches ? "dark" : "light")
        }

        media.addEventListener("change", handleChange)
        return () => media.removeEventListener("change", handleChange)
    }, [])

    const runThemeTransition = (nextTheme) => {
        const root = document.documentElement
        root.setAttribute("data-theme-transition", "true")

        setTheme(nextTheme)

        window.setTimeout(() => {
            root.removeAttribute("data-theme-transition")
        }, 180)
    }

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark"
        runThemeTransition(nextTheme)
    }


    const value = useMemo(() => ({
        theme,
        isDark: theme === "dark",
        setTheme,
        toggleTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )

}