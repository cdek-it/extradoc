# `<Button>` — спецификация компонента

> Заполненный пример по шаблону `COMPONENT-SPEC-TEMPLATE.md`.
> Данные собраны из Figma «UI Kit (DS) v2.0» и репозиториев `vue-ui-kit-3`, `angular-ui-kit`.

---

## 0. Мета

| Поле | Значение |
|---|---|
| **Название** | `<Button>` |
| **Краткое описание** | Кнопка для запуска действия (отправка формы, переход, подтверждение). Поддерживает текст, иконку, бейдж и состояние загрузки. |
| **Категория** | Button |
| **Статус** | stable (размер `xlarge` — 🚧 beta: только в Figma) |
| **Базовый компонент PrimeUI** | `primeng/button` → `p-button` |

**Доступность по фреймворкам**

| PrimeNG | PrimeReact | PrimeVue | React Native 📱 |
|:---:|:---:|:---:|:---:|
| ✅ | ➖ | ✅ | ➖ |

**Ссылки**

- 🎨 Figma: `<Button.Base>` — `node-id=160:5223` (+ `<Button.Danger/Info/Warning/Success>`)
- 📕 Storybook (Angular): `src/stories/components/button/button.stories.ts`
- 📗 Storybook (Vue): `src/components/base-button/BaseButton.stories.js`
- 📘 Дока PrimeUI: https://primeng.org/button

---

## 1. 🎨 Для дизайнеров

### 1.1. Анатомия
```
┌─────────────────────────────────────┐
│  [icon-prefix]  Label  [icon-postfix]│   ← контейнер (root): bg, border, radius
└─────────────────────────────────────┘        • icon-only: только иконка (квадрат)
                                                • loading: спиннер вместо/перед label
                                                • badge: счётчик в правом верхнем углу
```
Части: **корневой контейнер** · **label (текст)** · **иконка** (prefix/postfix) · **спиннер** (loading) · **badge** (опционально).

### 1.2. Варианты (variants)
Severity вынесена в отдельные component-set'ы, остальные оси — внутри каждого (`<Button.Base>` = 960 вариантов).

| Свойство | Значения | Назначение |
|---|---|---|
| `variant` | `primary` · `secondary` · `tertiary` · `text` · `link` | Визуальный стиль/приоритет |
| severity (отдельные сеты) | Base · `Danger` · `Info` · `Warning` · `Success` | Цветовая семантика действия |
| `state` | `default` · `hover` · `active` · `focus` · `disabled` · `loading` | Состояние |
| `size` | `small` · `base` · `large` · `xlarge`¹ | Размер |
| `rounded` | `false` · `true` | Скруглённые края (пилюля) |
| `icon-position` | `null` · `prefix` · `postfix` | Положение иконки |
| `icon-only` | `false` · `true` | Только иконка (квадратная кнопка) |

¹ `xlarge` существует только в Figma; в API PrimeNG его нет (см. 2.8).

### 1.3. Размеры
Значения из Figma (px):

| Размер | Высота | Padding (V/H) | Gap | Radius | Шрифт (size/line) |
|---|---|---|---|---|---|
| `small` | 30 | 7 / 10.5 | 7 | 10.5 | 12.25 / 15.31 |
| `base` | 35 | 7 / 14 | 7 | 10.5 | 14 / 21 |
| `large` | 49 | 14 / 21 | 10.5 | 14 | 17.5 / 22 |
| `xlarge`¹ | — | — | — | — | через класс `.p-button-xlg` |

### 1.4. Состояния
| Состояние | Описание | Что меняется визуально |
|---|---|---|
| default | Базовое | `bg = green.500`, текст белый |
| hover | Наведение | `bg = green.600` (light) / `green.400` (dark) |
| active / pressed | Нажатие | `bg = green.700` (light) / `green.300` (dark) |
| focus | Фокус с клавиатуры | Фокус-кольцо вокруг контейнера |
| disabled | Недоступна | Приглушённый фон, `pointer-events: none` |
| loading | Выполнение действия | Спиннер (заменяет контент или перед ним) |

