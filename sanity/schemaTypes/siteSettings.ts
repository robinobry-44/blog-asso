import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Image hero (bannière d\'accueil)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' }),
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche',
      type: 'string',
      description: 'Phrase courte sous le titre principal',
      initialValue: 'Une association citoyenne engagée pour la commune de Trinité-sur-Mer.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Paramètres du site' }),
  },
})
