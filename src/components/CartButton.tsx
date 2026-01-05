"use client";

import { useCartStore } from "@/src/store/cart.store";

export function CartButton({ onClick }: { onClick: () => void }) {
    const items = useCartStore((s) => s.items);

    const totalItems = items.length;

    if (totalItems === 0) return null;

    return (
        <button
            onClick={onClick}
            className="
                fixed bottom-4 left-1/2 -translate-x-1/2
                w-[calc(100%-2rem)]
                max-w-md
                bg-white
                px-4 py-3 rounded-xl
                shadow-soft
                flex items-center justify-between
                font-semibold
                z-40
            "
        >
            <span>{totalItems} producto{totalItems > 1 ? "s" : ""} seleccionado{totalItems > 1 ? "s" : ""}</span>
        </button>
    );
}
