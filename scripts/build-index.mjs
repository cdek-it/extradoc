import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, sep } from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";

export const CATEGORIES = [
  { id: "components", title: "Компоненты" },
  { id: "design-patterns", title: "Дизайн-паттерны" },
  { id: "tokens", title: "Токены" },
];

export async function listMarkdownFiles(docsDir) {
  const out = [];
  for (const cat of CATEGORIES) {
    let entries;
    try {
      entries = await readdir(join(docsDir, cat.id));
    } catch {
      continue;
    }
    for (const f of entries) {
      if (f.endsWith(".md")) out.push(join(docsDir, cat.id, f));
    }
  }
  return out;
}

// Plain-text version of a markdown body for full-text search (markdown
// syntax stripped). Keeps words, drops punctuation/markup.
export function toSearchText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`([^`]*)`/g, "$1") // inline code
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images -> alt
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/<[^>]+>/g, " ") // html tags (iframes etc.)
    .replace(/[#>*_~`|]/g, " ") // markdown punctuation
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
}

export function entryFromFile(filePath, raw) {
  const { data, content } = matter(raw);
  const path = filePath.split(sep).join("/");
  const parts = path.split("/");
  const fallbackCategory = parts[1] ?? "";
  const fallbackSlug = (parts[parts.length - 1] ?? "").replace(/\.md$/, "");
  return {
    slug: data.slug ?? fallbackSlug,
    title: data.title ?? "",
    category: data.category ?? fallbackCategory,
    path,
    figmaKey: data.figmaKey,
    figmaNames: data.figmaNames,
    tags: data.tags,
    description: data.description,
    cover: data.cover,
    popularity: data.popularity,
    searchText: toSearchText(content),
  };
}

export function buildIndex(entries, generatedAt) {
  return { generatedAt, categories: CATEGORIES, docs: entries };
}

async function main() {
  const files = await listMarkdownFiles("docs");
  const entries = [];
  for (const f of files) {
    entries.push(entryFromFile(f, await readFile(f, "utf8")));
  }
  const index = buildIndex(entries, new Date().toISOString());
  await writeFile("index.json", JSON.stringify(index, null, 2) + "\n");
  console.log(`index.json: ${entries.length} docs`);
}

// pathToFileURL handles special characters in the path (e.g. `[`/`]` in a
// folder name) that a raw `file://` + argv concatenation would mis-encode.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
