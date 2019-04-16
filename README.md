# rich-text-vue-renderer

Vue renderer for the Contentful rich text field type.

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

```javascript
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

<template>
    <RichTextRenderer :document="document" />
</template>
// Will render in Vue as -> <p :key="key">Hello world!</p>
```

```javascript
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

<template>
    <RichTextRenderer :document="document" />
</template>
// Will render in Vue as -> <p :key="key"><b :key="key">Hello</b><u :key="key"> world!</u></p>
```

You can also pass custom renderers for both marks and nodes as an optional parameter like so:

```javascript
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

const renderMarks = {
  [MARKS.BOLD]: (text, key, h) => h('custom-bold', { key: key }, text)
};

const renderNodes = {
  [BLOCKS.PARAGRAPH]: (node, key, h, next) => h('custom-paragraph', { key: key }, next(node.content, key, h, next))
};

<template>
    <RichTextRenderer :document="document" :nodeRenderers="renderNodes" :markRenderers="renderMarks" />
</template>

// Will render in Vue as -> <custom-paragraph :key="key"><custom-bold :key="key">Hello</custom-bold><u :key="key"> world!</u></custom-paragraph>
```

Last, but not least, you can pass a custom rendering component for an embedded entry:

```javascript
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

const renderNode = {
  [BLOCKS.EMBEDDED_ENTRY]: (node, key, h) => h('custom-component', { key: key }, customRenderFunction(node, key))
}

<template>
    <RichTextRenderer :document="document" :nodeRenderers="renderNodes" />
</template>
// -> <custom-component :key="key">(...)Link<'Entry'>(...)</custom-component>
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

## Server Side Rendering
Since this package is using the ESM module syntax, you most likely need to tranpile the package into CommonJS.

### [Nuxt](https://nuxtjs.org/)

You can configure Nuxt to transpile packages from your node_modules in the `nuxt.config.js` by adding it to `build.transpile` like this:

```js
// nuxt.config.js

module.exports = {
  // ...
  build: {
    transpile: ['contentful-rich-text-vue-renderer'],
    // ...
  }
}
```
