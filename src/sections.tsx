import { useState, type ReactNode, type SyntheticEvent } from 'react';
import {
  Flame, Sparkles, Camera, Info, CheckCircle2, ShoppingBag, Store, Heart, Award, Star, Quote,
  Instagram, ExternalLink, MapPin, Phone, Clock, ShieldCheck, Navigation, MessageCircle, Menu as MenuIcon, X,
  Utensils,
} from 'lucide-react';
import { BranchId, BranchInfo } from './types';
import { BRANCHES } from './data';
import { isBranchOpen } from './utils/order';

const BRAND_ICON = 'w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex items-center justify-center text-white';
const CTA = 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer';
const HALAL = 'inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold';
const SECTION_TITLE = 'font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase';
const CARD = 'bg-[#141313] border border-stone-800 rounded-2xl p-6 hover:border-orange-500/40 transition-colors';
const IG_URL = 'https://www.instagram.com/manies.woodfire.pizza/?hl=en';

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="text-orange-500 font-bold text-xs uppercase tracking-[0.25em] mb-2 block">{children}</span>
);

const SectionHead = ({ eyebrow, title, body, className = '' }: { eyebrow: string; title: string; body?: string; className?: string }) => (
  <div className={`text-center max-w-3xl mx-auto mb-12 ${className}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className={`${SECTION_TITLE} mb-4`}>{title}</h2>
    {body && <p className="text-stone-300 text-sm sm:text-base leading-relaxed">{body}</p>}
  </div>
);

// ---------------------------------------------------------------- Navbar

export function Navbar({ count, branch, onOpenCart, onBranch }: { count: number; branch: BranchInfo; onOpenCart: () => void; onBranch: (id: BranchId) => void }) {
  const [open, setOpen] = useState(false);
  const pick = (v: string) => onBranch(v as BranchId);
  const link = 'hover:text-orange-500 transition-colors';
  const mobileLink = 'text-stone-300 hover:text-orange-500 font-bold text-sm uppercase py-1';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d0c0c]/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className={`${BRAND_ICON} shadow-[0_0_18px_rgba(249,87,33,0.45)] group-hover:scale-105 transition-transform`}>
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="font-serif font-black text-xl sm:text-2xl tracking-wider text-white leading-tight">MANIES</div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-500 -mt-0.5">Woodfire Pizza</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-stone-400">
          <a href="#fresh-out-the-oven" className={`${link} flex items-center gap-1.5`}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            What's New
          </a>
          <a href="#menu" className={link}>Our Menu</a>
          <a href="#story" className={link}>Our Story</a>
          <a href="#locations" className={link}>Branches</a>
          <a href="#reviews" className={link}>Reviews</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strictly 100% Halaal</span>
          </div>

          <div className="hidden md:flex items-center bg-stone-900 border border-stone-800 rounded-full px-2.5 py-1 text-xs">
            <MapPin className="w-3.5 h-3.5 text-orange-500 mr-1.5" />
            <select value={branch.id} onChange={(e) => pick(e.target.value)} className="bg-transparent text-stone-300 font-semibold text-xs focus:outline-none cursor-pointer pr-1" aria-label="Select Pizzeria Branch">
              <option value="gp" className="bg-stone-900 text-white">Grassy Park</option>
              <option value="kb" className="bg-stone-900 text-white">Kromboom</option>
            </select>
          </div>

          <button onClick={onOpenCart} aria-label={`Open Cart (${count} items)`} className="relative bg-gradient-to-r from-stone-900 to-stone-900 hover:border-orange-500/60 border border-stone-700 text-white px-4 py-2 rounded-full flex items-center gap-2.5 text-xs font-bold transition-all shadow-md cursor-pointer group">
            <ShoppingBag className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-extrabold text-[11px] flex items-center justify-center">{count}</span>
          </button>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-stone-300 hover:text-white cursor-pointer" aria-label="Toggle navigation menu">
            {open ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#111010] border-b border-stone-800 px-6 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <span className="text-xs text-stone-400 font-bold uppercase">Ordering Branch:</span>
            <select
              value={branch.id}
              onChange={(e) => { pick(e.target.value); setOpen(false); }}
              className="bg-stone-900 text-white text-xs border border-stone-700 rounded-lg px-3 py-1.5"
            >
              <option value="gp">Grassy Park (34 Victoria Rd)</option>
              <option value="kb">Kromboom (134 Kromboom Rd)</option>
            </select>
          </div>

          <a href="#fresh-out-the-oven" onClick={() => setOpen(false)} className={mobileLink}>🔥 What's New</a>
          <a href="#menu" onClick={() => setOpen(false)} className={mobileLink}>🍕 Full Menu</a>
          <a href="#story" onClick={() => setOpen(false)} className={mobileLink}>📜 Our Story</a>
          <a href="#locations" onClick={() => setOpen(false)} className={mobileLink}>📍 Branches & Directions</a>
          <a href="#reviews" onClick={() => setOpen(false)} className={mobileLink}>★ Reviews & Eat Out Gem</a>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strictly 100% Certified Halaal</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------- Hero

export function Hero({ branch }: { branch: BranchInfo }) {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0a0909] overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop')" }}
      />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <Award className="w-3.5 h-3.5" />
              100% Certified Halaal
            </span>
            <span className="font-script text-2xl text-amber-400">Authentic Woodfire.</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.08] mb-6">
            Manies Pizza, <br />
            Home of the{' '}
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">Legendary MEG</span>.
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mb-8 leading-relaxed">
            Crafted in blisteringly hot 450°C wood-fired ovens. Famous for our giant rolled <strong className="text-white font-bold">MEGS</strong> basted fresh in hot garlic herb butter,
            served in brown paper bags with crunchy spiced nachos, and our Cape Town neighbourhood tribute pizzas.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button onClick={() => go('menu')} className={`${CTA} px-8 py-4 rounded-full shadow-[0_10px_25px_-5px_rgba(249,87,33,0.5)] transform hover:-translate-y-0.5 flex items-center gap-2.5`}>
              <Utensils className="w-4 h-4" />
              Explore Menu & Order
            </button>
            <button
              onClick={() => go('fresh-out-the-oven')}
              className="bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 hover:border-orange-500/60 font-extrabold text-sm uppercase tracking-wider px-6 py-4 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              What's New
            </button>
            <a href="#locations" className="inline-flex items-center gap-1.5 text-stone-400 hover:text-orange-400 font-semibold text-xs tracking-wider uppercase px-3 py-2 transition-colors">
              <MapPin className="w-4 h-4 text-orange-500" />
              Branches: {branch.shortName}
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-800/80 w-full max-w-lg">
            {[['4.6 ★', 'Eat Out Gem'], ['2 Spots', 'Grassy Park & KB'], ['100%', 'Oak Hardwood Flame']].map(([big, small]) => (
              <div key={small}>
                <div className="font-serif font-bold text-2xl sm:text-3xl text-amber-400">{big}</div>
                <div className="text-[11px] sm:text-xs text-stone-400 uppercase font-semibold tracking-wider mt-0.5">{small}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl p-[3px] overflow-hidden group bg-stone-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(249,87,33,0.3)] transition-all duration-500 hover:shadow-[0_0_35px_rgba(249,87,33,0.55)]">
            <div className="absolute -inset-[150%] rotating-border-canvas pointer-events-none" />
            <div className="relative overflow-hidden rounded-[21px] aspect-[4/5] bg-stone-900 border border-stone-800/90">
              <img
                src="/images/meg_rolled_photo_1794220887370.jpg"
                alt="The Signature MEG"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-stone-900/95 backdrop-blur-md border border-stone-700 rounded-2xl p-4 shadow-2xl flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center shrink-0 text-white shadow-lg">
                    <Flame className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      The Signature "MEG"
                      <span className="text-[10px] bg-orange-950/80 text-orange-400 border border-orange-700/60 px-1.5 py-0.5 rounded font-mono">R 155</span>
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-0.5">
                      Rolled woodfire pizza crust packed with tender steak, mushrooms & melted cheese, garlic butter glazed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Spotlight + Culinary Studio

const STUDIO = {
  pizza: {
    src: '/images/artisanal_pizza_photo_1794220886428.jpg',
    remote: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop',
    title: 'Artisanal Woodfired Pizza',
    subtitle: 'District Six Pizza',
    spec: '450°C Oak Blister • Cupped Pepperoni • Stretchy Mozzarella',
    spots: [
      [43, 62, 'Cupped Pepperoni & Seared Meat', 'Crispy caramelized edges, natural savory rendered oil, and deep golden crispness from 450°C hardwood flame.'],
      [58, 54, 'Melted Stretchy Mozzarella', 'Glistening moisture pockets, rich stringy pull, and toasted golden-brown spots across slow-simmered tomato sauce.'],
      [77, 62, 'Leopard Spotted Cornicione', 'Airy puffed sourdough crust with authentic black charred blister spots (leopard spotting) and rustic flour dusting.'],
      [49, 43, 'Fresh Wild Basil & Extra Virgin Drizzle', 'Freshly picked basil leaves with delicate olive oil drops added right as the pie leaves the oven.'],
    ] as [number, number, string, string][],
  },
  meg: {
    src: '/images/meg_rolled_photo_1794220887370.jpg',
    remote: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1600&auto=format&fit=crop',
    title: 'The Signature Rolled "MEG"',
    subtitle: 'The MEG • Cape Town Viral Sensation',
    spec: 'Tender Pepper Steak • Garlic Butter Glaze • Seasoned Nachos',
    spots: [
      [48, 50, 'Juicy Seared Pepper Steak', 'Tender, thick cuts of marinated steak seared on the grill and rolled edge-to-edge inside the dough.'],
      [62, 52, 'Molten Mozzarella String Stretch', 'A dense, gooey core of imported mozzarella and mature cheddar melting together under high heat.'],
      [71, 42, 'Glossy Garlic Herb Glaze', 'Basted with bubbling hot crushed garlic and oregano butter the moment it leaves the woodfire oven.'],
      [16, 54, 'Crispy Spiced Triangular Nachos', 'Every single MEG comes with crispy seasoned nachos and creamy savory garlic dip in our kraft paper bag.'],
    ] as [number, number, string, string][],
  },
  oven: {
    src: '/images/woodfire_oven_photo_1794220887783.jpg',
    remote: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1600&auto=format&fit=crop',
    title: 'The 450°C Hardwood Hearth',
    subtitle: 'Authentic Oak Firebrick Oven • Live Baking Coals',
    spec: 'Split Oak Logs • Glowing Charcoal Bed • Terracotta Dome',
    spots: [
      [61, 68, 'Stone Firebrick Hearth', 'Baking stone maintained at 450°C for instant bottom blister and rapid cornicione spring.'],
      [32, 50, 'Split Oak Hardwood Fire', 'Clean burning indigenous hardwood providing intense radiant heat and authentic sweet wood smoke.'],
      [55, 48, 'Glowing Ember Bed', 'Coals raked along the perimeter to sustain constant baking temperature throughout service.'],
    ] as [number, number, string, string][],
  },
};
type View = keyof typeof STUDIO;

const VIEW_TABS: { id: View; label: string; icon: ReactNode }[] = [
  { id: 'pizza', label: 'Artisanal Pizza', icon: <Flame className="w-3.5 h-3.5" /> },
  { id: 'meg', label: 'The Rolled MEG', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'oven', label: 'Woodfire Oven', icon: <Camera className="w-3.5 h-3.5" /> },
];

function CulinaryStudio({ onOrder }: { onOrder: (id: number) => void }) {
  const [view, setView] = useState<View>('pizza');
  const [hotspots, setHotspots] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const img = STUDIO[view];

  // Try the bundled copy, then the Unsplash original, before giving up.
  const fallback = (e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (!el.dataset.fallback) { el.dataset.fallback = '1'; el.src = img.remote; }
  };

  const switchView = (v: View) => { setView(v); setActive(null); };

  return (
    <div className="relative w-full bg-[#0c0b0b] overflow-hidden rounded-3xl border border-stone-800 shadow-2xl">
      <div className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] bg-stone-950 overflow-hidden select-none">
        <img
          key={view}
          src={img.src}
          alt={img.title}
          loading="eager"
          decoding="async"
          onError={fallback}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50 pointer-events-none" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <div className="bg-stone-900/90 border border-stone-700/80 rounded-full px-4 py-2 flex items-center gap-2.5 shadow-xl pointer-events-auto backdrop-blur-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="font-serif text-xs md:text-sm tracking-wider font-bold text-stone-100 uppercase">{img.title}</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setHotspots(!hotspots)}
              title="Toggle Food Detail Hotspots"
              className={`px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg transition-colors cursor-pointer border ${hotspots ? 'bg-orange-600 text-white border-orange-500' : 'bg-stone-900/90 text-stone-300 border-stone-700 hover:text-white'}`}
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{hotspots ? 'Details: ON' : 'Details: OFF'}</span>
            </button>
            {view === 'pizza' && (
              <button onClick={() => onOrder(5)} className={`${CTA} px-4 py-2 rounded-full flex items-center gap-1.5`}>
                <Flame className="w-3.5 h-3.5" /><span>Order Pizza</span>
              </button>
            )}
            {view === 'meg' && (
              <button onClick={() => onOrder(1)} className={`${CTA} px-4 py-2 rounded-full flex items-center gap-1.5`}>
                <ShoppingBag className="w-3.5 h-3.5" /><span>Order The MEG</span>
              </button>
            )}
          </div>
        </div>

        {hotspots &&
          img.spots.map(([x, y, title, desc], idx) => (
            <div key={title} style={{ left: `${x}%`, top: `${y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group">
              <button
                onClick={() => setActive(active === title ? null : title)}
                aria-label={`Inspect detail: ${title}`}
                className="relative w-8 h-8 rounded-full bg-stone-950/80 border-2 border-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(249,87,33,0.7)] hover:scale-125 transition-transform cursor-pointer"
              >
                <span className="text-[11px] font-mono text-amber-300 font-extrabold">{idx + 1}</span>
              </button>
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-stone-900/95 border border-stone-700 rounded-xl shadow-2xl transition-all pointer-events-auto ${
                  active === title ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible'
                }`}
              >
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-stone-800">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-orange-400" />
                    {title}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">#{idx + 1}</span>
                </div>
                <p className="text-[11px] text-stone-300 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}

        {active && (
          <div className="sm:hidden absolute bottom-24 left-4 right-4 z-30 bg-stone-900/95 border border-orange-500/80 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-stone-800">
              <span className="font-bold text-xs text-amber-400">{active}</span>
              <button onClick={() => setActive(null)} className="text-stone-400 hover:text-white text-xs px-1">✕</button>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">{img.spots.find(([, , t]) => t === active)?.[3]}</p>
          </div>
        )}
      </div>

      <div className="bg-[#151413] border-t border-stone-800 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-2xl border border-stone-800 w-full sm:w-auto justify-center">
          {VIEW_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => switchView(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                view === t.id ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
        <div className="text-center md:text-right">
          <div className="text-xs font-bold text-stone-200 flex items-center justify-center md:justify-end gap-1.5">
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            <span>{img.subtitle}</span>
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">{img.spec}</div>
        </div>
      </div>
    </div>
  );
}

const FEATURES: { icon: ReactNode; title: string; body: string; tone: string }[] = [
  {
    icon: <Sparkles className="w-5 h-5" />, tone: 'orange', title: 'Hot Garlic Herb Butter Glaze',
    body: 'Every MEG is pulled straight from the 450°C woodfire hearth and immediately basted with our piping hot crushed garlic and oregano herb butter for an irresistible glossy aroma.',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5" />, tone: 'amber', title: 'Accompanied by Crispy Nachos',
    body: 'A Manies hallmark! Every single MEG comes packed alongside a generous portion of crisp, seasoned spiced nachos and savory garlic aioli dip.',
  },
  {
    icon: <Flame className="w-5 h-5" />, tone: 'orange', title: 'The Brown Paper Bag Ritual',
    body: 'Steam-locked in authentic brown paper takeout packaging. It traps the oak smoke and garlic vapor so every bite stays meltingly hot and gooey on the drive home.',
  },
];

export function Spotlight({ onOrder }: { onOrder: (id: number) => void }) {
  return (
    <section id="fresh-out-the-oven" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0c0b0b] relative">
      <div id="culinary-studio" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="New & Exciting Meals On Offer"
          title="Fresh Out The Oven"
          body="At Manies, our menu is a tribute to the Kaap. Every single one of our iconic neighborhood pizzas can be upgraded into a massive, fire-baked MEG. Whether you're craving the kick of a Bo-Kaap mini-meg with savory Geema steak or the smoky perfection of the Mitchells Plain, we roll every single one with premium mozzarella, garlic, and that signature nacho crunch."
        />

        <div className="mb-14">
          <CulinaryStudio onOrder={onOrder} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className={CARD}>
              <div className={`w-10 h-10 rounded-xl ${f.tone === 'amber' ? 'bg-amber-950/60 border-amber-700/50 text-amber-400' : 'bg-orange-950/60 border-orange-700/50 text-orange-400'} border flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-serif font-bold text-lg text-white mb-2">{f.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-stone-900 via-[#181615] to-stone-900 border border-stone-700/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white">Ready for the Seared Pepper Steak MEG?</h4>
              <p className="text-stone-400 text-xs sm:text-sm">R 155 • Tender pepper steak, mushrooms, red onion, melted mozzarella, garlic glaze & nachos.</p>
            </div>
          </div>
          <button onClick={() => onOrder(1)} className={`${CTA} w-full sm:w-auto px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shrink-0`}>
            <ShoppingBag className="w-4 h-4" />
            Add To Order Basket
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Story

export function Story() {
  return (
    <section id="story" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0c0c] border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md">
            <div className="rounded-3xl overflow-hidden border border-stone-800 shadow-2xl aspect-[4/5] bg-stone-900">
              <img src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1000&auto=format&fit=crop" alt="Manies woodfired oven craftsmanship" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-6 w-3/5 rounded-2xl overflow-hidden border-4 border-[#0d0c0c] shadow-[0_20px_40px_rgba(0,0,0,0.8)] aspect-square bg-stone-900 hidden sm:block">
              <img src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=800&auto=format&fit=crop" alt="Fresh artisanal ingredients and toppings" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -left-4 bg-stone-900/95 border border-stone-700/80 rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-600/60 flex items-center justify-center text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block">Est. 2020</span>
                <span className="text-xs font-bold text-white">Lockdown Home Kitchen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col items-start lg:pl-6">
          <Eyebrow>Cape Town Heritage & Heart</Eyebrow>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase mb-6 leading-tight">
            From A Lockdown Kitchen <br />
            To A Cape Town Cult Favourite
          </h2>

          <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
            <p>
              Manies Wood Fired Pizza started during the strict 2020 lockdowns as a humble, from-home passion pizzeria in Cape Town. Word spread quickly through the neighbourhood about the smoky, charred sourdough crusts, generous toppings, and an unmatched warmth.
            </p>
            <p>
              Before long, customers were traveling from all over the peninsula. We opened our first official brick-and-mortar pizzeria on <strong className="text-white">Victoria Road in Grassy Park</strong>. Lines began forming around the block for our viral invention—<em className="text-amber-400 font-semibold">The MEG</em>—and our Cape Town neighbourhood tribute pizzas paying homage to spots like <strong className="text-stone-200">District Six, Bo-Kaap, Plumstead, Wynberg, and Mitchells Plain</strong>.
            </p>
            <p>
              Today, with our flagship kitchen in Grassy Park and our second branch on <strong className="text-white">Kromboom Road in Crawford / Athlone</strong>, we stay completely faithful to the original recipe: real oak hardwood flame, 100% strictly Halaal ingredients, immense portions, and genuine family hospitality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-800 w-full max-w-md">
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5 text-orange-500 shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">2 Cape Locations</div>
                <div className="text-stone-400 text-xs">Grassy Park & Kromboom</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">Community Roots</div>
                <div className="text-stone-400 text-xs">100% Cape Town Spirit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Locations

export function Locations({ onPick }: { onPick: (id: BranchId) => void }) {
  return (
    <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111010] border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="Drop By Or Order Direct"
          title="Our Cape Town Branches"
          body="Pick up piping hot or order directly on WhatsApp. Both kitchens are strictly 100% Halaal certified and bake continuously in hardwood brick ovens."
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(Object.values(BRANCHES) as BranchInfo[]).map((b) => {
            const status = isBranchOpen(b.id);
            return (
              <div key={b.id} className="bg-[#161515] border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-stone-700 transition-all shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="bg-orange-950/80 border border-orange-600/60 text-orange-400 font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full">
                      {b.isFlagship ? 'The Flagship' : 'Second Location'}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        status.isOpen ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40' : 'bg-stone-800 text-stone-400 border border-stone-700'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-stone-500'}`} />
                      {status.statusText}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-white mb-6">{b.name}</h3>

                  <div className="space-y-4 text-sm text-stone-300 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                      <a href={`tel:${b.phone}`} className="hover:text-orange-400 transition-colors font-mono">{b.phoneDisplay}</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <div>Sun – Thu: {b.hoursSunThu}</div>
                        <div>Fri – Sat: {b.hoursFriSat}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>100% Strictly Halaal Certified</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-800 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${b.phone}?text=${encodeURIComponent(`Hi Manies ${b.shortName}, I would like to check menu availability / place an order!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Branch</span>
                  </a>
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-orange-500" />
                    <span>Directions</span>
                  </a>
                  <button onClick={() => onPick(b.id)} className={`${CTA} py-3 px-4 rounded-xl`}>
                    Select As Cart Branch
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Reviews

const REVIEWS = [
  {
    name: 'Eat Out South Africa', role: 'Neighbourhood Gems Guide', initials: 'EO', badge: 'Official Food Critic',
    text: 'Opened during Covid as a from-home pizzeria and quickly became a cult favourite for their signature rolled pizza "The Meg". The portions are massive, the garlic basting is addictive, and the crust has that authentic smoky blister!',
  },
  {
    name: 'Riza & Shamiel', role: 'Cape Town Food Vloggers', initials: 'RS', badge: 'Cape Town Viral Review',
    text: 'We investigated Cape Town’s mysterious MEG! The seared steak MEG and spicy chicken MEG are ridiculous. Rolled tightly, loaded with cheese, baked in woodfire, glazed with glossy garlic sauce and served in a brown paper bag with nachos. Unbelievable!',
  },
  {
    name: 'Zubair Khan', role: 'Google Verified Local Guide', initials: 'ZK', badge: 'Local Guide 5-Star',
    text: 'I sit in bed some nights thinking of how good their food is… like a crazy ex! The District 6 chops pizza and the Blueberry Cheesecake milkshake are next level. Truly Cape Town’s best kept secret.',
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0909] border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-amber-950/60 border border-amber-600/50 text-amber-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Official Eat Out Neighbourhood Gem
          </div>
          <h2 className={`${SECTION_TITLE} mb-4`}>What The Cape Is Saying</h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">From local culinary critics to community foodies crossing the peninsula every weekend.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-[#141313] border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-orange-500/30 transition-all shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                  </div>
                  <span className="text-[10px] bg-stone-900 text-stone-400 border border-stone-800 px-2 py-0.5 rounded-full font-mono">{r.badge}</span>
                </div>
                <Quote className="w-6 h-6 text-orange-500/40 mb-2" />
                <p className="text-stone-300 text-xs sm:text-sm italic leading-relaxed mb-6">"{r.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-sm flex items-center justify-center">{r.initials}</div>
                <div>
                  <div className="font-bold text-sm text-white">{r.name}</div>
                  <div className="text-[11px] text-stone-400">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Instagram

const POSTS: [string, string][] = [
  ['1590947132387-155cc02f3212', 'The ultimate cheese pull on our District Six pizza'],
  ['1565299624946-b28f40a0ae38', 'Crisp blistered crust fresh out of 450°C woodfire'],
  ['1572490122747-3968b75cc699', 'Blueberry Cheesecake double cream shake'],
  ['1588315029754-2dd089d39a1a', 'Baking MEGs and Cape suburb pizzas over hardwood logs'],
  ['1517433670267-08bbd4be890f', 'Lotus Biscoff loaded dessert sundae'],
  ['1534308983496-4fabb1a015ee', 'Hardwood flame blister and hot garlic herb glaze'],
];

export function InstagramSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111010] border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Eyebrow>Follow The Fire</Eyebrow>
          <h3 className="font-serif font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mb-2">Cape Town's Pizza Feed</h3>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-stone-300 hover:text-orange-400 font-bold text-sm tracking-wide transition-colors">
            <Instagram className="w-4 h-4 text-[#e1306c]" />
            <span>@manies.woodfire.pizza</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {POSTS.map(([id, caption]) => (
            <a key={id} href={IG_URL} target="_blank" rel="noopener noreferrer" className="group relative aspect-square rounded-xl overflow-hidden bg-stone-900 border border-stone-800 block">
              <img
                src={`https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop`}
                alt={caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                <div className="flex flex-col items-center gap-1.5 text-white">
                  <Instagram className="w-5 h-5 text-orange-400" />
                  <span className="text-[11px] font-bold line-clamp-2">{caption}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Footer

export function Footer() {
  const year = new Date().getFullYear();
  const link = 'hover:text-orange-400 transition-colors';

  return (
    <footer className="bg-[#070606] border-t border-stone-800 text-stone-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="font-serif font-black text-xl tracking-wider text-white">MANIES</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">Woodfire Pizza</div>
            </div>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Cape Town’s homegrown cult-favourite wood-fired pizzeria. Strictly 100% certified Halaal, generous portions, blistered sourdough crusts, and home of the world-famous MEG.
          </p>
          <div className={HALAL}>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strictly 100% Certified Halaal</span>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">Our Kitchens</h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span><strong className="text-stone-200">Grassy Park (Flagship):</strong><br />34 Victoria Road, Grassy Park</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span><strong className="text-stone-200">Kromboom:</strong><br />Shop 8, 134 Kromboom Rd, Crawford</span>
            </li>
            <li className="flex items-center gap-2 pt-1">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href="tel:27628859986" className="hover:text-white transition-colors">+27 62 885 9986 (GP)</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href="tel:27616202816" className="hover:text-white transition-colors">+27 61 620 2816 (KB)</a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><a href="#fresh-out-the-oven" className={link}>What's New (Fresh Out The Oven)</a></li>
            <li><a href="#menu" className={link}>Full Menu & Orders</a></li>
            <li><a href="#story" className={link}>Our 2020 Story</a></li>
            <li><a href="#locations" className={link}>Directions & Hours</a></li>
            <li><a href="#reviews" className={link}>Eat Out Gem Review</a></li>
            <li>
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" className={`${link} flex items-center gap-1.5`}>
                <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white">Trading Hours</h4>
          <div className="space-y-3 text-xs text-stone-400">
            <div>
              <div className="text-stone-200 font-bold mb-0.5">Grassy Park:</div>
              <div>Sun – Thu: 11:00 AM – 21:00 PM</div>
              <div>Fri – Sat: 10:00 AM – 23:00 PM</div>
            </div>
            <div>
              <div className="text-stone-200 font-bold mb-0.5">Kromboom (Crawford):</div>
              <div>Sun – Thu: 12:00 PM – 21:00 PM</div>
              <div>Fri – Sat: 12:00 PM – 22:00 PM</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <div>© {year} Manies Woodfire Pizza. All Rights Reserved.</div>
        <div className="flex items-center gap-1 text-stone-400">
          <span>Crafted with Cape Town Pride</span>
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
        </div>
      </div>
    </footer>
  );
}
