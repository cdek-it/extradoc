import { test } from "node:test";
import assert from "node:assert/strict";
import { entryFromFile, buildIndex, CATEGORIES } from "./build-index.mjs";

test("entryFromFile парсит frontmatter и выводит путь с прямыми слэшами", () => {
  const raw = [
    "---",
    "title: Button",
    "category: components",
    "slug: button",
    "figmaKey: abc123",
    "figmaNames: [Button]",
    "tags: [actions, form]",
    "description: Основная кнопка",
    "---",
    "# Button",
    "",
  ].join("\n");
  const entry = entryFromFile("docs/components/button.md", raw);
  assert.equal(entry.slug, "button");
  assert.equal(entry.title, "Button");
  assert.equal(entry.category, "components");
  assert.equal(entry.path, "docs/components/button.md");
  assert.equal(entry.figmaKey, "abc123");
  assert.deepEqual(entry.figmaNames, ["Button"]);
  assert.deepEqual(entry.tags, ["actions", "form"]);
  assert.equal(entry.description, "Основная кнопка");
});

test("entryFromFile подставляет slug и category из пути при отсутствии в frontmatter", () => {
  const entry = entryFromFile("docs/tokens/color.md", "---\ntitle: Color\n---\n");
  assert.equal(entry.slug, "color");
  assert.equal(entry.category, "tokens");
});

test("buildIndex собирает фиксированные категории и переданный generatedAt", () => {
  const index = buildIndex([], "2026-06-17T00:00:00Z");
  assert.equal(index.generatedAt, "2026-06-17T00:00:00Z");
  assert.deepEqual(index.categories, CATEGORIES);
  assert.deepEqual(index.docs, []);
});
