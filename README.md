# rich-text-vue-renderer

Vue 3 renderer for the Contentful rich text field type.

## Version 2.x is for Vue 2 support.

## Changelog

See releases page for changelog of versions.

## Installation

Using [npm](http://npmjs.org/):

```sh
npm install contentful-rich-text-vue-renderer
```

Using [yarn](https://yarnpkg.com/):

```sh
yarn add contentful-rich-text-vue-renderer
```

## Usage

```html
<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

const document = {
  nodeType: 'document',
  content: [
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Hello world!',
          marks: [],
        },
      ],
    },
  ],
};

export default {
  data() {
    return {
      document
    };
  }
}
</script>

<template>
    <RichTextRenderer :document="document" />
</template>
<!-- Will render in Vue as -> <p :key="key">Hello world!</p> -->
```

```html
<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

const document = {
  nodeType: 'document',
  content: [
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Hello',
          marks: [{ type: 'bold' }],
        },
        {
          nodeType: 'text',
          value: ' world!',
          marks: [{ type: 'italic' }],
        },
      ],
    },
  ],
};

export default {
  data() {
    return {
      document
    };
  }
}
</script>

<template>
    <RichTextRenderer :document="document" />
</template>
```

You can also pass custom renderers for both marks and nodes as an optional parameter like so:

```html
<script>
import { h } from "vue";
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

const document = {
  nodeType: 'document',
  content: [
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Hello',
          marks: [{ type: 'bold' }]
        },
        {
          nodeType: 'text',
          value: ' world!',
          marks: [{ type: 'italic' }]
        },
      ],
    },
  ]
};

export default {
  data() {
    return {
      document
    };
  },

  methods: {
    renderMarks() {
      return {
        [MARKS.BOLD]: (text, key) => h('custom-bold', { key }, text)
      };
    },
    renderNodes() {
      return {
        [BLOCKS.PARAGRAPH]: (node, key, next) => h('custom-paragraph', { key }, next(node.content, key, next))
      }
    };
  }
}
</script>

<template>
    <RichTextRenderer :document="document" :nodeRenderers="renderNodes()" :markRenderers="renderMarks()" />
</template>
<!-- Will render in Vue as -> <custom-paragraph :key="key"><custom-bold :key="key">Hello</custom-bold><u :key="key"> world!</u></custom-paragraph> -->
```

Last, but not least, you can pass a custom rendering component for an embedded entry:

```html
<script>
import { h } from "vue";
import { BLOCKS } from '@contentful/rich-text-types';
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

const document = {
  nodeType: 'document',
  content: [
    {
      nodeType: 'embedded-entry-block',
      data: {
        target: (...)Link<'Entry'>(...);
      },
    },
  ]
};

// Example function to render an embedded entry in a RichText editor.
// For instance, a react-router link to an entry.
const customEmbeddedEntry = (node, key) => {
  return h('Link', { key, to: 'link to embedded entry' }, 'content for the <Link> component');
};

export default {
  data() {
    return {
      document
    }
  },

  methods: {
    renderNodes() {
      return {
        [BLOCKS.EMBEDDED_ENTRY]: customEmbeddedEntry
      }
    }
  }
}
</script>

<template>
    <RichTextRenderer :document="document" :nodeRenderers="renderNodes()" />
</template>
<!-- Will render as -> <custom-component :key="key">(...)Link<'Entry'>(...)</custom-component> -->
```

The `nodeRenderers` prop should be one of the following `BLOCKS` and `INLINES` properties as defined in [`@contentful/rich-text-types`](https://www.npmjs.com/package/@contentful/rich-text-types):

- `BLOCKS`
  - `DOCUMENT`
  - `PARAGRAPH`
  - `HEADING_1`
  - `HEADING_2`
  - `HEADING_3`
  - `HEADING_4`
  - `HEADING_5`
  - `HEADING_6`
  - `UL_LIST`
  - `OL_LIST`
  - `LIST_ITEM`
  - `QUOTE`
  - `HR`
  - `EMBEDDED_ENTRY`
  - `EMBEDDED_ASSET`
  - `TABLE`
  - `TABLE_ROW`
  - `TABLE_CELL`
  - `TABLE_HEADER_CELL`

- `INLINES`
  - `EMBEDDED_ENTRY` (this is different from the `BLOCKS.EMBEDDED_ENTRY`)
  - `HYPERLINK`
  - `ENTRY_HYPERLINK`
  - `ASSET_HYPERLINK`

The `markRenderers` prop should be one of the following `MARKS` properties as defined in [`@contentful/rich-text-types`](https://www.npmjs.com/package/@contentful/rich-text-types):

- `BOLD`
- `ITALIC`
- `UNDERLINE`
- `CODE`
- `SUBSCRIPT`
- `SUPERSCRIPT`
- `STRIKETHROUGH`
