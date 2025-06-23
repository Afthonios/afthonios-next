import { createDirectus, rest } from '@directus/sdk'

export const directus = createDirectus('https://directus.afthonios.com').with(rest())