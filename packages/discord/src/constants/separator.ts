import { createSeparator } from "../functions/components/separator";

/**
 * Predefined separator spacing variants for quick use.
 */
export const Separator = {
    /**
     * Default separator with small spacing and visible divider.
     * Equivalent to: `createSeparator()`
     */
    Default: createSeparator(),

    /**
     * Separator with large spacing and visible divider.
     * Equivalent to: `createSeparator(true)`
     */
    Large: createSeparator(true),

    /**
     * Separator with large spacing and no visible divider.
     * Equivalent to: `createSeparator(true, false)`
     */
    LargeHidden: createSeparator(true, false),

    /**
     * Separator with small spacing and no visible divider.
     * Equivalent to: `createSeparator(false, false)`
     */
    Hidden: createSeparator(false, false),
} as const;