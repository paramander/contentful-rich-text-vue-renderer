import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support

export default (outputFile, overrides = {}) => ({
    input: 'src/index.js', // Path relative to package.json
    output: [{
        file: outputFile,
        exports: 'named',
        name: 'ContentfulRichText',
    }],
    plugins: [
        buble({ objectAssign: 'Object.assign' }), // Transpile to ES5
    ],
    ...overrides,
});
