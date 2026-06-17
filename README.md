# extradoc — документация дизайн-системы

Документация компонентов, паттернов и токенов дизайн-системы на стеке **PrimeUI** (PrimeNG · PrimeReact · PrimeVue · React Native 📱). Спецификации компонентов разбиты на две секции: **🎨 для дизайнеров** (анатомия, варианты, размеры, состояния, токены) и **💻 для разработчиков** (API, примеры, кастомизация, отличия фреймворков).

## Структура

```
docs/
  components/        # спецификации компонентов (button.md, ...)
  design-patterns/   # паттерны (empty-states.md, ...)
  tokens/            # токены (color.md, ...)
assets/              # изображения (анатомия и т.п.)
index.json           # генерируется из фронтматтера docs/**
scripts/build-index.mjs   # сборка index.json
COMPONENT-SPEC-TEMPLATE.md # шаблон спецификации компонента
```

Каждый документ в `docs/` начинается с YAML-фронтматтера (`title`, `category`, `slug`, `figmaKey`, `figmaNames`, `tags`, `description`), который парсит `scripts/build-index.mjs` → `index.json` (GitHub Action `build-index.yml`).

## Источники данных

| Секция | Источник |
|---|---|
| 🎨 Для дизайнеров | Figma «UI Kit (DS) v2.0»: оси variant-свойств, размеры, токены |
| 🎨 Токены | `angular-ui-kit/семантическая модель/` (`DESIGNER-GUIDE.md`, `tokens.semantic-*.json`) |
| 💻 Для разработчиков | `angular-ui-kit` (PrimeNG), `vue-ui-kit-3` — API, stories, тесты |

## Как добавить компонент

1. Скопируйте [`COMPONENT-SPEC-TEMPLATE.md`](./COMPONENT-SPEC-TEMPLATE.md) в `docs/components/<slug>.md`.
2. Заполните фронтматтер (обязателен для индексации).
3. Дизайн-секцию — из Figma (component set → variant-оси, размеры, привязки токенов).
4. Секцию разработчиков — из репозиториев (компонент, `*.stories.*`, `*.test.*`).
5. Расхождения дизайн ↔ код фиксируйте в секции «Отличия дизайн ↔ код».
6. Пересоберите индекс: `node scripts/build-index.mjs`.

Пример заполненной спецификации: [`docs/components/button.md`](./docs/components/button.md).
