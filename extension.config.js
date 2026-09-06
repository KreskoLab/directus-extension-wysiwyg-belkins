import url from '@rollup/plugin-url';

/**
 * The editor's iframe gets its own stylesheet, so the two fonts the App ships for the `serif` and
 * `monospace` options have to travel with the bundle. The App relies on Vite's asset handling for
 * this; the extension build has no asset pipeline, so inline them as data URIs instead.
 * `limit: Infinity` means every matched file is inlined rather than emitted alongside `dist`,
 * which matters because Directus only serves the extension's single entrypoint.
 */
export default {
	plugins: [
		url({
			include: ['**/*.woff2'],
			limit: Infinity,
		}),
	],
};
