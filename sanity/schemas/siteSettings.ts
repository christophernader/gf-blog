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
            name: 'blogName',
            title: 'Blog Name (Logo)',
            type: 'string',
            description: 'The name shown in the top-left logo (e.g. "my little blog")',
        }),
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
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Twitter / X', value: 'twitter' },
                                    { title: 'TikTok', value: 'tiktok' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'Pinterest', value: 'pinterest' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'GitHub', value: 'github' },
                                    { title: 'Bluesky', value: 'bluesky' },
                                    { title: 'Other (Link)', value: 'link' },
                                ]
                            }
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] })
                        }
                    ],
                    preview: {
                        select: {
                            title: 'platform',
                            subtitle: 'url'
                        }
                    }
                }
            ],
            description: 'Social media icons to display in the hero section',
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
            title: 'About Page Content (Intro)',
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
            description: 'Opening intro paragraph(s) for the about page. Set the tone and welcome readers.',
        }),
        defineField({
            name: 'aboutBio',
            title: 'Author Biography',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
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
            description: 'Your author biography — who you are as a writer. Reference your genre (fiction, romance, fantasy, etc.) and the themes you explore. This reflects your stated brand.',
        }),
        defineField({
            name: 'aboutCredentials',
            title: 'Professional Credentials',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
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
            description: 'Your writing credentials and experience. Include publications, degrees, workshops, or future goals (e.g., "currently pursuing a degree in English," "plans to submit to literary journals").',
        }),
        defineField({
            name: 'aboutBackground',
            title: 'Personal Background',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
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
            description: 'Personal background elements relevant to your writing — life experiences, interests, and expertise that inform your genre and connect with your audience.',
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
