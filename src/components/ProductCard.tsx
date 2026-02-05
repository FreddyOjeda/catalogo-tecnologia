"use client";

import type { MenuItem } from "@/src/lib/menu";
import { useCartStore } from "@/src/store/cart.store";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from 'react-hot-toast';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: MenuItem }) {
    const addItem = useCartStore((s) => s.addItem);
    const [error, setError] = useState(false);
    const items = useCartStore((s) => s.items);
    const isSelected = items.some((i) => i.id === product.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            className="h-full"
        >
            <div className="card shadow-soft flex flex-col gap-3">
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 bg-black flex items-center justify-center">
                    {isSelected && (
                        <span className="
                    absolute top-2 right-2
                    bg-green-600 text-white text-xs
                    px-2 py-1 rounded-full
                ">
                            Seleccionado
                        </span>
                    )}
                    {!error ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-contain"
                            onError={(e) => {
                                e.currentTarget.src = "/logo-gordotech.png";
                            }}
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
                    <p className="text-sm text-(--color-muted) whitespace-pre-line">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <button
                        onClick={() => {
                            const added = addItem(product)

                            if (!added) {
                                toast.error("Este producto ya fue seleccionado");
                            } else {
                                toast.success("Producto agregado a la lista");
                            }
                        }}
                        disabled={isSelected}
                        className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition w-full flex items-center justify-center
                        ${isSelected
                                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                : "bg-gray-200 text-gray-700 hover:opacity-90"
                            }
                    `}
                    >
                        {isSelected ? (
                            <span className="flex items-center gap-2">
                                Seleccionado
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </span>
                        ) : (
                            "Seleccionar"
                        )}
                    </button>

                </div>
            </div>
        </motion.div>
    );
}
