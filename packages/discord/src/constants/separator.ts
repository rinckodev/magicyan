import { createSeparator } from "../functions/components/separator";

/**
 * Predefined separator spacing variants for quick use.
 */
export const Separator = {
    /**
     * Default separator with small spacing and visible divider.
     * Equivalent to: `createSeparator()`
     */
    get Default(){
        return createSeparator();
    },

    /**
     * Separator with large spacing and visible divider.
     * Equivalent to: `createSeparator(true)`
     */
    get Large(){
        return createSeparator(true)
    },
    /**
     * Separator with large spacing and no visible divider.
     * Equivalent to: `createSeparator(true, false)`
     */
    get LargeHidden(){
        return createSeparator(true, false)
    },
    /**
     * Separator with small spacing and no visible divider.
     * Equivalent to: `createSeparator(false, false)`
     */
    get Hidden(){
        return createSeparator(false, false)
    }
} as const;