### 1.5. Дизайн-токены (семантический слой)
> Роль кнопки действия → группа `color.action.*`. Выбирайте токен по роли, не по цвету (`DESIGNER-GUIDE.md`).

| Элемент / состояние | Свойство | Семантический токен | Значение (light → dark) |
|---|---|---|---|
| Фон default | bg | `color.action.primary.bg.default` | `green.500` → `green.500` |
| Фон hover | bg | `color.action.primary.bg.hover` | `green.600` → `green.400` |
| Фон active | bg | `color.action.primary.bg.active` | `green.700` → `green.300` |
| Текст | color | `color.action.primary.on.text` | `white` → `zinc.900` |
| Граница | border | `color.action.primary.border.default` | `green.200` → `green.800` |

### 1.6. Типографика и иконки
- Шрифт: **TT Fellows**, начертание **DemiBold** (600); base = 14/21px.
- Набор иконок: **Tabler** (`ti ti-*`) — основной; местами PrimeIcons (`pi pi-*`).
- Размер иконки: согласован с размером кнопки (наследует font-size).

### 1.7. Когда использовать / не использовать
**✅ Использовать**
- Для запуска действия: submit, переход к шагу, подтверждение.
- `primary` — главное действие на экране (одно).
- `secondary`/`text`/`link` — второстепенные действия.

**❌ Не использовать**
- Для навигации между страницами без действия — используйте ссылку (`<Link>`).
- Несколько `primary` рядом — теряется иерархия.

### 1.8. Доступность (визуальная)
- Контраст белого текста на `green.500` ≥ 4.5:1.
- Фокус-индикатор обязателен (видимое кольцо в состоянии `focus`).
- Минимальная зона нажатия для тач: 44×44px (для `small`/`icon-only` добавляйте отступ).

---

## 2. 💻 Для разработчиков

### 2.1. Установка / импорт

**Angular (PrimeNG, обёртка `extra-button`)**
```ts
import { ExtraButtonComponent } from '@ui-kit/components/button';
// или напрямую PrimeNG:
import { Button } from 'primeng/button';
```

**Vue**
```ts
// ⚠️ Легаси-компонент, не PrimeVue Button (см. 2.8)
import { CdekButton } from '@/components/base-button';
```

### 2.2. Базовый пример

**Angular**
```html
<!-- Обёртка extra-button (рекомендуется) -->
<extra-button label="Получить код" variant="primary" size="base" />

<!-- Напрямую PrimeNG -->
<p-button label="Submit" icon="ti ti-check" iconPos="left" />
```

**Vue (легаси CdekButton)**
```vue
<CdekButton theme="primary" :small="false">Получить код</CdekButton>
<CdekButton theme="primary" loading>Отправка…</CdekButton>
```

### 2.3. API

#### Inputs / Props — Angular `extra-button`
| Имя | Тип | По умолчанию | Описание |
|---|---|---|---|
| `label` | `string` | `'Button'` | Текст кнопки |
| `variant` | `'primary' \| 'secondary' \| 'outlined' \| 'text' \| 'link'` | `'primary'` | Визуальный стиль |
| `severity` | `'success' \| 'warning' \| 'danger' \| 'info' \| null` | `null` | Цветовая семантика (`warning`→`warn` в PrimeNG) |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер (`xlarge` → класс `p-button-xlg`) |
| `rounded` | `boolean` | `false` | Скруглённые края |
| `iconPos` | `'prefix' \| 'postfix' \| null` | `null` | Положение иконки (`prefix`→`left`, `postfix`→`right`) |
| `iconOnly` | `boolean` | `false` | Только иконка (label скрывается) |
| `icon` | `string` | `''` | Имя иконки (`ti ti-check`) |
| `disabled` | `boolean` | `false` | Отключена |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `badge` / `badgeSeverity` / `showBadge` | `string` / severity / `boolean` | `''` / `null` / `false` | Бейдж на кнопке |
| `fluid` | `boolean` | `false` | Растягивание на ширину контейнера |
| `ariaLabel` | `string?` | `undefined` | ARIA-метка |
| `autofocus` | `boolean` | `false` | Автофокус |
| `tabindex` | `number?` | `undefined` | Порядок табуляции |

