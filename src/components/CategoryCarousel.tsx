'use client'

import clsx from 'clsx'
import { categories } from '../data/categories'
import { CategoryId } from '../types/category'
import { useEffect, useRef } from "react";

interface Props {
    selected: CategoryId
    onSelect: (category: CategoryId) => void
}

export default function CategoryCarousel({ selected, onSelect }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    useEffect(() => {
        const el = itemRefs.current[selected];
        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [selected]);

    return (
        <div className="w-full  overflow-x-auto scroll-smooth scrollbar-hide">
            <div ref={containerRef} className="flex gap-3 px-4 py-2 min-w-max">
                {categories.map(cat => (
                    <button
                        ref={(el) => {
                            itemRefs.current[cat.id] = el;
                        }}
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={clsx(
                            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-400',
                            selected === cat.id
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
