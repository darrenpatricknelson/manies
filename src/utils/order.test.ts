import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateItemSubtotal,
  calculateCartTotal,
  formatRand,
  generateWhatsAppMessage,
  generateWhatsAppUrl,
  isBranchOpen
} from './order';
import { CartItem, BranchInfo } from '../types';

const mockBranchGP: BranchInfo = {
  id: 'gp',
  name: 'Grassy Park (Flagship)',
  shortName: 'Grassy Park',
  address: '34 Victoria Road, Grassy Park',
  phone: '27628859986',
  phoneDisplay: '+27 62 885 9986',
  mapsUrl: 'https://maps.google.com',
  hoursSunThu: '11:00 AM – 21:00 PM',
  hoursFriSat: '10:00 AM – 23:00 PM',
  isFlagship: true,
};

test('calculateItemSubtotal calculates base and options correctly', () => {
  const item: CartItem = {
    id: 1,
    cartItemId: '1-test',
    name: 'The Seared Steak MEG',
    price: 155,
    qty: 2,
    category: 'megs',
    selectedOptions: [
      { optionName: 'Garlic Glaze', choiceLabel: 'Double Garlic Butter', extraPrice: 15 }
    ]
  };

  // (155 + 15) * 2 = 340
  assert.equal(calculateItemSubtotal(item), 340);
});

test('calculateCartTotal sums multiple items correctly', () => {
  const items: CartItem[] = [
    { id: 1, cartItemId: '1', name: 'The Seared Steak MEG', price: 155, qty: 1, category: 'megs' },
    { id: 5, cartItemId: '5', name: 'District Six Pizza', price: 185, qty: 2, category: 'hoods' }
  ];

  // 155 + (185 * 2) = 525
  assert.equal(calculateCartTotal(items), 525);
  assert.equal(formatRand(525), 'R 525.00');
});

test('generateWhatsAppMessage includes brand, branch, items, and total', () => {
  const items: CartItem[] = [
    { id: 1, cartItemId: '1', name: 'The Seared Steak MEG', price: 155, qty: 1, category: 'megs', notes: 'Crispy edges please' }
  ];

  const msg = generateWhatsAppMessage(items, mockBranchGP, {
    name: 'Nazeem',
    phone: '0821234567',
    type: 'collection',
  });

  assert.ok(msg.includes('MANIES WOODFIRE PIZZA'));
  assert.ok(msg.includes('Grassy Park (Flagship)'));
  assert.ok(msg.includes('Nazeem'));
  assert.ok(msg.includes('The Seared Steak MEG'));
  assert.ok(msg.includes('R 155.00'));
  assert.ok(msg.includes('Crispy edges please'));
});

test('generateWhatsAppUrl produces valid WhatsApp link with phone number and text', () => {
  const items: CartItem[] = [
    { id: 2, cartItemId: '2', name: 'Spicy Grilled Chicken MEG', price: 145, qty: 1, category: 'megs' }
  ];

  const url = generateWhatsAppUrl(items, mockBranchGP);
  assert.ok(url.startsWith('https://wa.me/27628859986?text='));
  assert.ok(url.includes('MANIES'));
});

test('isBranchOpen correctly handles mock hour intervals', () => {
  // Monday 14:00 UTC = 16:00 SAST -> open
  assert.equal(isBranchOpen('gp', new Date('2026-11-09T14:00:00Z')).isOpen, true);
  // Monday 02:00 UTC = 04:00 SAST -> closed
  assert.equal(isBranchOpen('gp', new Date('2026-11-09T02:00:00Z')).isOpen, false);
});
