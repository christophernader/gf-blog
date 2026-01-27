'use client'

import { motion } from 'framer-motion'

interface DoodleProps {
    className?: string
}

export function Star({ className = '' }: DoodleProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`doodle doodle-star ${className}`}
        >
            <path
                d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="var(--pastel-cream)"
            />
        </svg>
    )
}

export function Heart({ className = '' }: DoodleProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`doodle doodle-heart ${className}`}
        >
            <path
                d="M12 21C12 21 3 15 3 9C3 6 5.5 3 8.5 3C10.5 3 12 4.5 12 4.5C12 4.5 13.5 3 15.5 3C18.5 3 21 6 21 9C21 15 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="var(--pastel-pink)"
            />
        </svg>
    )
}

export function Sparkle({ className = '' }: DoodleProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`doodle doodle-star ${className}`}
        >
            <path
                d="M12 3V6M12 18V21M3 12H6M18 12H21M5.6 5.6L7.8 7.8M16.2 16.2L18.4 18.4M18.4 5.6L16.2 7.8M7.8 16.2L5.6 18.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
}

export function Flower({ className = '' }: DoodleProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`doodle ${className}`}
            style={{ width: 45, height: 45 }}
        >
            <circle cx="12" cy="12" r="3" fill="var(--pastel-cream)" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="12" cy="6" rx="2.5" ry="3.5" fill="var(--pastel-lavender)" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="12" cy="18" rx="2.5" ry="3.5" fill="var(--pastel-lavender)" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="6" cy="12" rx="3.5" ry="2.5" fill="var(--pastel-lavender)" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="18" cy="12" rx="3.5" ry="2.5" fill="var(--pastel-lavender)" stroke="currentColor" strokeWidth="1" />
        </svg>
    )
}

export function DoodleDecorations() {
    return (
        <>
            {/* Top right floating star */}
            <motion.div
                style={{ position: 'fixed', top: '15%', right: '8%', zIndex: 0 }}
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                <Star />
            </motion.div>

            {/* Top left flower */}
            <motion.div
                style={{ position: 'fixed', top: '20%', left: '5%', zIndex: 0 }}
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                }}
            >
                <Flower />
            </motion.div>

            {/* Bottom right heart */}
            <motion.div
                style={{ position: 'fixed', bottom: '20%', right: '10%', zIndex: 0 }}
                animate={{
                    y: [0, -12, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                }}
            >
                <Heart />
            </motion.div>

            {/* Bottom left sparkle */}
            <motion.div
                style={{ position: 'fixed', bottom: '30%', left: '8%', zIndex: 0 }}
                animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            >
                <Sparkle />
            </motion.div>
        </>
    )
}
