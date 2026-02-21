import { defineType, defineField } from 'sanity'

export const wipProjectSchema = defineType({
    name: 'wipProject',
    title: 'WIP Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            description: 'A brief summary highlighting the narrative, drive, and structure of this work. Keep it concise and appealing to your target audience.',
        }),
        defineField({
            name: 'genre',
            title: 'Genre',
            type: 'string',
            description: 'The genre of this work (e.g., "Romance," "Fantasy," "Literary Fiction"). Helps align with your author brand.',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: '🌱 Just Started', value: 'just-started' },
                    { title: '🔨 In Progress', value: 'in-progress' },
                    { title: '✨ Almost Done', value: 'almost-done' },
                ],
                layout: 'radio',
            },
            initialValue: 'just-started',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                },
            ],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                            { title: 'Highlight', value: 'highlight' },
                            { title: 'Code', value: 'code' },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', type: 'string', title: 'Alternative Text' },
                        { name: 'caption', type: 'string', title: 'Caption' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'categories',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'startedAt',
            title: 'Started At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'coverImage',
            status: 'status',
        },
        prepare({ title, media, status }) {
            const statusEmoji: Record<string, string> = {
                'just-started': '🌱',
                'in-progress': '🔨',
                'almost-done': '✨',
            }
            return {
                title,
                media,
                subtitle: statusEmoji[status] || status,
            }
        },
    },
})