#### Props — Vue `CdekButton` (легаси)
| Имя | Тип | По умолчанию | Описание |
|---|---|---|---|
| `theme` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'toaster'` | `'primary'` | Стиль |
| `width` | `'auto' \| 'content'` | `'auto'` | `auto` — на всю ширину; `content` — по контенту |
| `small` | `boolean` | `false` | Высота 36px вместо 48px |
| `disabled` / `loading` | `boolean` | `false` | Состояния |
| `spinnerBefore` | `boolean` | `false` | Спиннер перед контентом, а не вместо |
| `icon` | `boolean` | `false` | Квадратная icon-only кнопка (48×48 / 36×36) |
| `as` | `string` | `'button'` | Тег для рендера |

#### Outputs / Events
| Имя | Payload | Описание |
|---|---|---|
| `(onClick)` (PrimeNG) | `MouseEvent` | Клик по кнопке |
| нативный `click` | `MouseEvent` | Vue: обычный обработчик `@click` |

#### Slots / Content projection
| Имя | Описание |
|---|---|
| default (Vue) | Контент кнопки (текст) |
| `ng-content` (PrimeNG) | Кастомный контент через content projection |

### 2.4. Кастомизация (токены / CSS / pass-through)
- Размер `xlarge` реализован через `styleClass="p-button-xlg"`.
- Высота size в PrimeNG задаётся классами: `large`→`.p-button-lg`, `base`→дефолт, `small`→`.p-button-sm`.
- Vue (легаси): SCSS-переменные `$Primary`, `$Primary_Button_Hover`, `$Primary_Active`, `$Peak`.

### 2.5. Управление состоянием в коде
- `disabled` / `loading` — булевы input'ы, переключаются реактивно.
- Действие — обработчик клика; на время запроса выставляйте `loading=true`.

### 2.6. Доступность (код)
- ARIA: `ariaLabel` (обязателен для `icon-only`), `tabindex`, `autofocus`.
- Клавиатура: активация по `Enter` / `Space` (нативное поведение `<button>`).
- Vue рендерит нативный `<button type="button">` (или тег из `as`).

### 2.7. Тесты / Storybook
- Stories (Angular): `src/stories/components/button/button.stories.ts` + `examples/` (base, sizes, icon, loading, severity, outlined, text, rounded, disabled, badge, extra).
- Stories (Vue): `src/components/base-button/BaseButton.stories.js`.
- Тесты (Vue): `src/components/base-button/BaseButton.test.ts`.

### 2.8. Отличия между фреймворками / дизайн ↔ код
| Аспект | PrimeNG (`extra-button`) | Vue (`CdekButton`) | Примечание |
|---|---|---|---|
| База | PrimeNG `p-button` | Самописный компонент | Vue **не** PrimeVue Button |
| Варианты | `variant` + `severity` | `theme` | Разные модели API |
| Размеры | `small/base/large/xlarge` | `small` (boolean) | Vue — только 2 размера (48/36px) |
| `iconPos` | `prefix/postfix` | `icon` (boolean) | — |

> ⚠️ **Расхождения дизайн ↔ код:**
> - `size="xlarge"` есть в Figma, но **отсутствует в API PrimeNG** — задаётся классом `p-button-xlg` (зафиксировано в описаниях Figma-компонентов).
> - В PrimeNG `severity="warning"` маппится на `warn`.

### 2.9. PrimeReact / React Native 📱
> Локальных репозиториев нет. Заполнить по официальной доке PrimeUI при добавлении поддержки.
