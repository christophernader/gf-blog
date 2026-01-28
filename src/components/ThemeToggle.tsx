'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-label="Toggle theme"
        >
            <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </motion.span>
        </motion.button>
    )
}
