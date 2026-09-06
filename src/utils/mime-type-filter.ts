/**
 * Inlined from the Directus App (`@/composables/use-mime-type-filter`).
 *
 * Normalises the project-wide mime type allow list into something that can be handed to an
 * `<input type="file" accept="...">`. A list that permits everything becomes `undefined`.
 */
export function parseGlobalMimeTypeAllowList(allowList: string[] | undefined): string[] | undefined {
	if (!allowList || allowList.length === 0) return undefined;
	if (allowList.length === 1 && allowList[0] === '*/*') return undefined;
	return allowList;
}
