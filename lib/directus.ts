import { createDirectus, rest } from '@directus/sdk'

// Hier Deine Directus-URL
export const directus = createDirectus('https://directus.afthonios.com').with(rest())