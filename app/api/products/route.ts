import { NextResponse } from "next/server";
import { Product } from "@/src/types/product";
import Papa from "papaparse";

function normalize(text: string) {
    return text
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}

export function parseCSV(csv: string, category: string): Product[] {
    const parsed = Papa.parse<Record<string, string>>(csv, {
        header: true,
        skipEmptyLines: true,
        transform: (value) =>
            typeof value === "string"
                ? value.trim().replace(/\s+/g, " ")
                : value,
    });

    if (parsed.errors.length) {
        console.error("CSV parse errors:", parsed.errors);
    }

    const productMap = new Map<string, {
        name: string;
        storages: Set<string>;
        price: number;
    }>();

    for (const row of parsed.data) {
        // 🔹 Nombre del producto según hoja
        const name =
            row["Dispositivo"] ||
            row["Nombre"];

        if (!name) continue;

        const key = normalize(name);

        // 🔹 Almacenamiento solo aplica a iPhones / iPads
        const storage = row["Almacenamiento"];

        const price = Number(row["Precio"]) || 0;

        if (!productMap.has(key)) {
            productMap.set(key, {
                name,
                storages: new Set(),
                price,
            });
        }

        if (storage) {
            productMap.get(key)!.storages.add(storage);
        }
    }

    // 🔹 Convertimos el map en productos finales
    return Array.from(productMap.values()).map((item, index) => ({
        id: `${category}-${index + 1}`,
        name: item.name,
        description:
            item.storages.size > 0
                ? `${Array.from(item.storages).join(", ")}`
                : "",
        price: item.price,
        category,
        image: getProductImage(item.name) ?? "/logo-gordotech.png",
        available: true,
    }));
}
// ✅ URLs CSV (una por hoja)
const SHEETS = [
    {
        category: "iphones-nuevos",
        url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xLxp0RBPLAuhi202uxuww2jWhBgx3sm1MGKE4NQN5wntT2W8Ngg9kcO67CD8X1SlbLyZ8UcLl7al/pub?gid=0&single=true&output=csv",
    },
    {
        category: "iphones-seminuevos",
        url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xLxp0RBPLAuhi202uxuww2jWhBgx3sm1MGKE4NQN5wntT2W8Ngg9kcO67CD8X1SlbLyZ8UcLl7al/pub?gid=1484911740&single=true&output=csv",
    },
    {
        category: "accesorios",
        url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3xLxp0RBPLAuhi202uxuww2jWhBgx3sm1MGKE4NQN5wntT2W8Ngg9kcO67CD8X1SlbLyZ8UcLl7al/pub?gid=150991052&single=true&output=csv",
    },
];

function getProductImage(name: string) {
    const slug = name
        .toLowerCase()
        .normalize("NFD")               // quita acentos
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    return `/images/products/${slug}.png`;
}

export async function GET() {
    try {
        const results = await Promise.all(
            SHEETS.map(async sheet => {
                const res = await fetch(sheet.url, { cache: "no-store" });

                if (!res.ok) {
                    throw new Error(`Error fetching ${sheet.category}`);
                }

                const csv = await res.text();
                console.log(csv)
                return parseCSV(csv, sheet.category);
            })
        );

        // Unificar todos los productos
        const products = results.flat();

        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error leyendo catálogo" },
            { status: 500 }
        );
    }
}
