import { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle, MapPin, ShieldCheck, Bike, Store } from 'lucide-react';
import { BranchId, BranchInfo, CartItem, CustomerDetails } from './types';
import { calculateCartTotal, calculateItemSubtotal, formatRand, generateWhatsAppMessage } from './utils/order';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  branch: BranchInfo;
  onBranch: (id: BranchId) => void;
  onQty: (cartItemId: string, delta: number) => void;
  onRemove: (cartItemId: string) => void;
  onClear: () => void;
  onSent: (message: string) => void;
}

const toggle = (active: boolean) =>
  `py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
    active ? 'bg-orange-950/60 border-orange-500 text-orange-400' : 'bg-stone-900 border-stone-800 text-stone-400'
  }`;
const field = 'w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500';
const qtyBtn = 'w-6 h-6 rounded-md bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center text-xs cursor-pointer';

export function Cart({ isOpen, onClose, items, branch, onBranch, onQty, onRemove, onClear, onSent }: CartProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'collection' | 'delivery'>('collection');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const checkout = () => {
    if (items.length === 0) return;
    // Phone and kitchen notes have no input in the UI, so they're always sent empty, as in the original.
    const customer: CustomerDetails = { name, phone: '', type, address, notes: '' };
    const message = generateWhatsAppMessage(items, branch, customer);
    window.open(`https://wa.me/${branch.phone}?text=${encodeURIComponent(message)}`, '_blank');
    onSent(message);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity" />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141312] border-l border-stone-800 shadow-2xl flex flex-col">
          <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between bg-[#161514]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="font-serif font-bold text-lg text-white">Your Order Basket</h2>
              <span className="bg-orange-950/80 text-orange-400 border border-orange-700/60 text-xs px-2 py-0.5 rounded-full font-mono font-bold">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 cursor-pointer" aria-label="Close cart">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-white mb-1">Your Basket is Empty</h3>
                <p className="text-stone-400 text-xs max-w-xs mb-6">Add some woodfired MEGS or Cape Suburb pizzas from our menu to begin.</p>
                <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-orange-400 border border-stone-700 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer">
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs text-stone-400">
                  <span>Items</span>
                  <button onClick={onClear} className="text-stone-500 hover:text-red-400 flex items-center gap-1 cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                </div>

                {items.map((item) => (
                  <div key={item.cartItemId} className="bg-stone-900/80 border border-stone-800/90 rounded-xl p-3.5 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-sm text-white">{item.name}</div>
                        <div className="text-xs text-amber-400 font-mono mt-0.5">{formatRand(item.price)} each</div>
                      </div>
                      <div className="font-serif font-bold text-sm text-white">{formatRand(calculateItemSubtotal(item))}</div>
                    </div>

                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <div className="text-[11px] text-stone-400 space-y-0.5 pl-2 border-l border-stone-700">
                        {item.selectedOptions.map((opt, i) => (
                          <div key={i}>
                            {opt.optionName}: <span className="text-stone-200">{opt.choiceLabel}</span>
                            {opt.extraPrice > 0 && ` (+${formatRand(opt.extraPrice)})`}
                          </div>
                        ))}
                      </div>
                    )}

                    {item.notes && <div className="text-[11px] text-stone-400 italic">Note: "{item.notes}"</div>}

                    <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                      <button onClick={() => onRemove(item.cartItemId)} className="text-stone-500 hover:text-red-400 p-1" title="Remove item">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onQty(item.cartItemId, -1)} className={qtyBtn} aria-label="Decrease quantity">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs text-white w-5 text-center">{item.qty}</span>
                        <button onClick={() => onQty(item.cartItemId, 1)} className={qtyBtn} aria-label="Increase quantity">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 bg-[#171615] border-t border-stone-800 space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  Select Branch For WhatsApp:
                </label>
                <select
                  value={branch.id}
                  onChange={(e) => onBranch(e.target.value as BranchId)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="gp">Grassy Park (34 Victoria Rd) — 062 885 9986</option>
                  <option value="kb">Kromboom (134 Kromboom Rd) — 061 620 2816</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setType('collection')} className={toggle(type === 'collection')}>
                  <Store className="w-3.5 h-3.5" />
                  <span>Pickup / Collection</span>
                </button>
                <button type="button" onClick={() => setType('delivery')} className={toggle(type === 'delivery')}>
                  <Bike className="w-3.5 h-3.5" />
                  <span>Delivery</span>
                </button>
              </div>

              <div className="space-y-2">
                <input type="text" placeholder="Your Name (Optional)" value={name} onChange={(e) => setName(e.target.value)} className={field} />
                {type === 'delivery' && (
                  <input type="text" placeholder="Delivery Address in Cape Town" value={address} onChange={(e) => setAddress(e.target.value)} className={field} />
                )}
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 uppercase font-semibold block">Estimated Total</span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 100% Strictly Halaal
                  </span>
                </div>
                <div className="font-serif font-black text-2xl text-amber-400">{formatRand(calculateCartTotal(items))}</div>
              </div>

              <button
                onClick={checkout}
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Order to WhatsApp</span>
              </button>

              <p className="text-[11px] text-stone-400 text-center">Opens WhatsApp with your items pre-formatted for instant kitchen confirmation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
