import extensions from './mime-extensions.json';

/**
 * Resolve the canonical file extension for a mime type.
 *
 * Inlined from the Directus App (`@/utils/readable-mime-type`), trimmed down to the
 * `extension: true` branch which is all the WYSIWYG interface uses.
 */
export function readableMimeTypeExtension(type: string): string | null {
	return (extensions as Record<string, string>)[type] ?? null;
}
