"use client";

import { useCartStore } from "@/src/store/cart.store";

export function CartButton({ onClick }: { onClick: () => void }) {
    const items = useCartStore((s) => s.items);
    const total = useCartStore((s) => s.total());

    const totalItems = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

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
            "
        >
            <span>{totalItems} items</span>
            <span>${total.toLocaleString()}</span>
        </button>
    );
}
