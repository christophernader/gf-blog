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
                height: 4,
                background: 'linear-gradient(90deg, var(--pastel-pink-dark) 0%, var(--pastel-lavender-dark) 40%, var(--pastel-mint-dark) 80%, var(--pastel-sky-dark) 100%)',
                width,
                zIndex: 99999,
                borderRadius: '0 4px 4px 0',
                boxShadow: '0 1px 8px rgba(184, 144, 216, 0.3)',
            }}
        />
    )
}
