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

            // Regular document types
            S.divider(),
            ...S.documentTypeListItems().filter(
                (listItem) => listItem.getId() !== 'siteSettings'
            ),
        ])
