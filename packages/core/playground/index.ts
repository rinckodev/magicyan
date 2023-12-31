import { DeepObjectPath } from "../src";

interface Data {
    cake?: {
        flavors?: Array<{
            name?: string
        }>
    },
    wallet: {
        coins: number;
    }
    inventory?: {
        items: {
            weapons?: {
                amount: number
            }
            potions?: {
                effects: string[]
            },
            shields?: Array<{
                duration?: number
            }>
        }
    }
}
