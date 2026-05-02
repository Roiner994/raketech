import type { ProductDetail, StorefrontNavLink } from "@raketech/ui";

export const NAV_LINKS: StorefrontNavLink[] = [
  { label: "Suscripciones Digitales", href: "/#subscriptions" },
  { label: "Impresión 3D", href: "/#featured" },
  { label: "Nosotros", href: "/#footer" },
];

export const DIGITAL_PRODUCTS: ProductDetail[] = [
  {
    id: "xbox-1m",
    name: "Xbox Game Pass Ultimate 1 Mes",
    price: 3.99,
    image: "/images/xbox_game_pass.png",
    imageAlt: "Tarjeta Xbox Game Pass",
    imageBg: "bg-[#1A2E1A]",
    category: "Suscripciones",
    description: "Accede a cientos de juegos de alta calidad en consola, PC y la nube. Incluye EA Play y todos los beneficios de Xbox Live Gold.",
    features: [
      { icon: 'check', title: 'Multijugador Online', body: 'Juega con amigos en la red más avanzada.' },
      { icon: 'shield', title: 'Garantía Total', body: 'Código 100% original con soporte técnico.' },
      { icon: 'truck', title: 'Entrega Instantánea', body: 'Recibe tu código por WhatsApp o correo.' }
    ],
    gallery: ["/images/xbox_game_pass.png", "/images/xbox_stand.png"]
  },
  {
    id: "psplus-3m",
    name: "PS Plus Deluxe 3 Meses",
    price: 15.5,
    image: "/images/ps_plus.png",
    imageAlt: "Tarjeta PlayStation Plus",
    imageBg: "bg-[#0A2E7A]",
    category: "Suscripciones",
    description: "La membresía definitiva de PlayStation. Incluye catálogo de juegos, clásicos, pruebas de juegos y multijugador online.",
    features: [
      { icon: 'check', title: 'Catálogo de Juegos', body: 'Cientos de juegos de PS4 y PS5 a tu disposición.' },
      { icon: 'check', title: 'Clásicos de PlayStation', body: 'Revive los mejores títulos de PS1, PS2 y PSP.' },
      { icon: 'truck', title: 'Entrega Inmediata', body: 'Código canjeable al instante en tu cuenta.' }
    ],
    gallery: ["/images/ps_plus.png", "/images/ps5_3d_stand.png"]
  },
  {
    id: "icloud-1m",
    name: "iCloud+ 200 GB 1 Mes",
    price: 2.99,
    image: "/images/apple_icloud.png",
    imageAlt: "Tarjeta Apple iCloud Plus",
    imageBg: "bg-[#1C1C1E]",
    category: "Almacenamiento",
    description: "Aumenta el almacenamiento de tu iPhone, iPad o Mac. Incluye Relay privado de iCloud, Ocultar mi correo y soporte para Video seguro de HomeKit.",
    features: [
      { icon: 'check', title: '200 GB de Espacio', body: 'Suficiente para miles de fotos y archivos.' },
      { icon: 'shield', title: 'Privacidad Avanzada', body: 'Navega de forma segura con Relay privado.' },
      { icon: 'truck', title: 'Activación Directa', body: 'Te ayudamos en todo el proceso de carga.' }
    ],
    gallery: ["/images/apple_icloud.png", "/images/headphone_stand.png"]
  },
  {
    id: "spotify-1m",
    name: "Spotify Premium 1 Mes",
    price: 4.99,
    image: "/images/spotify_premium.png",
    imageAlt: "Spotify Premium",
    imageBg: "bg-[#0D2A1A]",
    category: "Streaming",
    description: "Música sin anuncios, en modo offline y con calidad de sonido superior. El plan Premium Individual para tu cuenta personal.",
    features: [
      { icon: 'check', title: 'Sin Anuncios', body: 'Disfruta de tu música sin interrupciones.' },
      { icon: 'check', title: 'Modo Offline', body: 'Descarga tus canciones y llévalas contigo.' },
      { icon: 'shield', title: '100% Seguro', body: 'Sin riesgos de baneo en tu cuenta principal.' }
    ],
    gallery: ["/images/spotify_premium.png", "/images/headphone_stand.png"]
  },
];
