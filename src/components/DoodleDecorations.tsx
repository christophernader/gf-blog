'use client'

import { motion } from 'framer-motion'
import { Interfaces, Objects, Weather } from 'doodle-icons'

const { Star, Heart } = Interfaces
const { Balloon, Crown } = Objects
const { Sunny } = Weather

export function DoodleDecorations() {
    return (
        <>
            {/* Top right floating star */}
            <motion.div
                animate={{
                    y: [0, -12, 0],
                    rotate: [-2, 2, -2]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                style={{
                    position: 'fixed',
                    top: '15%',
                    right: '8%',
                    zIndex: 0,
                    filter: 'url(#jitter-filter)'
                }}
            >
                <Star height={40} width={40} style={{ opacity: 0.25 }} />
            </motion.div>

            {/* Top left sun */}
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                }}
                style={{
                    position: 'fixed',
                    top: '20%',
                    left: '5%',
                    zIndex: 0,
                    filter: 'url(#jitter-filter)'
                }}
            >
                <Sunny height={45} width={45} style={{ opacity: 0.2 }} />
            </motion.div>

            {/* Bottom right heart */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                }}
                style={{
                    position: 'fixed',
                    bottom: '20%',
                    right: '10%',
                    zIndex: 0,
                    filter: 'url(#jitter-filter)'
                }}
            >
                <Heart height={38} width={38} style={{ opacity: 0.25 }} />
            </motion.div>

            {/* Bottom left balloon */}
            <motion.div
                animate={{
                    y: [0, -18, 0],
                    rotate: [-3, 3, -3]
                }}
                transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.8
                }}
                style={{
                    position: 'fixed',
                    bottom: '30%',
                    left: '8%',
                    zIndex: 0,
                    filter: 'url(#jitter-filter)'
                }}
            >
                <Balloon height={42} width={42} style={{ opacity: 0.2 }} />
            </motion.div>

            {/* Middle left crown */}
            <motion.div
                animate={{
                    y: [0, -8, 0],
                    rotate: [-2, 2, -2]
                }}
                transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5
                }}
                style={{
                    position: 'fixed',
                    top: '45%',
                    left: '3%',
                    zIndex: 0,
                    filter: 'url(#jitter-filter)'
                }}
            >
                <Crown height={35} width={35} style={{ opacity: 0.18 }} />
            </motion.div>
        </>
    )
}
