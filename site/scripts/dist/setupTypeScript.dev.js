"use strict";

// @ts-check

/** This script modifies the project to support TS code in .svelte files like:

  <script lang="ts">
  	export let name: string;
  </script>
 
  As well as validating the code for CI.
  */

/**  To work on this script:
  rm -rf test-template template && git clone sveltejs/template test-template && node scripts/setupTypeScript.js test-template
*/
var fs = require("fs");

var path = require("path");

var _require = require("process"),
    argv = _require.argv;

var projectRoot = argv[2] || path.join(__dirname, ".."); // Add deps to pkg.json

var packageJSON = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));
packageJSON.devDependencies = Object.assign(packageJSON.devDependencies, {
  "svelte-check": "^1.0.0",
  "svelte-preprocess": "^4.0.0",
  "@rollup/plugin-typescript": "^6.0.0",
  "typescript": "^3.9.3",
  "tslib": "^2.0.0",
  "@tsconfig/svelte": "^1.0.0"
}); // Add script for checking

packageJSON.scripts = Object.assign(packageJSON.scripts, {
  "validate": "svelte-check"
}); // Write the package JSON

fs.writeFileSync(path.join(projectRoot, "package.json"), JSON.stringify(packageJSON, null, "  ")); // mv src/main.js to main.ts - note, we need to edit rollup.config.js for this too

var beforeMainJSPath = path.join(projectRoot, "src", "main.js");
var afterMainTSPath = path.join(projectRoot, "src", "main.ts");
fs.renameSync(beforeMainJSPath, afterMainTSPath); // Switch the app.svelte file to use TS

var appSveltePath = path.join(projectRoot, "src", "App.svelte");
var appFile = fs.readFileSync(appSveltePath, "utf8");
appFile = appFile.replace("<script>", '<script lang="ts">');
appFile = appFile.replace("export let name;", 'export let name: string;');
fs.writeFileSync(appSveltePath, appFile); // Edit rollup config

var rollupConfigPath = path.join(projectRoot, "rollup.config.js");
var rollupConfig = fs.readFileSync(rollupConfigPath, "utf8"); // Edit imports

rollupConfig = rollupConfig.replace("'rollup-plugin-terser';", "'rollup-plugin-terser';\nimport sveltePreprocess from 'svelte-preprocess';\nimport typescript from '@rollup/plugin-typescript';"); // Replace name of entry point

rollupConfig = rollupConfig.replace("'src/main.js'", "'src/main.ts'"); // Add preprocess to the svelte config, this is tricky because there's no easy signifier.
// Instead we look for `css:` then the next `}` and add the preprocessor to that

var foundCSS = false;
var match; // https://regex101.com/r/OtNjwo/1

var configEditor = new RegExp(/css:.|\n*}/gmi);

while ((match = configEditor.exec(rollupConfig)) != null) {
  if (foundCSS) {
    var endOfCSSIndex = match.index + 1;
    rollupConfig = rollupConfig.slice(0, endOfCSSIndex) + ",\n			preprocess: sveltePreprocess()," + rollupConfig.slice(endOfCSSIndex);
    break;
  }

  if (match[0].includes("css:")) foundCSS = true;
} // Add TypeScript


rollupConfig = rollupConfig.replace('commonjs(),', 'commonjs(),\n\t\ttypescript({\n\t\t\tsourceMap: !production,\n\t\t\tinlineSources: !production\n\t\t}),');
fs.writeFileSync(rollupConfigPath, rollupConfig); // Add TSConfig

var tsconfig = "{\n  \"extends\": \"@tsconfig/svelte/tsconfig.json\",\n\n  \"include\": [\"src/**/*\"],\n  \"exclude\": [\"node_modules/*\", \"__sapper__/*\", \"public/*\"]\n}";
var tsconfigPath = path.join(projectRoot, "tsconfig.json");
fs.writeFileSync(tsconfigPath, tsconfig); // Delete this script, but not during testing

if (!argv[2]) {
  // Remove the script
  fs.unlinkSync(path.join(__filename)); // Check for Mac's DS_store file, and if it's the only one left remove it

  var remainingFiles = fs.readdirSync(path.join(__dirname));

  if (remainingFiles.length === 1 && remainingFiles[0] === '.DS_store') {
    fs.unlinkSync(path.join(__dirname, '.DS_store'));
  } // Check if the scripts folder is empty


  if (fs.readdirSync(path.join(__dirname)).length === 0) {
    // Remove the scripts folder
    fs.rmdirSync(path.join(__dirname));
  }
} // Adds the extension recommendation


fs.mkdirSync(path.join(projectRoot, ".vscode"));
fs.writeFileSync(path.join(projectRoot, ".vscode", "extensions.json"), "{\n  \"recommendations\": [\"svelte.svelte-vscode\"]\n}\n");
console.log("Converted to TypeScript.");

if (fs.existsSync(path.join(projectRoot, "node_modules"))) {
  console.log("\nYou will need to re-run your dependency manager to get started.");
}