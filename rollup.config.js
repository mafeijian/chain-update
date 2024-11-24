import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'examples/ThreeViewer.ts',

  output: [
    {
      file: 'dist/threeviewer.js',
      format: 'umd',
      name: 'GraphicsViewer'
    }
  ],

  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    babel(),
    resolve(),
    commonjs(),
    nodeResolve({
      // use "jsnext:main" if possible
      // see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true
    })
  ]
};
