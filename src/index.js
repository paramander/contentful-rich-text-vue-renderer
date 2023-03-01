import { BLOCKS, MARKS, INLINES, helpers } from "@contentful/rich-text-types";
import { h } from "vue";

const defaultInline = (type, node, key) => {
  return h(
    "span",
    {
      key,
      style: {
        margin: "0px 5px",
        padding: "0 .25rem 0 .75rem",
        border: "1px solid #d3dce0",
        fontFamily: "monospace",
      },
    },
    `inline: ${type}, sys.id: ${node.data.target.sys.id}`
  );
};

const defaultMarkRenderers = {
  [MARKS.BOLD]: (children, key) => h("strong", { key }, children),
  [MARKS.ITALIC]: (children, key) => h("em", { key }, children),
  [MARKS.UNDERLINE]: (children, key) => h("u", { key }, children),
  [MARKS.CODE]: (children, key) => h("code", { key }, children),
  [MARKS.SUPERSCRIPT]: (children, key) => h("sup", { key }, children),
  [MARKS.SUBSCRIPT]: (children, key) => h("sub", { key }, children),
};

const defaultNodeRenderers = {
  [BLOCKS.PARAGRAPH]: (node, key, next) =>
    h("p", { key }, next(node.content, key, next)),
  [BLOCKS.HEADING_1]: (node, key, next) =>
    h("h1", { key }, next(node.content, key, next)),
  [BLOCKS.HEADING_2]: (node, key, next) =>
    h("h2", { key }, next(node.content, key, next)),
  [BLOCKS.HEADING_3]: (node, key, next) =>
    h("h3", { key }, next(node.content, key, next)),
  [BLOCKS.HEADING_4]: (node, key, next) =>
    h("h4", { key }, next(node.content, key, next)),
  [BLOCKS.HEADING_5]: (node, key, next) =>
    h("h5", { key }, next(node.content, key, next)),
  [BLOCKS.HEADING_6]: (node, key, next) =>
    h("h6", { key }, next(node.content, key, next)),
  [BLOCKS.EMBEDDED_ENTRY]: (node, key, next) =>
    h("div", { key }, next(node.content, key, next)),
  [BLOCKS.UL_LIST]: (node, key, next) =>
    h("ul", { key }, next(node.content, key, next)),
  [BLOCKS.OL_LIST]: (node, key, next) =>
    h("ol", { key }, next(node.content, key, next)),
  [BLOCKS.LIST_ITEM]: (node, key, next) =>
    h("li", { key }, next(node.content, key, next)),
  [BLOCKS.QUOTE]: (node, key, next) =>
    h("blockquote", { key }, next(node.content, key, next)),
  [BLOCKS.TABLE]: (node, key, next) =>
    h("table", { key }, next(node.content, key, next)),
  [BLOCKS.TABLE_ROW]: (node, key, next) =>
    h("tr", { key }, next(node.content, key, next)),
  [BLOCKS.TABLE_CELL]: (node, key, next) =>
    h("td", { key }, next(node.content, key, next)),
  [BLOCKS.TABLE_HEADER_CELL]: (node, key, next) =>
    h("th", { key }, next(node.content, key, next)),
  [BLOCKS.HR]: (_node, key) => h("hr", { key }),
  [INLINES.ASSET_HYPERLINK]: (node, key) =>
    defaultInline(INLINES.ASSET_HYPERLINK, node, key),
  [INLINES.ENTRY_HYPERLINK]: (node, key) =>
    defaultInline(INLINES.ENTRY_HYPERLINK, node, key),
  [INLINES.EMBEDDED_ENTRY]: (node, key) =>
    defaultInline(INLINES.EMBEDDED_ENTRY, node, key),
  [INLINES.HYPERLINK]: (node, key, next) => {
    return h(
      "a",
      {
        key,
        href: node.data.uri,
      },
      next(node.content, key, next)
    );
  },
  text: ({ marks, value }, key, markRenderer) => {
    if (!marks.length) {
      return value;
    }

    const marksReversed = [...marks].reverse();
    return marksReversed.reduce(
      (aggregate, mark, i) =>
        markRenderer[mark.type]([aggregate], `${key}-${i}`, h),
      value
    );
  },
};

const renderNodeList = (nodes, key, renderer) => {
  return nodes.map((node, i) => renderNode(node, `${key}-${i}`, renderer));
};

const renderNode = (node, key, renderer) => {
  const nodeRenderer = renderer.node;

  if (helpers.isText(node)) {
    // We're at final tip of node branch, can render text.
    const markerRender = renderer.mark;
    return nodeRenderer.text(node, key, markerRender);
  } else {
    const nextNode = (nodes) => renderNodeList(nodes, key, renderer);
    if (!nodeRenderer) {
      return h("div", { key }, `${key} ;lost nodeRenderer`);
    }
    if (!node.nodeType || !nodeRenderer[node.nodeType]) {
      // TODO: Figure what to return when passed an unrecognized node.
      return h(
        "div",
        { key },
        "(Unrecognized node type) " + (node.nodeType || "empty")
      );
    }
    return nodeRenderer[node.nodeType](node, key, nextNode);
  }
};

const RichText = ({ nodeRenderers, markRenderers, document }) => {
  if (!document) {
    console.warn("No document given to RichText renderer");
    return [];
  }

  const renderer = {
    node: {
      ...defaultNodeRenderers,
      ...nodeRenderers,
    },
    mark: {
      ...defaultMarkRenderers,
      ...markRenderers,
    },
  };

  return renderNodeList(document.content, "RichText-", renderer);
};

RichText.props = ["document", "nodeRenderers", "markRenderers"];

export default RichText;
