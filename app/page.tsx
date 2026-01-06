'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import CategoryCarousel from '@/src/components/CategoryCarousel'
import { ProductCard } from '@/src/components/ProductCard'
import { CategoryId } from '@/src/types/category'
import { products } from '@/src/data/products'
import { CartButton } from "@/src/components/CartButton";
import { CartDrawer } from "@/src/components/CartDrawer";
import HeroBanner from '@/src/components/HeroBanner'

export default function Home() {
  const [category, setCategory] = useState<CategoryId>('all')
  const [open, setOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);


  const filteredProducts = useMemo(() => {
    if (category === 'all') return products
    return products.filter(p => p.category === category)
  }, [category])
  useEffect(() => {
    const isFarDown = lastScrollY.current > window.innerHeight;
    const hasNoProducts = filteredProducts.length === 0;

    if (isFarDown && hasNoProducts && carouselRef.current) {
      // Caso crítico: estaba muy abajo y no hay productos
      carouselRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [category, filteredProducts.length]);



  return (
    <main className="pb-24">
      {/* Banner */}
      <HeroBanner />
      {/* Carrusel de categorías */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm" ref={carouselRef}>
        <CategoryCarousel
          selected={category}
          onSelect={(cat) => {
            lastScrollY.current = window.scrollY;
            setCategory(cat);
          }}
        />
      </div>
      <div ref={productsRef} />

      {/* Grid de productos */}
      <section className="px-4 mt-4">
        {filteredProducts.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 text-gray-400">
            <span className="text-4xl mb-4">📦</span>
            <p className="text-lg font-semibold text-white">
              Aún no hay productos en esta categoría
            </p>
            <p className="text-sm mt-2 max-w-md">
              Estamos trabajando para traerte nuevas opciones muy pronto.
              Mientras tanto, puedes explorar otras categorías.
            </p>
          </div>
        )}
      </section>



      {/* UI GLOBAL */}
      <CartButton onClick={() => setOpen(true)} />

      <CartDrawer
        open={open}
        onClose={() => setOpen(false)}
      />
    </main>
  )
}
