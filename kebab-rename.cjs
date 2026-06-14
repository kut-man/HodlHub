const fs = require("fs");
const path = require("path");

// Target directory
const TARGET_DIR = "./src";

// Any folder names added here will be completely bypassed (files inside won't be touched)
const EXCLUDED_FOLDERS = ["assets"];

// Converts PascalCase, camelCase, and snake_case to kebab-case
function toKebabCase(str) {
  if (!str) return str;
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Transforms individual segments of a path
function transformSegment(segment) {
  if (segment === "." || segment === ".." || !segment) return segment;

  const extIndex = segment.lastIndexOf(".");
  if (extIndex > 0 && extIndex < segment.length - 1) {
    const name = segment.slice(0, extIndex);
    const ext = segment.slice(extIndex);

    const kebabName = name.split(".").map(toKebabCase).join(".");
    return kebabName + ext.toLowerCase();
  }

  return toKebabCase(segment);
}

// Parses and kebab-cases relative import paths and path aliases
function transformImportPath(importPath) {
  // ALLOW relative paths (.) AND your specific path alias (@/)
  const isRelative = importPath.startsWith(".");
  const isAlias = importPath.startsWith("@/");

  if (!isRelative && !isAlias) return importPath;

  // If the import path references an excluded folder (like /assets/), leave it alone
  const segments = importPath.split("/");
  if (segments.some((segment) => EXCLUDED_FOLDERS.includes(segment))) {
    return importPath;
  }

  return segments.map(transformSegment).join("/");
}

// Phase 1: Recursively map out the entire folder structure
function getAllPaths(dir, fileList = [], dirList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Skip the directory completely if it matches our exclusion list
      if (EXCLUDED_FOLDERS.includes(file)) {
        console.log(`   ⏩ Skipping excluded folder: ${fullPath}`);
        continue;
      }

      dirList.push(fullPath);
      getAllPaths(fullPath, fileList, dirList);
    } else {
      fileList.push(fullPath);
    }
  }
  return { fileList, dirList };
}

console.log("🔍 Phase 1: Scanning directory structure...");
const { fileList, dirList } = getAllPaths(TARGET_DIR);

// Phase 2: Update internal import statements inside files
console.log("📝 Phase 2: Updating import statements inside code files...");
const importRegex =
  /((?:from|require\s*\(|import\s*\(|import)\s*['"])([^'"]+)(['"])/g;

for (const filePath of fileList) {
  const ext = path.extname(filePath).toLowerCase();
  if (
    ![".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss", ".vue"].includes(
      ext
    )
  )
    continue;

  let content = fs.readFileSync(filePath, "utf8");
  let hasChanged = false;

  const newContent = content.replace(
    importRegex,
    (match, opening, importPath, closing) => {
      const transformed = transformImportPath(importPath);
      if (transformed !== importPath) {
        hasChanged = true;
        return `${opening}${transformed}${closing}`;
      }
      return match;
    }
  );

  if (hasChanged) {
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`   Updated imports in: ${filePath}`);
  }
}

// Phase 3: Rename actual folders and files on disk
console.log("📂 Phase 3: Renaming files and folders on disk...");
const allPathsToRename = [...fileList, ...dirList].sort(
  (a, b) => b.length - a.length
);

for (const oldPath of allPathsToRename) {
  const dirName = path.dirname(oldPath);
  const baseName = path.basename(oldPath);
  const newBaseName = transformSegment(baseName);

  if (baseName !== newBaseName) {
    const newPath = path.join(dirName, newBaseName);
    fs.renameSync(oldPath, newPath);
    console.log(`   Renamed: ${oldPath} ➡️ ${newPath}`);
  }
}

console.log(
  "✅ Success! All folders, files, and code imports are now kebab-case (excluding assets)."
);
