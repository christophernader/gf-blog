import { Studio } from './Studio'

// Ensure the Studio route is excluded from static generation
export const dynamic = 'force-static'

export default function StudioPage() {
    return <Studio />
}
