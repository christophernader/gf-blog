'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 400)
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={scrollToTop}
                    className="back-to-top"
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '30px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'var(--pastel-cream)',
                        border: '2px solid var(--ink)',
                        boxShadow: 'var(--shadow-soft)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        zIndex: 998,
                        filter: 'url(#jitter)'
                    }}
                    title="Back to top ↑"
                    aria-label="Scroll back to top"
                >
                    ☁️
                </motion.button>
            )}
        </AnimatePresence>
    )
}
