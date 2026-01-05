"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useCartStore } from "@/src/store/cart.store";
import { buildWhatsAppMessage } from "@/src/lib/whatsapp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { businessConfig } from "../config/business";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
    const items = useCartStore((s) => s.items);
    const total = useCartStore((s) => s.total);
    const controls = useAnimation();

    // 🔑 ESTE useEffect ES LA CLAVE
    useEffect(() => {
        if (open) {
            controls.start({ y: 0 });
        } else {
            controls.start({ y: "100%" });
        }
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
                    if (info.offset.y > 120) {
                        onClose();
                    } else {
                        controls.start({ y: 0 });
                    }
                }}
            >
                {/* Handle */}
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />

                <h2 className="text-lg font-bold mb-4">Tu pedido</h2>

                <div className="flex flex-col gap-3">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span>
                                {item.quantity} × {item.name}
                            </span>
                            <span>
                                ${(item.price * item.quantity).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total().toLocaleString()}</span>
                </div>

                <a
                    href={`https://wa.me/${businessConfig.whatsapp.phone}?text=${message}`}
                    target="_blank"
                    className="
                        flex items-center justify-center gap-2
                        bg-green-600 text-white
                        py-3 rounded-xl font-semibold my-2
                        active:scale-95 transition
                    "
                >
                    <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    Confirmar pedido
                </a>
            </motion.div>
        </>
    );
}
