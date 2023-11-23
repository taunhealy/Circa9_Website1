import { CollectionConfig } from 'payload/types'

export const PortfolioCards: CollectionConfig = {
  slug: 'cards',
  fields: [
    {
      name: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'Brand',
      type: 'text',
      required: true,
    },
    {
      name: 'Category',
      type: 'text',
      label: 'Category',
      required: true,
    },
    {
      name: 'Director',
      type: 'text',
      label: 'Director',
      required: true,
    },
    {
      name: 'Thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Image',
      required: true,
    },
],
}

export default PortfolioCards;