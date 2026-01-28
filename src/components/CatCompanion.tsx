'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Sprite sheet: 256x320px = 8 cols x 10 rows
// Each sprite cell is 32x32 pixels
const SPRITE_SIZE = 32
const SHEET_WIDTH = 256
const SHEET_HEIGHT = 320
const SCALE = 4

// Animation Mapping (Rows 0-9)
type CatState =
    | 'idle-1'
    | 'idle-2'
    | 'clean-1'
    | 'clean-2'
    | 'walk'
    | 'run'
    | 'sleep'
    | 'paw'
    | 'jump'
    | 'scared'

interface AnimationConfig {
    row: number
    frames: number
    speed: number
}

const ANIMATIONS: Record<CatState, AnimationConfig> = {
    'idle-1': { row: 0, frames: 4, speed: 500 },
    'idle-2': { row: 1, frames: 4, speed: 500 },
    'clean-1': { row: 2, frames: 4, speed: 400 },
    'clean-2': { row: 3, frames: 4, speed: 400 },
    'walk': { row: 4, frames: 8, speed: 100 },
    'run': { row: 5, frames: 8, speed: 80 },
    'sleep': { row: 6, frames: 4, speed: 800 },
    'paw': { row: 7, frames: 6, speed: 150 },
    'jump': { row: 8, frames: 7, speed: 100 },
    'scared': { row: 9, frames: 8, speed: 120 },
}

interface Heart {
    id: number
    x: number
    y: number
}

