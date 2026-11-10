import { useMemo, useState } from 'react';
import { Search, Flame, Plus, Minus, Check, ShieldCheck, Leaf, Sparkles, SlidersHorizontal, ShoppingBag, X } from 'lucide-react';
import { Choice, CartItemOption, Filter, MenuItem } from './types';
import { MENU_ITEMS } from './data';
import { formatRand } from './utils/order';

interface MenuProps {
  onAdd: (item: MenuItem, opts?: CartItemOption[], notes?: string, qty?: number) => void;
}

const TABS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'megs', label: 'Signature MEGs' },
  { id: 'hoods', label: 'Cape Suburb Pizzas' },
  { id: 'veg', label: 'Vegetarian' },
  { id: 'shakes', label: 'Desserts & Shakes' },
];
const PILLS = ['Extra crispy crust', 'Cut into slices', 'Sauce on the side', 'No onions'];

export function Menu({ onAdd }: MenuProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [item, setItem] = useState<MenuItem | null>(null);
  const [picked, setPicked] = useState<Record<string, Choice>>({});
  const [notes, setNotes] = useState('');
  const [qty, setQty] = useState(1);

  const q = query.toLowerCase();
  const visible = useMemo(
    () =>
      MENU_ITEMS.filter(
        (i) =>
          (filter === 'all' || i.category === filter) &&
          (i.name.toLowerCase().includes(q) ||
            i.desc.toLowerCase().includes(q) ||
            (i.ingredients || []).some((ing) => ing.toLowerCase().includes(q)))
      ),
    [filter, q]
  );

  // Every option group starts on its first choice.
  const open = (i: MenuItem) => {
    const defaults: Record<string, Choice> = {};
    i.options?.forEach((grp) => grp.choices.length && (defaults[grp.name] = grp.choices[0]));
    setPicked(defaults);
    setNotes('');
    setQty(1);
    setItem(i);
  };

  const confirm = () => {
    if (!item) return;
    const opts = Object.entries(picked).map(([optionName, c]) => ({ optionName, choiceLabel: c.label, extraPrice: c.extraPrice }));
    onAdd(item, opts, notes, qty);
    setItem(null);
  };

  const modalTotal = item
    ? (item.price + Object.values(picked).reduce((s, c) => s + c.extraPrice, 0)) * qty
    : 0;

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#090808] border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-[0.25em] mb-2 block">Fresh From The Hardwood Oven</span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase mb-4">The Manies Menu</h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Customize any woodfired pizza, rolled MEG, or handcrafted shake to your exact taste before adding to your basket. Direct checkout via WhatsApp!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === t.id
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md'
                    : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pizza, MEG, shake..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 text-white text-xs pl-10 pr-4 py-2.5 rounded-full placeholder:text-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((i) => (
            <div key={i.id} className="relative p-[3px] rounded-2xl overflow-hidden group bg-stone-900 transition-all duration-500 hover:shadow-[0_0_35px_rgba(249,87,33,0.55)] hover:-translate-y-1">
              <div className="absolute -inset-[150%] rotating-border-canvas pointer-events-none" />
              <div className="relative h-full bg-[#141313] rounded-[13px] overflow-hidden flex flex-col">
              <div onClick={() => open(i)} className="relative aspect-[16/10] overflow-hidden bg-stone-900 cursor-pointer">
                <img src={i.img} alt={i.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-stone-950/90 border border-stone-700 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">{i.tag}</span>
                  {i.spicy && (
                    <span className="bg-red-950/90 border border-red-700 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 backdrop-blur-sm">
                      <Flame className="w-3 h-3" /> Spicy
                    </span>
                  )}
                  {i.vegetarian && (
                    <span className="bg-emerald-950/90 border border-emerald-700 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 backdrop-blur-sm">
                      <Leaf className="w-3 h-3" /> Veg
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div onClick={() => open(i)} className="flex items-baseline justify-between gap-3 mb-2 cursor-pointer">
                  <h3 className="font-bold text-white text-base group-hover:text-orange-400 transition-colors">{i.name}</h3>
                  <span className="font-serif font-bold text-amber-400 text-base whitespace-nowrap">{formatRand(i.price)}</span>
                </div>

                <p className="text-stone-400 text-xs leading-relaxed mb-4 flex-grow">{i.desc}</p>

                {i.ingredients && (
                  <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-stone-800/60">
                    {i.ingredients.slice(0, 4).map((ing) => (
                      <span key={ing} className="text-[10px] bg-stone-900 text-stone-400 border border-stone-800 px-2 py-0.5 rounded">{ing}</span>
                    ))}
                    {i.ingredients.length > 4 && <span className="text-[10px] text-stone-500 px-1 py-0.5">+{i.ingredients.length - 4} more</span>}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-stone-800/80">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Halaal</span>
                  </div>
                  <button
                    onClick={() => open(i)}
                    title={`Customize ${i.name}`}
                    className="bg-stone-900 hover:bg-orange-600 text-stone-200 hover:text-white border border-stone-700 hover:border-orange-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow group/btn"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400 group-hover/btn:text-white transition-colors" />
                    <span>Customize & Add</span>
                  </button>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <p className="text-base mb-2">No menu items match "{query}" in this category.</p>
            <button
              onClick={() => { setQuery(''); setFilter('all'); }}
              className="text-orange-500 hover:underline text-xs font-bold uppercase"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#161514] border border-stone-700 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="relative h-44 sm:h-52 w-full bg-stone-900 shrink-0 overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-[#161514]/40 to-transparent" />
              <button
                onClick={() => setItem(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-stone-300 hover:text-white border border-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="bg-orange-600/90 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow">{item.tag}</span>
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-white mt-1">{item.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block uppercase font-medium">Base Price</span>
                  <span className="font-serif font-bold text-lg sm:text-xl text-amber-400">{formatRand(item.price)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
              <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-3.5 text-xs text-stone-300">
                <p className="leading-relaxed mb-2 text-stone-300">{item.desc}</p>
                {item.ingredients && (
                  <div className="pt-2 border-t border-stone-800 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-amber-400">Includes:</span>
                    {item.ingredients.map((ing) => (
                      <span key={ing} className="text-[10px] bg-stone-800/90 text-stone-300 px-2 py-0.5 rounded-full">{ing}</span>
                    ))}
                  </div>
                )}
              </div>

              {item.options?.map((grp) => (
                <div key={grp.name} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      {grp.name}
                    </label>
                    <span className="text-[10px] text-stone-500 uppercase font-semibold">Select 1 option</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {grp.choices.map((c) => {
                      const selected = picked[grp.name]?.label === c.label;
                      return (
                        <div
                          key={c.label}
                          onClick={() => setPicked((p) => ({ ...p, [grp.name]: c }))}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            selected
                              ? 'bg-gradient-to-r from-orange-950/50 to-amber-950/30 border-orange-500 text-white shadow-sm'
                              : 'bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${selected ? 'border-orange-500 bg-orange-600' : 'border-stone-600'}`}>
                              {selected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="font-semibold text-stone-200">{c.label}</span>
                          </div>
                          <span className={`font-mono text-[11px] font-bold ${c.extraPrice > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {c.extraPrice > 0 ? `+${formatRand(c.extraPrice)}` : 'Included'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-200 block">Special Kitchen Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Extra crispy base, cut into 8 slices, garlic on the side..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PILLS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNotes((prev) => (prev ? `${prev}, ${p}` : p))}
                      className="text-[10px] bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 rounded-full px-2.5 py-1 transition-colors cursor-pointer"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-[#171615] border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs text-stone-400 uppercase font-semibold">Quantity:</span>
                <div className="flex items-center bg-stone-900 border border-stone-700 rounded-xl p-1">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center text-xs transition-colors cursor-pointer">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white font-mono">{qty}</span>
                  <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center text-xs transition-colors cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button type="button" onClick={() => setItem(null)} className="px-4 py-2.5 rounded-full text-xs font-bold uppercase text-stone-400 hover:text-white transition-colors cursor-pointer">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirm}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Basket • {formatRand(modalTotal)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
