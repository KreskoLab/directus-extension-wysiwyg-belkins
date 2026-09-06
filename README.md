# Directus WYSIWYG Interface (standalone)

A standalone Directus **interface extension** that ports the App's built-in WYSIWYG editor
(`input-rich-text-html`) out of the Directus monorepo and into a package you can install, version
and modify independently. It is a faithful copy of the Directus 11.17.4 implementation — same
TinyMCE setup, same custom toolbar buttons, same image/media/link drawers.

It registers under the id `wysiwyg`, so it appears **alongside** the built-in WYSIWYG rather than
replacing it. Existing fields keep using the core interface until you switch them over.

## Features

Everything the core interface does:

- TinyMCE 6 with a configurable toolbar (~45 selectable buttons)
- Custom **image** drawer — pick from the file library or upload, with alt text, lazy loading,
  width/height, and storage asset transformation presets
- Custom **media** drawer — video/audio from the library, or a raw embed
- Custom **link** drawer with display text, tooltip and new-tab toggle, bound to <kbd>⌘/Ctrl</kbd>+<kbd>K</kbd>
- Custom **source code** drawer using the App's code editor
- `Pre` block and inline `code` toggles with sensible Enter/Backspace handling
- Sans-serif / serif / monospace content fonts, matching the active theme
- Custom style formats and arbitrary TinyMCE option overrides
- Soft character limit with a remaining-characters counter
- RTL support, and read-only rendering for the version-comparison view

## Installation

**Marketplace** — search for this extension under Settings → Marketplace and install it.

**Manually** — copy the built `dist` directory into your project's extensions folder:

```
extensions/directus-extension-wysiwyg/
├── package.json
└── dist/index.js
```

Then restart Directus. Set a `text` field's interface to **WYSIWYG (Standalone)**.

## Development

```bash
npm install
npm run dev       # rebuild on change, unminified
npm run build     # production build into dist/
npm run typecheck # vue-tsc over src/
npm run link      # symlink into a local Directus project's extensions folder
```

## How this differs from the in-app source

The App imports freely from its own `@/` alias; an extension bundle cannot. The port keeps the
logic byte-for-byte where possible and swaps only the boundaries:

| In the App | Here |
| --- | --- |
| `import VButton from '@/components/v-button.vue'` (and 14 others) | Dropped — the App registers every `v-*` component globally, so the template resolves them at runtime |
| `@/interfaces/input-code/input-code.vue` | `<interface-input-code>`, registered globally by the App as `interface-<id>` |
| `PrivateViewHeaderBarActionButton` from `@/views/private` | Inlined as the `<VButton icon rounded small><VIcon/></VButton>` it wraps |
| `useServerStore()` / `useSettingsStore()` from `@/stores/*` | `useStores()` from `@directus/extensions-sdk` |
| `i18n.global.t(…)` from `@/lang` | `useI18n()` — each composable is called from `setup()`, so the global composer is in scope |
| `@/utils/*`, `@/composables/use-focusin`, `use-mime-type-filter` | Copied into [`src/utils`](src/utils) and [`src/composables`](src/composables) |
| `useInjectFocusTrapManager` | Re-implemented against the same string injection key, with the App's no-op default |
| `cssVar` from `@directus/utils/browser` | Inlined into [`src/utils/css-var.ts`](src/utils/css-var.ts) |
| `preview.svg?raw` (Vite) | [`src/preview.ts`](src/preview.ts) — the markup as a plain string |
| `.woff2` font imports (Vite) | `@rollup/plugin-url` inlines them as data URIs; see [`extension.config.js`](extension.config.js) |
| `<style lang="scss">` with `@use '@/styles/mixins'` | Plain CSS with the `form-grid` mixin expanded, so no Sass toolchain is needed |

The behaviour is otherwise unchanged.

### Translations

The options panel and drawer labels still use the App's own translation keys
(`$t:wysiwyg_options.*`, `$t:interfaces.input-rich-text-html.*`). Those live in Directus core and
resolve in every locale the App ships, so the extension stays fully translated without bundling its
own messages. The interface's **name** and **description** are literal strings, since those
particular keys belong to the core interface's identity.

### Renaming the interface

Change `id` in [`src/index.ts`](src/index.ts) and rebuild. Setting it to `input-rich-text-html`
would override the built-in WYSIWYG for every field in the project — deliberate, but note that
fields already configured with that id would silently start using this build.

## License

This is a derivative work of the Directus App, which is licensed under the **Business Source
License 1.1** — see [LICENSE](LICENSE). The additional use grant permits production use while your
Total Finances stay under US $5,000,000 over the trailing 12 months; the license converts to GPLv3
three years after the corresponding Directus release. Relicensing this package under a permissive
license is not an option available to you.

TinyMCE 6.8.6 is bundled and is separately MIT licensed.
