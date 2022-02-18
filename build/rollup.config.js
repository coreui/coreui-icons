import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './../package.json'

const plugins = [
  external(),
  resolve(),
  commonjs({
    include: ['../../node_modules/**'],
  }),
]
export default [
  {
    input: 'js/index.esm.js',
    output: {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [...plugins],
  },
  {
    input: 'js/index.js',
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [...plugins],
  },
]