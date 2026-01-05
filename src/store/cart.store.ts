import { create } from "zustand"
import { MenuItem } from "../lib/menu"

type CartState = {
    items: MenuItem[]
    addItem: (item: MenuItem) => boolean // devuelve si se agregó o no
    removeItem: (id: string) => void
    clear: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (item) => {
        const exists = get().items.some(i => i.id === item.id)
        if (exists) return false

        set({ items: [...get().items, item] })
        return true
    },

    removeItem: (id) =>
        set({ items: get().items.filter(i => i.id !== id) }),

    clear: () => set({ items: [] }),
}))
