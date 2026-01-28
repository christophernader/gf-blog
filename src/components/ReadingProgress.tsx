'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'var(--pastel-pink-dark)',
                transformOrigin: '0%',
                scaleX,
                zIndex: 1000,
                filter: 'url(#jitter-filter)'
            }}
        />
    )
}
