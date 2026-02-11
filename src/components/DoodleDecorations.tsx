'use client'

import { motion } from 'framer-motion'

// Hand-drawn SVG doodle shapes instead of emojis
const StarDoodle = ({ size = 28 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 3C16.5 10 14 14 3 16C14 17 16.5 21 16 29C17 21 20 17 29 16C20 14 17 10 16 3Z"
            stroke="var(--ink-lighter)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="var(--pastel-lavender)"
            opacity="0.5"
        />
    </svg>
)

const HeartDoodle = ({ size = 26 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 28C16 28 4 20 4 12C4 7 8 4 12 6C14 7 15.5 9 16 10C16.5 9 18 7 20 6C24 4 28 7 28 12C28 20 16 28 16 28Z"
            stroke="var(--ink-lighter)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="var(--pastel-pink)"
            opacity="0.45"
        />
    </svg>
)

const FlowerDoodle = ({ size = 32 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="4" fill="var(--pastel-peach)" stroke="var(--ink-lighter)" strokeWidth="1.2" opacity="0.6" />
        <ellipse cx="16" cy="8" rx="3.5" ry="5" fill="var(--pastel-pink)" stroke="var(--ink-lighter)" strokeWidth="1" opacity="0.4" />
        <ellipse cx="16" cy="24" rx="3.5" ry="5" fill="var(--pastel-pink)" stroke="var(--ink-lighter)" strokeWidth="1" opacity="0.4" />
        <ellipse cx="8" cy="16" rx="5" ry="3.5" fill="var(--pastel-lavender)" stroke="var(--ink-lighter)" strokeWidth="1" opacity="0.4" />
        <ellipse cx="24" cy="16" rx="5" ry="3.5" fill="var(--pastel-lavender)" stroke="var(--ink-lighter)" strokeWidth="1" opacity="0.4" />
        <ellipse cx="10.3" cy="10.3" rx="3.5" ry="5" transform="rotate(-45 10.3 10.3)" fill="var(--pastel-mint)" stroke="var(--ink-lighter)" strokeWidth="1" opacity="0.35" />
        <ellipse cx="21.7" cy="21.7" rx="3.5" ry="5" transform="rotate(-45 21.7 21.7)" fill="var(--pastel-mint)" stroke="var(--ink-lighter)" strokeWidth="1" opacity="0.35" />
    </svg>
)

const CloudDoodle = ({ size = 36 }: { size?: number }) => (
    <svg width={size} height={size * 0.65} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 24C5 24 2 20 4 16C5 13 8 12 11 13C12 8 17 5 22 7C24 3 30 2 34 5C37 2 42 3 44 7C47 9 47 14 44 17C46 20 44 24 40 24Z"
            stroke="var(--ink-lighter)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="var(--pastel-sky)"
            opacity="0.35"
        />
    </svg>
)

const SparkDoodle = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 2L11.5 8L18 10L11.5 12L10 18L8.5 12L2 10L8.5 8Z"
            stroke="var(--ink-lighter)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="var(--pastel-peach)"
            opacity="0.5"
        />
    </svg>
)

// Doodle config with SVG components
const doodles = [
    { Component: FlowerDoodle, top: '8%', left: '4%', delay: 0, size: 34 },
    { Component: StarDoodle, top: '18%', right: '7%', delay: 0.5, size: 26 },
    { Component: HeartDoodle, top: '55%', left: '2.5%', delay: 1, size: 24 },
    { Component: SparkDoodle, top: '72%', right: '4%', delay: 1.5, size: 20 },
    { Component: CloudDoodle, top: '38%', right: '2%', delay: 0.8, size: 40 },
    { Component: SparkDoodle, top: '85%', left: '8%', delay: 2, size: 16 },
    { Component: StarDoodle, top: '45%', left: '6%', delay: 1.2, size: 18 },
]

export function DoodleDecorations() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 1,
                overflow: 'hidden'
            }}
            aria-hidden="true"
        >
            {doodles.map((doodle, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        y: [0, -8, 0, 8, 0],
                        x: [0, 3, 0, -3, 0],
                    }}
                    transition={{
                        opacity: { delay: doodle.delay, duration: 0.8 },
                        scale: { delay: doodle.delay, duration: 0.6, type: 'spring', stiffness: 150, damping: 12 },
                        rotate: { delay: doodle.delay, duration: 0.6 },
                        y: {
                            delay: doodle.delay + 0.8,
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        },
                        x: {
                            delay: doodle.delay + 1,
                            duration: 7 + Math.random() * 4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }
                    }}
                    style={{
                        position: 'absolute',
                        top: doodle.top,
                        left: (doodle as any).left,
                        right: (doodle as any).right,
                    }}
                >
                    <doodle.Component size={doodle.size} />
                </motion.div>
            ))}
        </div>
    )
}
