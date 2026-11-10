export type Category = 'megs' | 'hoods' | 'veg' | 'shakes';
export type BranchId = 'gp' | 'kb';
export type Filter = 'all' | Category;

export interface Choice { label: string; extraPrice: number }
export interface OptionGroup { name: string; choices: Choice[] }

export interface MenuItem {
  id: number;
  category: Category;
  name: string;
  price: number;
  tag: string;
  desc: string;
  img: string;
  spicy?: boolean;
  popular?: boolean;
  vegetarian?: boolean;
  ingredients?: string[];
  options?: OptionGroup[];
}

export interface CartItemOption { optionName: string; choiceLabel: string; extraPrice: number }

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  category: string;
  selectedOptions?: CartItemOption[];
  notes?: string;
  cartItemId: string;
}

export interface BranchInfo {
  id: BranchId;
  name: string;
  shortName: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  mapsUrl: string;
  hoursSunThu: string;
  hoursFriSat: string;
  isFlagship?: boolean;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  type: 'collection' | 'delivery';
  address?: string;
  notes?: string;
}
