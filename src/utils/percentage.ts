/**
 * Inlined from the Directus App (`@/utils/percentage`).
 */
export const percentage = (value: number, limit: number | undefined): number | null => {
	if (!limit) return null;
	if (!value) return 100;
	return 100 - (value / Number(limit)) * 100;
};
