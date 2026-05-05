import Image from "next/image";
import {
  ArrowRight,
  BadgePercent,
  ChevronRight,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";

const popularProducts = [
  {
    name: "Xbox Game Pass",
    price: "$9.99",
    period: "/ mes",
    image: "/images/xbox_game_pass.png",
    tag: "OFERTA",
    tagStyle: "bg-emerald-400/90 text-black",
  },
  {
    name: "PlayStation Plus",
    price: "$14.99",
    period: "/ mes",
    image: "/images/ps_plus.png",
    tag: "TOP",
    tagStyle: "bg-sky-500/90 text-white",
  },
  {
    name: "EA Play",
    price: "$4.99",
    period: "/ mes",
    image: "/images/headphone_stand.png",
    tag: "NUEVO",
    tagStyle: "bg-white/90 text-black",
  },
  {
    name: "Nintendo Switch Online",
    price: "$19.99",
    period: "/ año",
    image: "/images/switch_dock.png",
    tag: "POPULAR",
    tagStyle: "bg-fuchsia-500/90 text-white",
  },
] as const;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030305] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(37,99,235,0.22),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_50%_68%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-1/2 top-[42rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-16 pt-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(37,99,235,0.18)]">
              <span className="text-sm font-black tracking-[0.35em] text-white">R</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">Raketech</p>
              <p className="text-xs text-white/45">Suscripciones y accesorios gaming</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
            <a className="transition hover:text-white" href="#catalogo">
              Catálogo
            </a>
            <a className="transition hover:text-white" href="#catalogo">
              Populares
            </a>
            <a className="transition hover:text-white" href="#beneficios">
              Beneficios
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 transition hover:border-white/20 hover:bg-white/10 sm:inline-flex"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </button>
            <a
              href="#catalogo"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/90 transition hover:border-white/20 hover:bg-white/10"
            >
              <ShoppingCart className="h-4 w-4" />
              Ver catálogo
            </a>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-8 lg:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
              <Sparkles className="h-4 w-4 text-sky-400" />
              Nuevas Suscripciones Disponibles
            </div>

            <h1 className="mt-7 max-w-xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Tus Juegos Favoritos
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55 sm:text-xl">
              Accede a las mejores suscripciones de juegos al instante.
              Seguridad, rapidez y soporte garantizado para una experiencia
              premium.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#catalogo"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-[#2563eb] px-8 text-base font-semibold text-white shadow-[0_20px_60px_rgba(37,99,235,0.35)] transition hover:bg-[#3b82f6]"
              >
                Ver Catálogo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#beneficios"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-base font-semibold text-white/90 transition hover:border-white/20 hover:bg-white/10"
              >
                Saber Más
              </a>
            </div>

            <div
              id="beneficios"
              className="mt-10 flex flex-wrap gap-4 text-sm text-white/60"
            >
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Entrega inmediata
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Pagos seguros
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Soporte premium
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px] lg:min-h-[620px]">
            <div className="absolute left-2 top-16 h-[78%] w-[46%] rounded-[2rem] border border-white/10 bg-[#101010]/70 shadow-[0_28px_80px_rgba(0,0,0,0.65)] -rotate-12 lg:left-0">
              <div className="relative h-full overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/xbox_game_pass.png"
                  alt="Game Pass Ultimate"
                  fill
                  className="object-cover object-center opacity-80"
                  sizes="(max-width: 1024px) 40vw, 220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>
            </div>

            <div className="absolute right-3 top-12 h-[76%] w-[46%] rounded-[2rem] border border-white/10 bg-[#101010]/70 shadow-[0_28px_80px_rgba(0,0,0,0.65)] rotate-12">
              <div className="relative h-full overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/switch_dock.png"
                  alt="Nintendo Switch Online"
                  fill
                  className="object-cover object-center opacity-85"
                  sizes="(max-width: 1024px) 40vw, 220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
            </div>

            <div className="absolute left-1/2 top-0 h-[84%] w-[72%] -translate-x-1/2 rounded-[2.25rem] border border-white/10 bg-[#0d0d0f] shadow-[0_32px_100px_rgba(0,0,0,0.75)]">
              <div className="relative h-[52%] overflow-hidden rounded-t-[2.25rem]">
                <Image
                  src="/images/ps_plus.png"
                  alt="PlayStation Plus"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 72vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                <div className="absolute right-4 top-4 rounded-full bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30">
                  Destacado
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      Suscripción Premium
                    </h2>
                    <p className="mt-2 text-2xl font-semibold text-[#60a5fa]">
                      $12.99{" "}
                      <span className="text-lg font-medium text-white/55">
                        / mes
                      </span>
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>

                <p className="max-w-sm text-sm leading-6 text-white/50 sm:text-base">
                  Acceso anticipado, recompensas exclusivas y multijugador
                  online sin límites para elevar tu experiencia de juego.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10"
                  >
                    <BadgePercent className="h-4 w-4" />
                    Promoción activa
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-6 rounded-full bg-[#3b82f6]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </div>
          </div>
        </section>

        <section id="catalogo" className="pb-4 pt-6 sm:pt-10 lg:pt-16">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Juegos Populares
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/50">
                Las suscripciones más elegidas por la comunidad.
              </p>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
            >
              Explorar todo el catálogo
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {popularProducts.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#0b0b0d] shadow-[0_18px_60px_rgba(0,0,0,0.4)] transition duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="relative aspect-[1.05] overflow-hidden border-b border-white/10 bg-black">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 92vw, (max-width: 1280px) 44vw, 280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                  <div
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.18em] ${product.tagStyle}`}
                  >
                    {product.tag}
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-lg font-medium text-[#60a5fa]">
                      {product.price}{" "}
                      <span className="text-sm text-white/55">
                        {product.period}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Añadir al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
