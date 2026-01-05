"use client";

import { motion } from "framer-motion";

export default function HeroBanner() {
    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.15,
                    },
                },
            }}
            className="relative overflow-hidden"
        >
            {/* Fondo */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

            {/* Glow decorativo */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

            {/* Contenido */}
            <div className="relative px-6 py-10 text-center text-white">
                {/* Logo */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex justify-center mb-4"
                >
                    <img
                        src="/logo-gordotech.png"
                        alt="GordoTech"
                        className="h-14 w-auto"
                    />
                </motion.div>

                {/* Nombre */}
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.45 }}
                    className="text-3xl font-extrabold tracking-wide"
                >
                    GORDOTECH
                </motion.h1>

                {/* Slogan */}
                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.45 }}
                    className="mt-1 text-sm tracking-widest text-gray-300 uppercase"
                >
                    Conectando tus sueños
                </motion.p>

                {/* Separador */}
                <motion.div
                    variants={{
                        hidden: { scaleX: 0, opacity: 0 },
                        visible: { scaleX: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-12 h-1 bg-green-500 mx-auto my-4 rounded-full origin-center"
                />

                {/* Subtexto */}
                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.45 }}
                    className="text-sm text-gray-300 max-w-md mx-auto"
                >
                    Explora nuestro catálogo de tecnología y selecciona los productos
                    que deseas para recibir asesoría personalizada por WhatsApp.
                </motion.p>
            </div>
        </motion.section>
    );
}
