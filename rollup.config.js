import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support

export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'ContentfulRichText',
        exports: 'named',
    },
    plugins: [
        buble({ objectAssign: 'Object.assign' }), // Transpile to ES5
    ],
};
