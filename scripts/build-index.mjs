import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, sep } from "node:path";
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

export function entryFromFile(filePath, raw) {
  const { data } = matter(raw);
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

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
