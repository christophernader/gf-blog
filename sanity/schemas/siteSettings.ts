import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    // Singleton - only one document
    // @ts-expect-error - Sanity singleton pattern
    __experimental_actions: ['update', 'publish'],
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title (Before Highlight)',
            type: 'string',
            description: 'Text BEFORE the highlighted part. Example: "welcome to my"',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'heroHighlight',
            title: 'Hero Highlighted Word(s)',
            type: 'string',
            description: 'The word(s) to highlight in pink. Example: "little world" → renders as "welcome to my [little world]"',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 2,
            description: 'Subtitle text below the main title',
        }),
        defineField({
            name: 'aboutTitle',
            title: 'About Page Title',
            type: 'string',
            description: 'Title on the about page (e.g., "hi, i\'m me!")',
        }),
        defineField({
            name: 'aboutEmoji',
            title: 'About Page Emoji',
            type: 'string',
            description: 'Emoji shown in the avatar circle (e.g., 🌸)',
        }),
        defineField({
            name: 'aboutContent',
            title: 'About Page Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Pink Highlight', value: 'highlightPink' },
                            { title: 'Mint Highlight', value: 'highlightMint' },
                            { title: 'Lavender Highlight', value: 'highlightLavender' },
                        ],
                    },
                },
            ],
            description: 'Full content for the about page',
        }),
        defineField({
            name: 'blogPageTitle',
            title: 'Blog Page Title',
            type: 'string',
            description: 'Title shown on the blog listing page',
        }),
        defineField({
            name: 'blogPageSubtitle',
            title: 'Blog Page Subtitle',
            type: 'string',
            description: 'Subtitle shown on the blog listing page',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings',
                subtitle: 'Hero, About, and Blog page content',
            }
        },
    },
})
