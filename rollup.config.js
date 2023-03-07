import typescript from '@rollup/plugin-typescript'
import { readFileSync } from 'node:fs'
import { dirname } from 'node:path'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)))

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: dirname(pkg.main),
        format: 'cjs',
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        exclude: ['**/__tests__/**'],
        sourceMap: false,
        tsconfig: './tsconfig.cjs.json',
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: dirname(pkg.module),
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        exclude: ['**/__tests__/**'],
        sourceMap: false,
        tsconfig: './tsconfig.esm.json',
      }),
    ],
  },
]
