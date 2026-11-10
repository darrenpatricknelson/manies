import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { BranchId, CartItem, CartItemOption, MenuItem } from './types';
import { BRANCHES, MENU_ITEMS } from './data';
import { Navbar, Hero, Spotlight, Story, Locations, Reviews, InstagramSection, Footer } from './sections';
import { Menu } from './Menu';
import { Cart } from './Cart';

// localStorage can throw (private mode, disabled storage); the site should still work without it.
const store = {
  get: (k: string): string | null => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string): void => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(store.get('manies_cart') || '[]'); } catch { return []; }
  });
  const [branchId, setBranchId] = useState<BranchId>(() => (store.get('manies_branch') as BranchId) || 'gp');
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => store.set('manies_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => store.set('manies_branch', branchId), [branchId]);

  // Clearing the previous timer means a second toast isn't dismissed early by the first one's timeout.
  const flash = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  };

  const branch = BRANCHES[branchId] || BRANCHES.gp;
  const count = cart.reduce((s, c) => s + c.qty, 0);

  const addToCart = (item: MenuItem, opts: CartItemOption[] = [], notes = '', qty = 1) => {
    const key = `${item.id}-${opts.map((o) => `${o.optionName}:${o.choiceLabel}`).sort().join('|')}-${notes}`;
    setCart((prev) =>
      prev.some((c) => c.cartItemId === key)
        ? prev.map((c) => (c.cartItemId === key ? { ...c, qty: c.qty + qty } : c))
        : [...prev, { id: item.id, cartItemId: key, name: item.name, price: item.price, qty, category: item.category, selectedOptions: opts, notes }]
    );
    flash(`Added ${qty > 1 ? `${qty}x ` : ''}${item.name} to order!`);
  };

  const updateQty = (id: string, delta: number) =>
    setCart((prev) => prev.map((c) => (c.cartItemId === id ? { ...c, qty: c.qty + delta } : c)).filter((c) => c.qty > 0));
  const removeItem = (id: string) => setCart((prev) => prev.filter((c) => c.cartItemId !== id));

  const orderFromSpotlight = (id: number) => {
    addToCart(MENU_ITEMS.find((i) => i.id === id)!);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0909] text-stone-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 border border-orange-500 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <Navbar count={count} branch={branch} onOpenCart={() => setCartOpen(true)} onBranch={setBranchId} />

      <main className="flex-1">
        <Hero branch={branch} />
        <Spotlight onOrder={orderFromSpotlight} />
        <Menu onAdd={addToCart} />
        <Story />
        <Locations
          onPick={(id) => {
            setBranchId(id);
            setCartOpen(true);
            flash(`Switched active order branch to ${BRANCHES[id].shortName}`);
          }}
        />
        <Reviews />
        <InstagramSection />
      </main>

      <Footer />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        branch={branch}
        onBranch={setBranchId}
        onQty={updateQty}
        onRemove={removeItem}
        onClear={() => setCart([])}
      />

      {count > 0 && !cartOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setCartOpen(true)}
            className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(249,87,33,0.6)] flex items-center gap-2.5 transition-all transform hover:scale-105 cursor-pointer border border-amber-300/30"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Basket ({count})</span>
          </button>
        </div>
      )}
    </div>
  );
}
