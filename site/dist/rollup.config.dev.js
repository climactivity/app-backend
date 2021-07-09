"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rollupPluginSvelte = _interopRequireDefault(require("rollup-plugin-svelte"));

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _pluginCommonjs = _interopRequireDefault(require("@rollup/plugin-commonjs"));

var _rollupPluginLivereload = _interopRequireDefault(require("rollup-plugin-livereload"));

var _rollupPluginTerser = require("rollup-plugin-terser");

var _sveltePreprocess = _interopRequireDefault(require("svelte-preprocess"));

var _pluginTypescript = _interopRequireDefault(require("@rollup/plugin-typescript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var production = !process.env.ROLLUP_WATCH;

function serve() {
  var server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle: function writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });
      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

var _default = {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [(0, _rollupPluginSvelte["default"])({
    // enable run-time checks when not in production
    dev: !production,
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css: function css(_css) {
      _css.write('bundle.css');
    },
    preprocess: (0, _sveltePreprocess["default"])()
  }), // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  (0, _pluginNodeResolve["default"])({
    browser: true,
    dedupe: ['svelte']
  }), (0, _pluginCommonjs["default"])(), (0, _pluginTypescript["default"])({
    sourceMap: !production,
    inlineSources: !production
  }), // In dev mode, call `npm run start` once
  // the bundle has been generated
  !production && serve(), // Watch the `public` directory and refresh the
  // browser on changes when not in production
  !production && (0, _rollupPluginLivereload["default"])('public'), // If we're building for production (npm run build
  // instead of npm run dev), minify
  production && (0, _rollupPluginTerser.terser)()],
  watch: {
    clearScreen: false
  }
};
exports["default"] = _default;