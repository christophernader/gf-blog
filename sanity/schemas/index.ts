import { postSchema } from './post'
import { authorSchema } from './author'
import siteSettings from './siteSettings'
import { wipProjectSchema } from './wipProject'

export const schemaTypes = [postSchema, authorSchema, siteSettings, wipProjectSchema]
