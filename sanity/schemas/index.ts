import { postSchema } from './post'
import { authorSchema } from './author'
import siteSettings from './siteSettings'

export const schemaTypes = [postSchema, authorSchema, siteSettings]
