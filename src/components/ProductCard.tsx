"use client";

import type { MenuItem } from "@/src/lib/menu";
import { useCartStore } from "@/src/store/cart.store";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function ProductCard({ product }: { product: MenuItem }) {
    const addItem = useCartStore((s) => s.addItem);
    const [error, setError] = useState(false);

    return (
        <div className="card shadow-soft flex flex-col gap-3">
            <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
                {!error ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover"
                        onError={() => setError(true)}
                    />
                ) : (
                    <div className="text-gray-400 flex flex-col items-center text-sm">
                        <FontAwesomeIcon icon={faImage} size="lg" />
                        <span className="mt-1">Imagen no disponible</span>
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-primary">
                    {product.name}
                </h3>
                <p className="text-sm text-(--color-muted)">
                    {product.description}
                </p>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-primary">
                    ${product.price.toLocaleString()}
                </span>

                <button
                    onClick={() => addItem(product)}
                    className="
                        bg-secondary
                        px-4 py-2 rounded-lg
                        text-sm font-medium
                        hover:opacity-90
                        transition
                    "
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}
