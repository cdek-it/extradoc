---
title: Button
category: components
slug: button
figmaKey: "78978b6676b9ce8c25a312d5fb52ee06805c8fa2"
figmaNames: ["Button", "<Button.Base>", "Button.Base"]
tags: [actions, form]
description: Основная кнопка действия
popularity: 100
---

# Button

Кнопка запускает действие (отправка формы, переход, подтверждение). Поддерживает текст, иконку, бейдж и состояние загрузки. Используйте один primary-вариант на экран.

- **Базовый компонент PrimeUI:** `primeng/button` → `p-button`
- **Статус:** stable (размер `xlarge` — 🚧 только в Figma)
- **Доступность:** PrimeNG ✅ · PrimeVue ✅ · PrimeReact ➖ · React Native 📱 ➖
- **Figma:** `<Button.Base>` `node-id=160:5223` (+ `<Button.Danger/Info/Warning/Success>`)

![Анатомия кнопки](assets/button-anatomy.png)

---

## 🎨 Для дизайнеров

### Анатомия
Части: **корневой контейнер** (bg, border, radius) · **label** · **иконка** (prefix/postfix) · **спиннер** (loading) · **badge** (опционально). В режиме `icon-only` остаётся только иконка (квадратная кнопка).

### Варианты
Severity вынесена в отдельные component-set'ы; остальные оси — внутри каждого (`<Button.Base>` = 960 вариантов).

| Свойство | Значения | Назначение |
|---|---|---|
| `variant` | `primary` · `secondary` · `tertiary` · `text` · `link` | Визуальный стиль/приоритет |
| severity (отд. сеты) | Base · `Danger` · `Info` · `Warning` · `Success` | Цветовая семантика |
| `state` | `default` · `hover` · `active` · `focus` · `disabled` · `loading` | Состояние |
| `size` | `small` · `base` · `large` · `xlarge`¹ | Размер |
| `rounded` | `false` · `true` | Скруглённые края (пилюля) |
| `icon-position` | `null` · `prefix` · `postfix` | Положение иконки |
| `icon-only` | `false` · `true` | Только иконка |

¹ `xlarge` есть только в Figma; в API PrimeNG отсутствует (см. «Отличия дизайн ↔ код»).

### Размеры
Значения из Figma (px):

| Размер | Высота | Padding (V/H) | Gap | Radius | Шрифт (size/line) |
|---|---|---|---|---|---|
| `small` | 30 | 7 / 10.5 | 7 | 10.5 | 12.25 / 15.31 |
| `base` | 35 | 7 / 14 | 7 | 10.5 | 14 / 21 |
| `large` | 49 | 14 / 21 | 10.5 | 14 | 17.5 / 22 |
| `xlarge`¹ | — | — | — | — | через класс `.p-button-xlg` |

### Состояния
| Состояние | Что меняется визуально |
|---|---|
| default | `bg = green.500`, текст белый |
| hover | `bg = green.600` (light) / `green.400` (dark) |
| active | `bg = green.700` (light) / `green.300` (dark) |
| focus | Фокус-кольцо вокруг контейнера |
| disabled | Приглушённый фон, `pointer-events: none` |
| loading | Спиннер (заменяет контент или перед ним) |

### Дизайн-токены (семантический слой)
Роль кнопки действия → группа `color.action.*`. Выбирайте токен по роли, не по цвету (`DESIGNER-GUIDE.md`).

| Элемент / состояние | Свойство | Семантический токен | Значение (light → dark) |
|---|---|---|---|
| Фон default | bg | `color.action.primary.bg.default` | `green.500` → `green.500` |
| Фон hover | bg | `color.action.primary.bg.hover` | `green.600` → `green.400` |
| Фон active | bg | `color.action.primary.bg.active` | `green.700` → `green.300` |
| Текст | color | `color.action.primary.on.text` | `white` → `zinc.900` |
| Граница | border | `color.action.primary.border.default` | `green.200` → `green.800` |

### Типографика и иконки
- Шрифт: **TT Fellows**, DemiBold (600); base = 14/21px.
- Иконки: **Tabler** (`ti ti-*`) — основной набор; местами PrimeIcons (`pi pi-*`).

### Когда использовать / не использовать
**✅ Использовать:** для действия (submit, переход к шагу, подтверждение); `primary` — главное действие на экране (одно); `secondary`/`text`/`link` — второстепенные.

**❌ Не использовать:** для навигации без действия (берите ссылку `<Link>`); несколько `primary` рядом — теряется иерархия.

### Доступность (визуальная)
- Контраст белого текста на `green.500` ≥ 4.5:1.
- Видимый фокус-индикатор в состоянии `focus`.
- Минимальная зона нажатия для тач — 44×44px (для `small`/`icon-only` добавляйте отступ).

---

## 💻 Для разработчиков

