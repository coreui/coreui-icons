import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import pkg from './package.json'

const plugins = [
  external(),
  resolve({
    dedupe: ['vue'],
    extensions: ['.ts', '.json', '.vue'],
  }),
  typescript({
    exclude: ['**/__tests__/**'],
    tsconfig: './tsconfig.json',
  }),
  commonjs({
    include: ['node_modules/**'],
  }),
]

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: pkg.module,
      exports: 'named',
      sourcemap: true,
    },
    plugins: [...plugins, vue()],
  },
  // SSR build.
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: pkg.main,
      exports: 'named',
      sourcemap: true,
    },
    plugins: [...plugins, vue({ template: { optimizeSSR: true } })],
  },
]
