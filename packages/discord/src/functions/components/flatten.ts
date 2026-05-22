import {
    ComponentType
} from "discord.js";
import { MessageComponentWithId, MessageComponentSource, resolveComponentsSource } from "./utils";

/**
 * Recursively traverses a message component tree and returns a flat array
 * containing all components found in the structure.
 *
 * Supports component sources as a direct component array, an object with
 * a `components` property, or an object containing `message.components`.
 *
 * Nested components inside containers and action rows are traversed
 * recursively. For section components, the accessory component and any
 * nested components are also included in the result.
 *
 * @param source The source containing the message components to flatten.
 * @returns A flat array containing all components found in traversal order.
 */
export function flattenMessageComponents(
    source: MessageComponentSource
): MessageComponentWithId[] {
    const components = resolveComponentsSource(source);

    const hasNested = components.some(component =>
        component.type === ComponentType.Container ||
        component.type === ComponentType.ActionRow ||
        component.type === ComponentType.Section
    );

    if (!hasNested) return components;

    const result: MessageComponentWithId[] = [];

    
    function traverse(items: MessageComponentWithId[]) {
        for (const component of items) {
            result.push(component);

            switch (component.type) {
                case ComponentType.Container:
                case ComponentType.ActionRow:
                    traverse(component.components);
                    break;
                case ComponentType.Section:
                    result.push(component.accessory);

                    if (component.components.length) {
                        traverse(component.components);
                    }
                    break;
            }
        }
    }

    traverse(components);

    return result;
}