### Установка / импорт

```ts
// Angular (PrimeNG, обёртка extra-button — рекомендуется)
import { ExtraButtonComponent } from '@ui-kit/components/button';
import { Button } from 'primeng/button'; // напрямую PrimeNG

// Vue (⚠️ легаси CdekButton, не PrimeVue Button — см. «Отличия»)
import { CdekButton } from '@/components/base-button';
```

### Базовый пример

```html
<!-- Angular -->
<extra-button label="Получить код" variant="primary" size="base" />
<p-button label="Submit" icon="ti ti-check" iconPos="left" />
```

```vue
<!-- Vue (легаси) -->
<CdekButton theme="primary">Получить код</CdekButton>
<CdekButton theme="primary" loading>Отправка…</CdekButton>
```

### API — Angular `extra-button` (Inputs)
| Имя | Тип | По умолчанию | Описание |
|---|---|---|---|
| `label` | `string` | `'Button'` | Текст кнопки |
| `variant` | `'primary' \| 'secondary' \| 'outlined' \| 'text' \| 'link'` | `'primary'` | Визуальный стиль |
| `severity` | `'success' \| 'warning' \| 'danger' \| 'info' \| null` | `null` | Семантика (`warning`→`warn` в PrimeNG) |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер (`xlarge` → класс `p-button-xlg`) |
| `rounded` | `boolean` | `false` | Скруглённые края |
| `iconPos` | `'prefix' \| 'postfix' \| null` | `null` | `prefix`→`left`, `postfix`→`right` |
| `iconOnly` | `boolean` | `false` | Только иконка |
| `icon` | `string` | `''` | Имя иконки (`ti ti-check`) |
| `disabled` | `boolean` | `false` | Отключена |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `badge` / `badgeSeverity` / `showBadge` | `string` / severity / `boolean` | `''` / `null` / `false` | Бейдж |
| `fluid` | `boolean` | `false` | Растягивание по ширине контейнера |
| `ariaLabel` | `string?` | `undefined` | ARIA-метка |
| `autofocus` | `boolean` | `false` | Автофокус |
| `tabindex` | `number?` | `undefined` | Порядок табуляции |

### API — Vue `CdekButton` (легаси, Props)
| Имя | Тип | По умолчанию | Описание |
|---|---|---|---|
| `theme` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'toaster'` | `'primary'` | Стиль |
| `width` | `'auto' \| 'content'` | `'auto'` | `auto` — на всю ширину; `content` — по контенту |
| `small` | `boolean` | `false` | Высота 36px вместо 48px |
| `disabled` / `loading` | `boolean` | `false` | Состояния |
| `spinnerBefore` | `boolean` | `false` | Спиннер перед контентом, а не вместо |
| `icon` | `boolean` | `false` | Квадратная icon-only (48×48 / 36×36) |
| `as` | `string` | `'button'` | Тег для рендера |

### Events / Slots
- **Events:** PrimeNG `(onClick)` → `MouseEvent`; Vue — нативный `@click`.
- **Slots:** Vue — default-слот (контент кнопки); PrimeNG — `ng-content`.

### Кастомизация
- `xlarge` → `styleClass="p-button-xlg"`.
- Высота в PrimeNG задаётся классами: `large`→`.p-button-lg`, `base`→дефолт, `small`→`.p-button-sm`.
- Vue (легаси): SCSS-переменные `$Primary`, `$Primary_Button_Hover`, `$Primary_Active`, `$Peak`.

### Доступность (код)
- ARIA: `ariaLabel` (обязателен для `icon-only`), `tabindex`, `autofocus`.
- Клавиатура: активация по `Enter` / `Space` (нативное поведение `<button>`).

### Тесты / Storybook
- Angular: `src/stories/components/button/button.stories.ts` + `examples/` (base, sizes, icon, loading, severity, outlined, text, rounded, disabled, badge, extra).
- Vue: `src/components/base-button/BaseButton.stories.js`, тесты — `BaseButton.test.ts`.

### Отличия дизайн ↔ код
| Аспект | PrimeNG (`extra-button`) | Vue (`CdekButton`) |
|---|---|---|
| База | PrimeNG `p-button` | Самописный компонент (не PrimeVue) |
| Варианты | `variant` + `severity` | `theme` |
| Размеры | `small/base/large/xlarge` | `small` (boolean), только 48/36px |
| `iconPos` | `prefix/postfix` | `icon` (boolean) |

> ⚠️ `size="xlarge"` есть в Figma, но **отсутствует в API PrimeNG** (задаётся классом `p-button-xlg`) — зафиксировано в описаниях Figma-компонентов. В PrimeNG `severity="warning"` маппится на `warn`.

> **PrimeReact / React Native 📱:** локальных репозиториев нет — заполнить по официальной доке PrimeUI при добавлении поддержки.
