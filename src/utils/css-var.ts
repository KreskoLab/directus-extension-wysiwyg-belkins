/**
 * Get the value of a globally registered CSS variable.
 *
 * Inlined from `@directus/utils/browser` so the extension has no runtime dependency on it.
 */
export function cssVar(name: string, element: Element = document.body): string {
	return getComputedStyle(element ?? document.body)
		.getPropertyValue(name)
		.trim();
}
