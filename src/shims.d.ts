declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

/** Resolved to a data URI at build time by `@rollup/plugin-url` (see extension.config.js). */
declare module '*.woff2' {
	const src: string;
	export default src;
}

declare module '*.css';