export default function CatCompanion() {
    // Positioning & Animation
    const [position, setPosition] = useState(100)
    const [frame, setFrame] = useState(0)
    const [state, setState] = useState<CatState>('idle-1')
    const [direction, setDirection] = useState<'left' | 'right'>('right')
    const [jumpOffset, setJumpOffset] = useState(0)

    // AI State
    const [energy, setEnergy] = useState(100) // 0-100
    const [affection, setAffection] = useState(50) // 0-100
    const [mood, setMood] = useState<'chill' | 'zoomies' | 'sleepy' | 'curious'>('chill')
    const [isActing, setIsActing] = useState(false)
    const [hearts, setHearts] = useState<Heart[]>([])

    // Refs for non-reactive state access in loops
    const mouseX = useRef(0)
    const catStateRef = useRef(state)
    const positionRef = useRef(position)

    const currentAnim = ANIMATIONS[state]

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.current = e.clientX
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Sync refs
    useEffect(() => {
        catStateRef.current = state
        positionRef.current = position
    }, [state, position])

    // Main AI Loop - The "Brain"
    useEffect(() => {
        const brainLoop = setInterval(() => {
            if (isActing) return

            // 1. Determine Mood based on stats
            if (energy < 20) setMood('sleepy')
            else if (energy > 80 && Math.random() > 0.7) setMood('zoomies')
            else if (Math.random() > 0.6) setMood('curious')
            else setMood('chill')

            // 2. Decide Action based on Mood
            const roll = Math.random()

            if (mood === 'sleepy') {
                setState('sleep')
                setEnergy(prev => Math.min(prev + 5, 100)) // Recharge
            }
            else if (mood === 'zoomies') {
                setState('run')
                // Run random direction
                setDirection(Math.random() > 0.5 ? 'right' : 'left')
                setEnergy(prev => Math.max(prev - 10, 0)) // Drain energy
            }
            else if (mood === 'curious') {
                // Follow mouse or explore
                const distToMouse = mouseX.current - positionRef.current

                if (Math.abs(distToMouse) > 100) {
                    setState('walk')
                    setDirection(distToMouse > 0 ? 'right' : 'left')
                    setEnergy(prev => Math.max(prev - 2, 0))
                } else {
                    // Close to mouse? clean or idle
                    setState(Math.random() > 0.5 ? 'clean-1' : 'idle-1')
                }
            }
            else { // chill
                if (roll < 0.3) setState('idle-1')
                else if (roll < 0.6) setState('idle-2')
                else if (roll < 0.8) setState('clean-2')
                else setState('walk') // Just a bit of walking
            }

        }, 2000) // Think every 2 seconds

        return () => clearInterval(brainLoop)
    }, [mood, isActing, energy, affection])

    // Physics/Animation Loop
    useEffect(() => {
        const physicsLoop = setInterval(() => {
            // Frame animation
            setFrame(f => f + 1)

            // Movement Physics
            if (catStateRef.current === 'walk' || catStateRef.current === 'run') {
                const speed = catStateRef.current === 'run' ? 8 : 3
                const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000

                setPosition(prev => {
                    let next = prev
                    if (direction === 'right') next += speed
                    else next -= speed

                    // Boundary checks & Turn around
                    if (next > windowWidth - 50) {
                        setDirection('left')
                        return prev
                    }
                    if (next < 20) {
                        setDirection('right')
                        return prev
                    }
                    return next
                })
            }
        }, currentAnim.speed / (state === 'run' ? 1.5 : 1)) // smoother physics for running

        return () => clearInterval(physicsLoop)
    }, [state, direction, currentAnim])

    // Action Cooldown Manager
    useEffect(() => {
        if (isActing) {
            const duration = currentAnim.frames * currentAnim.speed
            const timer = setTimeout(() => {
                setIsActing(false)
                setState('idle-1')
                setJumpOffset(0)
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [isActing, state, currentAnim])

    // Jump Physics Animation
    useEffect(() => {
        if (state !== 'jump') return
        const startTime = Date.now()
        const duration = 7 * 100 // 7 frames * 100ms

        const jumpPhysics = setInterval(() => {
            const elapsed = Date.now() - startTime
            const p = Math.min(elapsed / duration, 1)
            // Parabola
            setJumpOffset(Math.max(0, 150 * 4 * p * (1 - p)))
            if (p >= 1) clearInterval(jumpPhysics)
        }, 16)
        return () => clearInterval(jumpPhysics)
    }, [state])

    // Interaction Handler
    const handlePet = () => {
        if (isActing) return

        setIsActing(true)
        setAffection(prev => Math.min(prev + 10, 100))
        setEnergy(prev => Math.min(prev + 5, 100)) // Petting gives energy!

        // Spawn Hearts
        const newHearts = Array.from({ length: 3 }).map((_, i) => ({
            id: Date.now() + i,
            x: (Math.random() - 0.5) * 60,
            y: -20 - Math.random() * 50
        }))
        setHearts(prev => [...prev, ...newHearts])

        // Clean up hearts
        setTimeout(() => {
            setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)))
        }, 1000)

        // Random Reaction
        const roll = Math.random()
        if (roll < 0.4) setState('paw') // High five!
        else if (roll < 0.7) setState('jump') // Jump for joy
        else setState('clean-1') // Grooming
    }

    const spritePos = () => {
        const animFrame = frame % currentAnim.frames
        return {
            x: animFrame * SPRITE_SIZE,
            y: currentAnim.row * SPRITE_SIZE
        }
    }

    const pos = spritePos()
    const size = SPRITE_SIZE * SCALE

    return (
        <div style={{ position: 'fixed', bottom: `${20 + jumpOffset}px`, left: `${position}px`, zIndex: 1000, transition: 'bottom 0.05s linear' }}>
            {/* Hearts Container */}
            <AnimatePresence>
                {hearts.map(heart => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: heart.y, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '0',
                            marginLeft: heart.x,
                            fontSize: '2rem',
                            pointerEvents: 'none'
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* The Cat */}
            <div
                onClick={handlePet}
                className="cursor-pointer hover:brightness-110 active:scale-95 transition-all"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundImage: 'url(/cat-sprite.png)',
                    backgroundPosition: `-${pos.x * SCALE}px -${pos.y * SCALE}px`,
                    backgroundSize: `${SHEET_WIDTH * SCALE}px ${SHEET_HEIGHT * SCALE}px`,
                    imageRendering: 'pixelated',
                    // Sprite faces Right by default.
                    // Walk Left -> Flip (180deg). Walk Right -> Normal (0deg).
                    transform: `rotateY(${direction === 'left' ? 180 : 0}deg)`,
                    filter: 'drop-shadow(4px 4px 0 rgba(0,0,0,0.1))'
                }}
                title={`Mood: ${mood} | Energy: ${Math.floor(energy)}% | Loves you: ${Math.floor(affection)}%`}
            />

            {/* Thought Bubble (Optional - only when sleeping or very curious) */}
            {mood === 'sleepy' && state === 'sleep' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-8 right-0 bg-white border-2 border-black rounded-full px-3 py-1 font-bold text-xs"
                >
                    zzz...
                </motion.div>
            )}
        </div>
    )
}
