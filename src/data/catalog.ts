export type MenuItem = {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
};

export const menu: MenuItem[] = [
    {
        id: "burger-clasica",
        name: "Hamburguesa Clásica",
        description: "Carne, queso, lechuga y tomate",
        price: 12000,
        image:
            "https://simonparrilla.com.co/monteria/wp-content/uploads/2022/06/SIMON-PARRILLA-COMIDAS-RAPIDAS-HAMBURGUESA-CLASICA.webp",
    },
];
