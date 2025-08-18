import { serve } from "bun";
import { join, normalize } from "path";
import { readdir } from "fs/promises";

const DIST_DIR = join(process.cwd(), "dist");
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Recursively collect all allowed file paths in dist
async function getAllowedFiles(
  dir: string,
  base: string = "",
): Promise<Set<string>> {
  const allowed = new Set<string>();
  for (const entry of await readdir(dir, {
    withFileTypes: true,
    recursive: true,
  })) {
    const entryPath = join(dir, entry.name);
    const relPath = join(base, entry.name);
    if (entry.isFile()) {
      allowed.add("/" + relPath.replace(/\\/g, "/"));
    } else if (entry.isDirectory()) {
      for (const sub of await getAllowedFiles(entryPath, relPath)) {
        allowed.add(sub);
      }
    }
  }
  return allowed;
}

const allowedFiles = await getAllowedFiles(DIST_DIR);

serve({
  port: PORT,
  fetch(request) {
    const url = new URL(request.url);
    let filePath = url.pathname;
    if (filePath === "/") filePath = "/index.html";
    filePath = normalize(filePath).replace(/\\/g, "/");
    if (!allowedFiles.has(filePath)) {
      return new Response("Not Found", { status: 404 });
    }
    const fullPath = join(DIST_DIR, "." + filePath);
    return new Response(Bun.file(fullPath));
  },
});

console.log(`Static server running at http://localhost:${PORT}`);
console.log(`Allowed files:\n${Array.from(allowedFiles).join("\n")}`);
