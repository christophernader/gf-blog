'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

// Use useLayoutEffect on client, useEffect for SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function ScrollToTop() {
    const pathname = usePathname()

    useIsomorphicLayoutEffect(() => {
        // Force scroll to top on route change
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [pathname])

    return null
}
