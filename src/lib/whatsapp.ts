import { CartItem } from "@/src/store/cart.store";
import { businessConfig } from "../config/business";

export function buildWhatsAppMessage(items: CartItem[]) {
    const lines = items.map(
        (item) =>
            `• ${item.quantity} x ${item.name} — $${item.price * item.quantity}`
    );

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return encodeURIComponent(
        `${businessConfig.whatsapp.messageIntro}

${lines.join("\n")}

Total: $${total.toLocaleString("es-CO")}
`
    );
}
