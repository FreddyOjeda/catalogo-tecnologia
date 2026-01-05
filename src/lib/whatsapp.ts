import { businessConfig } from "../config/business";
import { MenuItem } from "../data/catalog";

export function buildWhatsAppMessage(items: MenuItem[]) {
    const lines = items.map(
        (item) => `• ${item.name}`
    );

    return encodeURIComponent(
        `${businessConfig.whatsapp.messageIntro}

${lines.join("\n")}

Quedo atento(a) a su asesoría. ¡Gracias!
`
    );
}
