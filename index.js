import { BLOCKS, MARKS, INLINES, helpers } from "@contentful/rich-text-types";

const defaultInline = (type, node, key, h) => {
    return h(
        'span',
        {
            key,
            style: {
                margin: "0px 5px",
                padding: "0 .25rem 0 .75rem",
                border: "1px solid #d3dce0",
                fontFamily: "monospace"
            },
        },
        `inline: ${type}, sys.id: ${node.data.target.sys.id}`
    );
};

const defaultMarkRenderers = {
    [MARKS.BOLD]: (text, key, h) => h('strong', { key }, text),
    [MARKS.ITALIC]: (text, key, h) => h('em', { key }, text),
    [MARKS.UNDERLINE]: (text, key, h) => h('u', { key }, text),
    [MARKS.CODE]: (text, key, h) => h('code', { key }, text)
};

const defaultNodeRenderers = {
    [BLOCKS.PARAGRAPH]: (node, key, h, next) => (
        h('p', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.HEADING_1]: (node, key, h, next) => (
        h('h1', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.HEADING_2]: (node, key, h, next) => (
        h('h2', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.HEADING_3]: (node, key, h, next) => (
        h('h3', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.HEADING_4]: (node, key, h, next) => (
        h('h4', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.HEADING_5]: (node, key, h, next) => (
        h('h5', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.HEADING_6]: (node, key, h, next) => (
        h('h6', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node, key, h, next) => (
        h('div', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.UL_LIST]: (node, key, h, next) => (
        h('ul', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.OL_LIST]: (node, key, h, next) => (
        h('ol', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.LIST_ITEM]: (node, key, h, next) => (
        h('li', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.QUOTE]: (node, key, h, next) => (
        h('blockquote', { key }, next(node.content, key, h, next))
    ),
    [BLOCKS.HR]: (_node, key, _h) => h('hr', { key }, {}),
    [INLINES.ASSET_HYPERLINK]: (node, key, h) =>
        defaultInline(INLINES.ASSET_HYPERLINK, node, key, h),
    [INLINES.ENTRY_HYPERLINK]: (node, key, h) =>
        defaultInline(INLINES.ENTRY_HYPERLINK, node, key, h),
    [INLINES.EMBEDDED_ENTRY]: (node, key, h) =>
        defaultInline(INLINES.EMBEDDED_ENTRY, node, key, h),
    [INLINES.HYPERLINK]: (node, key, h, next) => {
        return h(
            'a',
            {
                key,
                href: node.data.uri
            },
            next(node.content, key, h, next)
        )
    },
    text: ({ marks, value }, key, h, markRenderer) => {
        return marks.length
            ? marks.reduce(
                  (aggregate, mark, i) =>
                      markRenderer[mark.type](aggregate, `${key}-${i}`, h),
                  value
              )
            : value;
    }
};

const renderNodeList = (nodes, key, renderer) => {
    return nodes.map((node, i) => renderNode(node, `${key}-${i}`, renderer));
};

const renderNode = (node, key, renderer) => {
    const nodeRenderer = renderer.node;
    const createElement = renderer.createElement;

    if (helpers.isText(node)) {
        // We're at final tip of node branch, can render text.
        const markerRender = renderer.mark;
        return nodeRenderer.text(node, key, createElement, markerRender);
    } else {
        const nextNode = nodes => renderNodeList(nodes, key, renderer);
        if (!nodeRenderer) {
            return createElement('div', `${key} ;lost nodeRenderer`);
        }
        if (!node.nodeType || !nodeRenderer[node.nodeType]) {
            // TODO: Figure what to return when passed an unrecognized node.
            return "(Unrecognized node type) " + (node.nodeType || "empty");
        }
        return nodeRenderer[node.nodeType](node, key, createElement, nextNode);
    }
};

export default {
    functional: true,

    props: ["document", "nodeRenderers", "markRenderers"],

    render(h, ctx) {
        const renderer = {
            node: {
                ...defaultNodeRenderers,
                ...ctx.props.nodeRenderers
            },
            mark: {
                ...defaultMarkRenderers,
                ...ctx.props.markRenderers
            },
            createElement: h
        };

        return renderNodeList(ctx.props.document.content, "RichText-", renderer);
    }
};
