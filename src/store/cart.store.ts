import { create } from "zustand"
import { MenuItem } from "../lib/menu"

export type CartItem = MenuItem & {
    quantity: number
}

type CartState = {
    items: CartItem[]
    addItem: (item: MenuItem) => void
    clear: () => void
    total: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (item) => {
        set((state) => {
            const existing = state.items.find(i => i.id === item.id)

            if (existing) {
                return {
                    items: state.items.map(i =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    )
                }
            }

            return {
                items: [...state.items, { ...item, quantity: 1 }]
            }
        })
    },

    clear: () => set({ items: [] }),

    total: () =>
        get().items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )
}))
