import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const member = defineType({
  name: 'member',
  title: "Membre de l'équipe",
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie courte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
})
