import { type StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Blog Content')
        .items([
            // Singleton: Site Settings
            S.listItem()
                .title('Site Settings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                ),

            S.divider(),

            // Blog Posts
            S.documentTypeListItem('post').title('Blog Posts'),

            // WIP Projects
            S.documentTypeListItem('wipProject').title('WIP Projects'),

            // Authors
            S.documentTypeListItem('author').title('Authors'),
        ])
