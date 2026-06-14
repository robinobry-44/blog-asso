import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    // Identité
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
      description: 'Phrase courte affichée dans les résultats de recherche Google.',
    }),

    // Hero
    defineField({
      name: 'heroImage',
      title: 'Image bannière hero',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' }),
      ],
    }),
    defineField({
      name: 'heroTitle',
      title: 'Titre du hero',
      type: 'string',
      description: 'Titre principal affiché sur la bannière d\'accueil.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sous-titre du hero',
      type: 'string',
      description: 'Phrase d\'accroche sous le titre.',
    }),

    // Apparence
    defineField({
      name: 'primaryColor',
      title: 'Couleur principale',
      type: 'string',
      description: 'Code hexadécimal, ex : #1B6BB5',
    }),

    // Contact
    defineField({
      name: 'contactEmail',
      title: 'Email de contact',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Paramètres du site' }),
  },
})
