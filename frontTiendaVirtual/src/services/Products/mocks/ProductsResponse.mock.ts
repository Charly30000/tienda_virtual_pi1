export const productResponseMock = {
  pages: { actualPage: 1, totalPages: 1 },
  products: [
    {
      id: 8,
      name: "MacBook Pro",
      description: "Portátil profesional de Apple",
      image: "/uploads/4d525696473b4d3ca83f0fd16dec27a7_MacBook Pro.jpg",
      price: 1999.99,
      quantity: 50,
      sold: 12,
      productOwner: "bussinessbussiness",
      isBlocked: false,
      categories: [
        { id: 2, name: "Portátiles" },
        { id: 29, name: "Equipo Profesional" },
      ],
      labels: [
        { id: 9, name: "Profesional" },
        { id: 3, name: "Alta Gama" },
      ],
    },
    {
      id: 9,
      name: "Dell XPS 13",
      description: "Ultrabook de alta gama",
      image: "/uploads/1718576419714ec3b73895a97f569568_Dell XPS 13.jpg",
      price: 1299.99,
      quantity: 70,
      sold: 67,
      productOwner: "bussinessbussiness",
      isBlocked: false,
      categories: [
        { id: 22, name: "Computadoras Portátiles" },
        { id: 2, name: "Portátiles" },
      ],
      labels: [
        { id: 9, name: "Profesional" },
        { id: 7, name: "Elegante" },
      ],
    },
    {
      id: 10,
      name: "Lenovo ThinkPad X1",
      description: "Laptop empresarial de alta calidad",
      image: "/uploads/4f6160148854467f8218eac0ff01850e_Lenovo ThinkPad X1.png",
      price: 1399.99,
      quantity: 80,
      sold: 9,
      productOwner: "bussinessbussiness",
      isBlocked: false,
      categories: [
        { id: 34, name: "Portátiles Gaming" },
        { id: 2, name: "Portátiles" },
      ],
      labels: [
        { id: 9, name: "Profesional" },
        { id: 7, name: "Elegante" },
      ],
    },
    {
      id: 11,
      name: "Apple Watch Series 8",
      description: "Reloj inteligente de Apple",
      image:
        "/uploads/b45c80119b4c47be8f758c0829b4b445_Apple Watch Series 8.png",
      price: 399.99,
      quantity: 200,
      sold: 9,
      productOwner: "bussinessbussiness",
      isBlocked: false,
      categories: [
        { id: 4, name: "Wearables" },
        { id: 19, name: "Salud y Bienestar" },
      ],
      labels: [
        { id: 5, name: "Inteligente" },
        { id: 14, name: "Inalámbrico" },
      ],
    },
  ],
};
