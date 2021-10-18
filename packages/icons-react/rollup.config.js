import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-import-css'
import pkg from './package.json'
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    css(),
    external(),
    resolve(),
    typescript({
      exclude: ['**/__tests__/**'],
      tsconfig: './tsconfig.json',
    }),
    commonjs({
      include: ['../../node_modules/**'],
    }),
  ],
}
