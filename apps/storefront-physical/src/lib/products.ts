import type { ProductDetail, StorefrontNavLink } from "@raketech/ui";

export const NAV_LINKS: StorefrontNavLink[] = [
  { label: "Productos", href: "/#products" },
  { label: "Materiales", href: "/#products" },
  { label: "Soporte", href: "/#footer" },
];

export const PHYSICAL_PRODUCTS: ProductDetail[] = [
  {
    id: "base-ps5-v",
    name: "Base de Pared para PS5",
    price: 4.99,
    image: "/images/ps5_3d_stand.png",
    imageAlt: "Base vertical para PS5",
    imageBg: "bg-[#111827]",
    category: "Soportes Consola",
    description: "Soporte de pared robusto y minimalista diseñado específicamente para la PS5. Libera espacio en tu escritorio y luce tu consola de forma elegante.",
    variants: [
      { label: 'Negro Mate', value: 'black', hex: '#000000' },
      { label: 'Blanco Glaciar', value: 'white', hex: '#FFFFFF' },
      { label: 'Azul Eléctrico', value: 'blue', hex: '#1E40AF' }
    ],
    features: [
      { icon: 'shield', title: 'Alta Resistencia', body: 'Fabricado en PLA+ reforzado para soportar el peso de la consola sin deformarse.' },
      { icon: 'check', title: 'Diseño Ventilado', body: 'No obstruye las entradas de aire de la consola.' },
      { icon: 'truck', title: 'Envío Seguro', body: 'Empaque protegido para evitar daños en el traslado.' }
    ],
    gallery: ["/images/ps5_3d_stand.png", "/images/xbox_stand.png"]
  },
  {
    id: "soporte-control-xbox",
    name: "Soporte de Controles Xbox",
    price: 4.99,
    image: "/images/xbox_stand.png",
    imageAlt: "Soporte para controles Xbox",
    imageBg: "bg-[#111827]",
    category: "Accesorios Mandos",
    description: "Mantén tus controles de Xbox organizados y siempre a mano. Este soporte vertical es ideal para cualquier superficie plana.",
    variants: [
      { label: 'Verde Xbox', value: 'green', hex: '#107C10' },
      { label: 'Negro Carbón', value: 'black', hex: '#1C1C1C' },
      { label: 'Blanco Robot', value: 'white', hex: '#F2F2F2' }
    ],
    features: [
      { icon: 'check', title: 'Ajuste Perfecto', body: 'Geometría diseñada para la curva exacta del control de Xbox Series S/X.' },
      { icon: 'shield', title: 'Base Antideslizante', body: 'Incluye pads para mayor estabilidad.' }
    ],
    gallery: ["/images/xbox_stand.png", "/images/ps5_3d_stand.png"]
  },
  {
    id: "soporte-auricular",
    name: "Soporte para Audífonos",
    price: 6.5,
    image: "/images/headphone_stand.png",
    imageAlt: "Soporte para auriculares gamer",
    imageBg: "bg-[#111827]",
    featured: true,
    category: "Desktop",
    description: "El soporte definitivo para tus cascos. Diseño futurista con base ancha para evitar volcamientos. Protege las almohadillas de tus audífonos.",
    variants: [
      { label: 'Negro Profundo', value: 'black', hex: '#0F172A' },
      { label: 'Rojo Sangre', value: 'red', hex: '#991B1B' },
      { label: 'Gris Espacial', value: 'grey', hex: '#334155' }
    ],
    features: [
      { icon: 'check', title: 'Universal', body: 'Compatible con el 99% de los audífonos del mercado.' },
      { icon: 'shield', title: 'Material Premium', body: 'Terminado con texturas finas de impresión de alta calidad.' }
    ],
    gallery: ["/images/headphone_stand.png", "/images/switch_dock.png"]
  },
  {
    id: "dock-switch",
    name: "Base Nintendo Switch",
    price: 5.99,
    image: "/images/switch_dock.png",
    imageAlt: "Dock personalizado para Nintendo Switch",
    imageBg: "bg-[#111827]",
    category: "Soportes Consola",
    description: "Una alternativa compacta y estilizada para tu Nintendo Switch. Ideal para viajes o setups minimalistas donde el dock original ocupa mucho espacio.",
    variants: [
      { label: 'Rojo/Azul Neón', value: 'neon', hex: '#FF3E3E' },
      { label: 'Gris Clásico', value: 'grey', hex: '#4B5563' },
      { label: 'Negro OLED', value: 'black', hex: '#000000' }
    ],
    features: [
      { icon: 'check', title: 'Compacto', body: 'Fácil de llevar en cualquier estuche.' },
      { icon: 'truck', title: 'Hecho a Medida', body: 'Fabricación bajo demanda en menos de 48h.' }
    ],
    gallery: ["/images/switch_dock.png", "/images/headphone_stand.png"]
  },
];
