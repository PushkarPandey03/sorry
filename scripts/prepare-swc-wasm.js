const fs = require("fs");
const path = require("path");

const sourceDir = path.join(process.cwd(), "node_modules", "@next", "swc-wasm-nodejs");
const targetDir = path.join(process.cwd(), "node_modules", "next", "wasm", "@next", "swc-wasm-nodejs");
const workerFiles = [
  path.join(process.cwd(), "node_modules", "next", "dist", "build", "index.js"),
  path.join(process.cwd(), "node_modules", "next", "dist", "esm", "build", "index.js"),
];

function patchWorkerFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const original = [
    "        onActivity: ()=>{",
    "            progress == null ? void 0 : progress.run();",
    "        },",
    "        onActivityAbort: ()=>{",
    "            progress == null ? void 0 : progress.clear();",
    "        },",
  ].join("\n");

  if (!source.includes(original)) {
    return false;
  }

  fs.writeFileSync(filePath, source.replace(`${original}\n`, ""));
  return true;
}

if (!fs.existsSync(sourceDir)) {
  console.warn("[prebuild] @next/swc-wasm-nodejs is missing, skipping wasm seeding.");
} else {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });
  console.log("[prebuild] Seeded Next.js wasm SWC fallback.");
}

let patchedCount = 0;
for (const filePath of workerFiles) {
  if (patchWorkerFile(filePath)) {
    patchedCount += 1;
  }
}

if (patchedCount > 0) {
  console.log(`[prebuild] Patched Next.js worker bootstrap in ${patchedCount} file(s).`);
}
