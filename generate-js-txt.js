
/**
 * Auto-generates AEM js.txt from Angular build output.
 * Includes all chunk files like main.js, runtime.js, 123.xxxxx.js etc.
 update the package.json with build:  "&& node scripts/generate-js-txt.js"
 *ui.frontend/angular-apps/script/generate-js-txt.js
 */

const fs = require("fs");
const path = require("path");

const angularDist = path.join(__dirname, "..", "dist", "clientlib-angular");
const jsTxtFile = path.join(
  __dirname,
  "..",
  "..",
  "ui.apps",
  "src",
  "main",
  "content",
  "jcr_root",
  "apps",
  "xdwebsite",
  "clientlibs",
  "clientlib-angular",
  "js.txt"
);

if (!fs.existsSync(angularDist)) {
  console.error("❌ Angular dist folder not found:", angularDist);
  process.exit(1);
}

// read all js from Angular dist folder
const files = fs.readdirSync(angularDist).filter((f) => f.endsWith(".js"));

const lines = files.map((file) => file);

// Ensure js.txt folder exists
fs.mkdirSync(path.dirname(jsTxtFile), { recursive: true });

// Write js.txt
fs.writeFileSync(jsTxtFile, lines.join("\n"), "utf8");

console.log("✅ js.txt generated with files:");
console.log(lines);
