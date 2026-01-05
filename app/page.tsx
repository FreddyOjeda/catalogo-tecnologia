"use client";

import { useState } from "react";
import { menu } from "@/src/lib/menu";
import { ProductCard } from "@/src/components/ProductCard";
import { CartButton } from "@/src/components/CartButton";
import { CartDrawer } from "@/src/components/CartDrawer";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CONTENIDO */}
      <main className="p-4 max-w-md mx-auto pb-24">
        <h1 className="text-2xl font-bold mb-4">
          Menú
        </h1>

        <div className="grid gap-4">
          {menu.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* UI GLOBAL */}
      <CartButton onClick={() => setOpen(true)} />

      <CartDrawer
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
}
