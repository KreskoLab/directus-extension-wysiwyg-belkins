import { inject } from 'vue';

/**
 * Inlined from the Directus App (`@/composables/use-focus-trap-manager`).
 *
 * The App provides this under a plain string key, so injecting it from an extension bundle works
 * across the module boundary. The default makes the composable a no-op when the interface is
 * rendered outside of a focus-trapped container (e.g. a plain form rather than a drawer), which is
 * exactly the App's own behaviour.
 */
const focusTrapManagerSymbol = 'focusTrapManager';

export function useInjectFocusTrapManager() {
	return inject(focusTrapManagerSymbol, {
		pauseFocusTrap: () => {},
		unpauseFocusTrap: () => {},
	});
}
