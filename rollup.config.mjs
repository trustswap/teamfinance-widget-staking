import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import jsx from 'acorn-jsx';
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import image from '@rollup/plugin-image'
import css from 'rollup-plugin-import-css'
import json from '@rollup/plugin-json';

import { exec } from 'child_process'

import copy from 'rollup-plugin-copy'

import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import preserveDirectives from 'rollup-plugin-preserve-directives'

const outputOptions = {
  sourcemap: false,
  preserveModules: true,
  preserveModulesRoot: 'src',
}

const tscAlias = () => {
  return {
    name: 'tsAlias',
    writeBundle: () => {
      return new Promise((resolve, reject) => {
        exec('tsc-alias', function callback(error, stdout, stderr) {
          if (stderr || error) {
            reject(stderr || error)
          } else {
            resolve(stdout)
          }
        })
      })
    },
  }
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        exports: 'auto',
        ...outputOptions,
      },
      {
        dir: 'dist',
        format: 'esm',
        ...outputOptions,
      },
    ],
    external: [
      'react',
      'react-dom',
      '@babel/runtime',
      '@floating-ui/react',
      '@floating-ui/react-dom',
      'tailwind-merge',
      'tslib',
      'react-focus-lock',
      'class-variance-authority',
      'classnames',
      'react-tooltip',
      'microtip',
      'moment',
      'lodash',
      'numbro',
      'react-jazzicon',
      'wagmi',
      'next/image',
      'next/link',
      'client-only',
      'js-sha3',
      'bn.js',
      'bech32',
      'aes-js',
      'scrypt-js',
      'hash.js'
    ],
    acornInjectPlugins: [jsx()],
    plugins: [
      peerDepsExternal(),
      resolve({ modulesOnly: false }),
      commonjs(),
      preserveDirectives(),
      image(),
      css(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/stories/**', '**/tests/**', './styles.css', '**/node_modules/**'],
      }),
      typescriptPaths(),
      tscAlias(),
    ],
    onwarn(warning, warn) {
      if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
        warn(warning)
      }
    },
  },
]
