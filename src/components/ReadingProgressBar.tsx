'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export function ReadingProgressBar() {
    // 1. Get raw scroll progress (0 to 1)
    const { scrollYProgress } = useScroll()

    // 2. Smooth it out with spring physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // 3. Transform 0-1 into "0%"-"100%" for width assignment
    const width = useTransform(smoothProgress, (value) => `${value * 100}%`)

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: 6, // Slightly thicker for visibility
                background: 'linear-gradient(90deg, #F0B4C4 0%, #C9A8E8 50%, #8DD4B0 100%)',
                width, // Animating width directly instead of scaleX
                zIndex: 99999, // Ensure it's on top of everything
                boxShadow: '0 2px 10px rgba(201, 168, 232, 0.4)'
            }}
        />
    )
}
