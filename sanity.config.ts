// Sanity configuration
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'My Blog',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure
    }),
    codeInput()
  ],

  schema: {
    types: schemaTypes,
  },
})
