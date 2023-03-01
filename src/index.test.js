import { h } from "vue";
import { mount } from "@vue/test-utils";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

import RichText from "../src/index.js";

const withDocument = (content) => {
  return {
    nodeType: "document",
    data: {},
    content: content,
  };
};

describe("RichText", () => {
  describe("MARKS", () => {
    describe("consecutive marks", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.PARAGRAPH,
          content: [
            {
              nodeType: "text",
              value: "Hello",
              marks: [{ type: MARKS.BOLD }],
            },
            {
              nodeType: "text",
              value: " world!",
              marks: [{ type: MARKS.ITALIC }],
            },
            {
              nodeType: "text",
              value: 'console.log("yo");',
              marks: [{ type: MARKS.CODE }],
            },
            {
              nodeType: "text",
              value: "Greetings!",
              marks: [{ type: MARKS.UNDERLINE }],
            },
            {
              nodeType: "text",
              value: "Superb!",
              marks: [{ type: MARKS.SUPERSCRIPT }],
            },
            {
              nodeType: "text",
              value: "Subpar",
              marks: [{ type: MARKS.SUBSCRIPT }],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("renders them all in a single paragraph", () => {
        expect(rendered.html()).toBe(
          '<p><strong>Hello</strong><em> world!</em><code>console.log("yo");</code><u>Greetings!</u><sup>Superb!</sup><sub>Subpar</sub></p>'
        );
      });
    });

    describe("overlapping marks", () => {
      const document = withDocument([
        {
          nodeType: "text",
          value: "Hello",
          marks: [
            { type: MARKS.BOLD },
            { type: MARKS.ITALIC },
            { type: MARKS.UNDERLINE },
            { type: MARKS.SUPERSCRIPT },
          ],
        },
        {
          nodeType: "text",
          value: "World",
          marks: [
            { type: MARKS.BOLD },
            { type: MARKS.ITALIC },
            { type: MARKS.UNDERLINE },
            { type: MARKS.SUBSCRIPT },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("renders all overlapping marks in order", () => {
        expect(rendered.html()).toBe("<strong><em><u><sup>Hello</sup></u></em></strong>\n<strong><em><u><sub>World</sub></u></em></strong>");
      });
    });
  });

  describe("BLOCKS", () => {
    describe("PARAGRAPH", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.PARAGRAPH,
          content: [
            {
              nodeType: "text",
              value: "hello world",
              marks: [],
              data: {},
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has a <p> with hello world", () => {
        expect(rendered.html()).toBe("<p>hello world</p>");
      });
    });

    describe("HEADING_1", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.HEADING_1,
          content: [
            {
              nodeType: "text",
              value: "hello world",
              marks: [],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <h1> with 'hello world'", () => {
        expect(rendered.html()).toBe("<h1>hello world</h1>");
      });
    });

    describe("HEADING_2", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.HEADING_2,
          content: [
            {
              nodeType: "text",
              value: "hello world",
              marks: [],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <h2> with 'hello world'", () => {
        expect(rendered.html()).toBe("<h2>hello world</h2>");
      });
    });

    describe("HEADING_3", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.HEADING_3,
          content: [
            {
              nodeType: "text",
              value: "hello world",
              marks: [],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <h3> with 'hello world'", () => {
        expect(rendered.html()).toBe("<h3>hello world</h3>");
      });
    });

    describe("HEADING_4", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.HEADING_4,
          content: [
            {
              nodeType: "text",
              value: "hello world",
              marks: [],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <h4> with 'hello world'", () => {
        expect(rendered.html()).toBe("<h4>hello world</h4>");
      });
    });

    describe("HEADING_5", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.HEADING_5,
          content: [
            {
              nodeType: "text",
              value: "hello world",
              marks: [],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <h5> with 'hello world'", () => {
        expect(rendered.html()).toBe("<h5>hello world</h5>");
      });
    });

    describe("HEADING_6", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.HEADING_6,
          content: [
            {
              nodeType: "text",
              value: "hello world",
              marks: [],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <h6> with 'hello world'", () => {
        expect(rendered.html()).toBe("<h6>hello world</h6>");
      });
    });

    describe("LIST_ITEM", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.LIST_ITEM,
          content: [
            {
              nodeType: "text",
              value: "hello world",
              marks: [],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <li> with 'hello world'", () => {
        expect(rendered.html()).toBe("<li>hello world</li>");
      });
    });

    describe("UL_LIST", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.UL_LIST,
          content: [
            {
              content: [
                {
                  value: "hello",
                  nodeType: "text",
                  marks: [],
                },
              ],
              nodeType: BLOCKS.LIST_ITEM,
            },
            {
              content: [
                {
                  value: "world",
                  nodeType: "text",
                  marks: [],
                },
              ],
              nodeType: BLOCKS.LIST_ITEM,
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <ul> with two list items containing 'hello' and 'world'", () => {
        expect(rendered.html()).toBe(
          "<ul>\n  <li>hello</li>\n  <li>world</li>\n</ul>"
        );
      });
    });

    describe("OL_LIST", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.OL_LIST,
          content: [
            {
              content: [
                {
                  value: "hello",
                  nodeType: "text",
                  marks: [],
                },
              ],
              nodeType: BLOCKS.LIST_ITEM,
            },
            {
              content: [
                {
                  value: "world",
                  nodeType: "text",
                  marks: [],
                },
              ],
              nodeType: BLOCKS.LIST_ITEM,
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <ol> with two list items containing 'hello' and 'world'", () => {
        expect(rendered.html()).toBe(
          "<ol>\n  <li>hello</li>\n  <li>world</li>\n</ol>"
        );
      });
    });

    describe("HR", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.HR,
          content: [],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <hr>", () => {
        expect(rendered.html()).toBe("<hr>");
      });
    });

    describe("QUOTE", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.QUOTE,
          content: [
            {
              value: "hello world",
              nodeType: "text",
              marks: [],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has a <blockquote> with 'hello world'", () => {
        expect(rendered.html()).toBe("<blockquote>hello world</blockquote>");
      });
    });

    describe("EMBEDDED_ENTRY", () => {
      const document = withDocument([
        {
          nodeType: BLOCKS.EMBEDDED_ENTRY,
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              content: [
                {
                  value: "hello world",
                  nodeType: "text",
                  marks: [],
                },
              ],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has a <div> with <p> with 'hello world'", () => {
        expect(rendered.html()).toBe("<div>\n  <p>hello world</p>\n</div>");
      });
    });

    describe("TABLE", () => {
      it("renders tables", () => {
        const document = withDocument([
          {
            nodeType: BLOCKS.TABLE,
            data: {},
            content: [
              {
                nodeType: BLOCKS.TABLE_ROW,
                data: {},
                content: [
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    data: {},
                    content: [
                      {
                        nodeType: BLOCKS.PARAGRAPH,
                        data: {},
                        content: [
                          {
                            nodeType: "text",
                            data: {},
                            marks: [],
                            value: "A 1",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    data: {},
                    content: [
                      {
                        nodeType: BLOCKS.PARAGRAPH,
                        data: {},
                        content: [
                          {
                            nodeType: "text",
                            data: {},
                            marks: [],
                            value: "B 1",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                nodeType: BLOCKS.TABLE_ROW,
                data: {},
                content: [
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    data: {},
                    content: [
                      {
                        nodeType: BLOCKS.PARAGRAPH,
                        data: {},
                        content: [
                          {
                            nodeType: "text",
                            data: {},
                            marks: [],
                            value: "A 2",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    data: {},
                    content: [
                      {
                        nodeType: BLOCKS.PARAGRAPH,
                        data: {},
                        content: [
                          {
                            nodeType: "text",
                            data: {},
                            marks: [],
                            value: "B 2",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]);

        const rendered = mount(RichText, { propsData: { document } });

        expect(rendered.html()).toBe(
          `<table>
  <tr>
    <td>
      <p>A 1</p>
    </td>
    <td>
      <p>B 1</p>
    </td>
  </tr>
  <tr>
    <td>
      <p>A 2</p>
    </td>
    <td>
      <p>B 2</p>
    </td>
  </tr>
</table>`
        );
      });

      it("renders tables with header", () => {
        const document = withDocument([
          {
            nodeType: BLOCKS.TABLE,
            data: {},
            content: [
              {
                nodeType: BLOCKS.TABLE_ROW,
                data: {},
                content: [
                  {
                    nodeType: BLOCKS.TABLE_HEADER_CELL,
                    data: {},
                    content: [
                      {
                        nodeType: BLOCKS.PARAGRAPH,
                        data: {},
                        content: [
                          {
                            nodeType: "text",
                            data: {},
                            marks: [],
                            value: "A 1",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    nodeType: BLOCKS.TABLE_HEADER_CELL,
                    data: {},
                    content: [
                      {
                        nodeType: BLOCKS.PARAGRAPH,
                        data: {},
                        content: [
                          {
                            nodeType: "text",
                            data: {},
                            marks: [],
                            value: "B 1",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                nodeType: BLOCKS.TABLE_ROW,
                data: {},
                content: [
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    data: {},
                    content: [
                      {
                        nodeType: BLOCKS.PARAGRAPH,
                        data: {},
                        content: [
                          {
                            nodeType: "text",
                            data: {},
                            marks: [],
                            value: "A 2",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    nodeType: BLOCKS.TABLE_CELL,
                    data: {},
                    content: [
                      {
                        nodeType: BLOCKS.PARAGRAPH,
                        data: {},
                        content: [
                          {
                            nodeType: "text",
                            data: {},
                            marks: [],
                            value: "B 2",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]);

        const rendered = mount(RichText, { propsData: { document } });

        expect(rendered.html()).toBe(
          `<table>
  <tr>
    <th>
      <p>A 1</p>
    </th>
    <th>
      <p>B 1</p>
    </th>
  </tr>
  <tr>
    <td>
      <p>A 2</p>
    </td>
    <td>
      <p>B 2</p>
    </td>
  </tr>
</table>`
        );
      });
    });
  });

  describe("INLINES", () => {
    describe("HYPERLINK", () => {
      const document = withDocument([
        {
          nodeType: INLINES.HYPERLINK,
          data: {
            uri: "https://example.com",
          },
          content: [
            {
              nodeType: "text",
              value: "go to example",
              marks: [{ type: MARKS.UNDERLINE }],
            },
          ],
        },
      ]);
      const rendered = mount(RichText, { props: { document } });

      it("has an <a> to example.com with underlined text 'go to example'", () => {
        expect(rendered.html()).toBe(
          '<a href="https://example.com"><u>go to example</u></a>'
        );
      });
    });

    describe("overrides", () => {
      describe("EMBEDDED_ENTRY", () => {
        const nodeRenderers = {
          [INLINES.EMBEDDED_ENTRY]: (node, key) =>
            h(
              "a",
              { key: key, href: `/entry/${node.data.target.sys.id}` },
              "go to"
            ),
        };
        const document = withDocument([
          {
            nodeType: INLINES.EMBEDDED_ENTRY,
            data: {
              target: {
                sys: {
                  id: "9mpxT4zsRi6Iwukey8KeM",
                  link: "Link",
                  linkType: "Entry",
                },
              },
            },
          },
        ]);
        const rendered = mount(RichText, {
          props: { document, nodeRenderers },
        });

        it("it has an <a> to the entry id", () => {
          expect(rendered.html()).toBe(
            '<a href="/entry/9mpxT4zsRi6Iwukey8KeM">go to</a>'
          );
        });
      });

      describe("newline to br", () => {
        const nodeRenderers = {
          break: (_node, key) => h("br", key),
          [BLOCKS.PARAGRAPH]: (node, key, next) => {
            const nodeContentWithNewlineBr = node.content.map((childNode) => {
              if (childNode.nodeType === "text") {
                const splittedValue = childNode.value.split("\n");
                return splittedValue
                  .reduce(
                    (aggregate, v, i) => [
                      ...aggregate,
                      { ...childNode, value: v },
                      { nodeType: "break", key: `${key}-br-${i}` },
                    ],
                    []
                  )
                  .slice(0, -1);
              }

              return childNode;
            });

            const updatedNode = {
              ...node,
              content: [].concat.apply([], nodeContentWithNewlineBr),
            };

            return h("p", { key }, next(updatedNode.content, key, next));
          },
        };
        const document = withDocument([
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [
              {
                nodeType: "text",
                value: "hello\n\nworld",
                marks: [],
                data: {},
              },
            ],
          },
        ]);
        const rendered = mount(RichText, {
          props: { document, nodeRenderers },
        });

        it("splits hello world with breaks", () => {
          expect(rendered.html()).toBe("<p>hello<br><br>world</p>");
        });
      });
    });
  });
});
