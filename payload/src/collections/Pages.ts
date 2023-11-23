import { CollectionConfig } from 'payload/types';

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'myField',
      type: 'text',
    },
    {
      name: 'otherField',
      type: 'checkbox',
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
      ],
    },
  ],
};

export default Pages;