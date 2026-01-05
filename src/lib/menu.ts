import { BaseItem } from "../types/BaseItem"

export interface MenuItem extends BaseItem {
    description?: string
}

export const menu: MenuItem[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro',
        price: 5200000,
        image: '/iphone15.webp',
        category: 'smartphones',
    },
    {
        id: '2',
        name: 'iPad Air M2',
        price: 4200000,
        image: '/ipadair.webp',
        category: 'tablets',
    },
    {
        id: '3',
        name: 'MacBook Air M3',
        price: 6900000,
        image: '/macbook.webp',
        category: 'laptops',
    },
    {
        id: '12',
        name: 'MacBook Air M3',
        price: 6900000,
        image: '/macbook.webp',
        category: 'laptops',
    },
]
