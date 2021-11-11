import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );
      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    // enable run-time checks when not in production
    svelte({ compilerOptions: { dev: !production } }),
    css({ output: 'bundle.css' }), // extract CSS into a separate file

    // aliases for imports
    alias({
      entries: {
        $src: `${__dirname}/src/`,
        $c: `${__dirname}/src/Components/`,
      },
    }),

    // convert CommonJS modules to ES6
    resolve({ browser: true, dedupe: ['svelte'] }),
    commonjs(),

    !production && serve(), // `npm run start` when bundle has been generated
    !production && livereload('public'), // livereload on changes in `public`
    production && terser(), // minify for production
  ],
  watch: {
    clearScreen: false,
  },
};
