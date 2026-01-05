"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useCartStore } from "@/src/store/cart.store";
import { buildWhatsAppMessage } from "@/src/lib/whatsapp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { businessConfig } from "../config/business";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
    const items = useCartStore((s) => s.items);
    const removeItem = useCartStore((s) => s.removeItem);
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ y: open ? 0 : "100%" });
    }, [open, controls]);

    const message = buildWhatsAppMessage(items);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-40 bg-black/50
                    transition-opacity duration-300
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                    `}
            />

            {/* Drawer */}
            <motion.div
                className="
                    fixed bottom-0 left-0 right-0 z-50
                    bg-white
                    rounded-t-2xl
                    p-4
                    max-h-[80vh]
                    overflow-y-auto
                "
                initial={{ y: "100%" }}
                animate={controls}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                    if (info.offset.y > 120) onClose();
                    else controls.start({ y: 0 });
                }}
            >
                {/* Handle */}
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />

                <h2 className="text-lg font-bold mb-4">
                    Productos seleccionados
                </h2>

                {items.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-6">
                        No has seleccionado productos
                    </p>
                )}

                <div className="flex flex-col gap-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between text-sm"
                        >
                            <span className="font-medium">{item.name}</span>

                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-500 hover:text-gray-700 transition"
                                aria-label="Eliminar"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </div>

                {items.length > 0 && (
                    <a
                        href={`https://wa.me/${businessConfig.whatsapp.phone}?text=${message}`}
                        target="_blank"
                        className="
                            mt-4
                            flex items-center justify-center gap-2
                            bg-green-600 text-white
                            py-3 rounded-xl font-semibold
                            active:scale-95 transition
                        "
                    >
                        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                        Solicitar información
                    </a>
                )}
            </motion.div>
        </>
    );
}
