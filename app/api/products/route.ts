import { NextResponse } from "next/server";
import { Product } from "@/src/types/product";

export const revalidate = 300;

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


// 🔧 Helper para parsear CSV
function parseCSV(csv: string, category: string): Product[] {
    const rows = csv
        .trim()
        .split("\n")
        .slice(1) // quitar headers
        .map(row => row.split(","));

    return rows
        .filter(r => r[0] && r[1])
        .map((row, index) => ({
            id: `${category}-${index + 1}`,
            name: row[0],
            description: (category != 'accesorios' && row[1]) ?? "",
            price: Number(row[2]) || 0,
            category,
            image: getProductImage(row[0]) ?? "/logo-gordotech.png",
            available: row[4] !== "false",
        }));
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
