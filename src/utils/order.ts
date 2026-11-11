import { CartItem, BranchInfo, BranchId, CustomerDetails } from '../types';

// Opening hours as [open, close] in 24h SAST. Index 0 = Sun–Thu, index 1 = Fri–Sat.
const HOURS: Record<BranchId, [number, number][]> = {
  gp: [[11, 21], [10, 23]],
  kb: [[12, 21], [12, 22]],
};

export const calculateItemSubtotal = (item: CartItem): number =>
  (item.price + (item.selectedOptions || []).reduce((s, o) => s + (o.extraPrice || 0), 0)) * item.qty;

export const calculateCartTotal = (items: CartItem[]): number =>
  items.reduce((s, i) => s + calculateItemSubtotal(i), 0);

export const formatRand = (amount: number): string => `R ${amount.toFixed(2)}`;

export function generateWhatsAppMessage(items: CartItem[], branch: BranchInfo, customer?: CustomerDetails): string {
  if (items.length === 0) return '';

  const timeStr = new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
  const line = '--------------------------------\n';

  let msg = `*NEW ORDER - MANIES WOODFIRE PIZZA*\n*Branch:* ${branch.name}\n*Time:* ${timeStr}\n${line}`;

  if (customer && customer.name.trim()) {
    msg += `*Customer:* ${customer.name.trim()}\n`;
    if (customer.phone.trim()) msg += `*Contact:* ${customer.phone.trim()}\n`;
    msg += `*Order Type:* ${customer.type === 'delivery' ? 'Delivery' : 'Collection / Pickup'}\n`;
    if (customer.type === 'delivery' && customer.address?.trim()) msg += `*Delivery Address:* ${customer.address.trim()}\n`;
    if (customer.notes?.trim()) msg += `*Kitchen Notes:* ${customer.notes.trim()}\n`;
    msg += line;
  }

  msg += `*ORDER DETAILS:*\n`;
  items.forEach((item) => {
    msg += `• *${item.qty}x ${item.name}* — ${formatRand(calculateItemSubtotal(item))}\n`;
    (item.selectedOptions || []).forEach((opt) => {
      msg += `   └ ${opt.optionName}: ${opt.choiceLabel}${opt.extraPrice > 0 ? ` (+R ${opt.extraPrice})` : ''}\n`;
    });
    if (item.notes?.trim()) msg += `   └ Note: "${item.notes.trim()}"\n`;
  });

  msg += line;
  msg += `*TOTAL ESTIMATE:* ${formatRand(calculateCartTotal(items))}\n\n`;
  msg += `*100% Strictly Halaal*\nPlease reply with preparation time and payment/collection details. Shukran!`;
  return msg;
}

export const generateWhatsAppUrl = (items: CartItem[], branch: BranchInfo, customer?: CustomerDetails): string =>
  `https://wa.me/${branch.phone}?text=${encodeURIComponent(generateWhatsAppMessage(items, branch, customer))}`;

// Cape Town is UTC+2 year-round (SAST), so offset manually rather than trusting the host timezone.
export function isBranchOpen(id: BranchId, date: Date = new Date()): { isOpen: boolean; statusText: string } {
  const sastHours = (date.getUTCHours() + 2) % 24;
  const sastDay = (date.getUTCDay() + (date.getUTCHours() + 2 >= 24 ? 1 : 0)) % 7; // 0=Sun, 5=Fri, 6=Sat
  const [open, close] = HOURS[id][sastDay === 5 || sastDay === 6 ? 1 : 0];
  const fmt = (h: number) => `${h % 12 || 12}:00 ${h < 12 ? 'AM' : 'PM'}`;

  return sastHours >= open && sastHours < close
    ? { isOpen: true, statusText: `Open now until ${fmt(close)}` }
    : { isOpen: false, statusText: `Opens at ${fmt(open)}` };
}
