export type MenuItem = {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export const menu: MenuItem[] = [
    {
        id: 1,
        name: "Hamburguesa Clásica",
        description: "Carne 100% res, queso y pan artesanal",
        price: 18000,
        image: "https://simonparrilla.com.co/monteria/wp-content/uploads/2022/06/SIMON-PARRILLA-COMIDAS-RAPIDAS-HAMBURGUESA-CLASICA.webp"
    },
    {
        id: 2,
        name: "Pizza Pepperoni",
        description: "Queso mozzarella y pepperoni",
        price: 25000,
        image: "https://thumbs.dreamstime.com/b/delicious-pepperoni-pizza-salami-sausage-wooden-boards-traditional-italian-food-top-view-nutrition-dinner-lunch-square-212674372.jpg"
    }
]
