// types/Product.ts
import { BaseItem } from './BaseItem'

export interface Product extends BaseItem {
    brand?: string
    model?: string
}
