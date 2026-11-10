import { BranchId, BranchInfo, MenuItem, OptionGroup } from './types';

const g = (name: string, ...c: [string, number][]): OptionGroup =>
  ({ name, choices: c.map(([label, extraPrice]) => ({ label, extraPrice })) });
const u = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const BRANCHES: Record<BranchId, BranchInfo> = {
  gp: {
    id: 'gp',
    name: 'Grassy Park (Flagship)',
    shortName: 'Grassy Park',
    address: '34 Victoria Road, Grassy Park, Cape Town, 7941',
    phone: '27628859986',
    phoneDisplay: '+27 62 885 9986',
    mapsUrl: 'https://maps.google.com/?q=34+Victoria+Rd,+Grassy+Park,+Cape+Town',
    hoursSunThu: '11:00 AM – 21:00 PM',
    hoursFriSat: '10:00 AM – 23:00 PM',
    isFlagship: true,
  },
  kb: {
    id: 'kb',
    name: 'Kromboom (Crawford / Athlone)',
    shortName: 'Kromboom',
    address: 'Shop 8, 134 Kromboom Rd (Cnr Jan Smuts Dr), Crawford, Cape Town',
    phone: '27616202816',
    phoneDisplay: '+27 61 620 2816',
    mapsUrl: 'https://maps.google.com/?q=134+Kromboom+Road,+Crawford,+Cape+Town',
    hoursSunThu: '12:00 PM – 21:00 PM',
    hoursFriSat: '12:00 PM – 22:00 PM',
    isFlagship: false,
  },
};

export const MENU_ITEMS: MenuItem[] = [
  // THE VIRAL MEGS
  {
    id: 1, category: 'megs', name: 'The Seared Steak MEG', price: 155, tag: 'Viral Bestseller',
    desc: 'Tightly rolled woodfire pizza crust packed with tender pepper steak, mushrooms, red onion, and melted cheese, basted with glossy garlic butter & served in our brown paper bag with crispy spiced nachos.',
    img: u('1593560708920-61dd98c46a4e'), popular: true,
    ingredients: ['Tender Pepper Steak', 'Portobello Mushrooms', 'Red Onion', 'Melted Mozzarella', 'Hot Garlic Herb Butter Glaze', 'Crispy Spiced Nachos'],
    options: [
      g('Garlic Glaze Level', ['Original Herb Garlic Glaze', 0], ['Double Garlic Butter Splash', 15], ['Fiery Chili Garlic Glaze', 12]),
      g('Extra Melted Cheese', ['Standard Double Mozzarella', 0], ['Extra Melted Mozzarella', 22], ['Creamy Danish Feta Crumbles', 18]),
      g('Sides & Nachos', ['Standard Spiced Nachos', 0], ['Extra Large Nachos Portion', 25], ['Add Extra Creamy Garlic Aioli Dip', 15]),
    ],
  },
  {
    id: 2, category: 'megs', name: 'Spicy Grilled Chicken MEG', price: 145, tag: 'Cape Favourite',
    desc: 'Rolled pizza filled with spiced marinated chicken fillet, sautéed sweet peppers, creamy Danish feta, and double mozzarella, finished with hot garlic glaze & crunchy nachos.',
    img: u('1628840042765-356cda07504e'), spicy: true, popular: true,
    ingredients: ['Spiced Chicken Fillet', 'Sweet Peppers', 'Danish Feta', 'Mozzarella', 'Garlic Herb Glaze', 'Crispy Nachos'],
    options: [
      g('Heat & Spice Level', ['Medium Cape Spice', 0], ['Extra Fiery Bird’s-Eye Chili', 10], ['Mild (Gentle Herb Spice)', 0]),
      g('Garlic Glaze Level', ['Original Herb Garlic Glaze', 0], ['Double Garlic Butter Splash', 15], ['Lemon Herb Garlic Glaze', 12]),
      g('Cheese & Sides', ['Standard Nachos & Cheese', 0], ['Extra Melted Mozzarella', 22], ['Extra Large Nachos Portion', 25], ['Add Extra Garlic Aioli Dip', 15]),
    ],
  },
  {
    id: 3, category: 'megs', name: 'Manenberg Spicy MEG', price: 160, tag: 'Hot & Fiery',
    desc: 'Spicy seasoned steak, Kaapse beans, red peppers, fiery bird’s-eye chillies, and oozing cheese rolled tight, baked over hardwood coals, and served in our brown paper bag with nachos.',
    img: u('1565299624946-b28f40a0ae38'), spicy: true,
    ingredients: ['Spicy Seasoned Steak', 'Kaapse Braised Beans', 'Red Bell Peppers', 'Fiery Chillies', 'Garlic Butter Glaze', 'Nachos'],
    options: [
      g('Fire Intensity', ['Authentic Kaapse Heat', 0], ['Blazing Hot (Extra Bird’s-Eye Chillies)', 12], ['Tamed Heat (Mild Chillies)', 0]),
      g('Garlic Glaze Style', ['Original Garlic Butter Glaze', 0], ['Double Garlic Butter Splash', 15]),
      g('Topping Add-ons', ['Standard Kaapse Beans & Steak', 0], ['Extra Sliced Pickled Jalapeños', 12], ['Extra Melted Mozzarella Layer', 22], ['Extra Spiced Nachos Portion', 25]),
    ],
  },
  {
    id: 4, category: 'megs', name: 'Cheesy Trio MEG (Vegetarian)', price: 138, tag: 'Cheese Lover',
    desc: 'Rolled woodfire pizza filled with generous layers of imported mozzarella, yellow mature cheddar, and creamy Danish feta with slow-simmered oregano sauce & side nachos.',
    img: u('1574071318508-1cdbab80d002'), vegetarian: true,
    ingredients: ['Imported Mozzarella', 'Mature Cheddar', 'Creamy Feta', 'Napolitana Sauce', 'Garlic Herb Glaze', 'Nachos'],
    options: [
      g('Cheese Selection', ['Signature Trio (Mozzarella, Cheddar & Feta)', 0], ['Extra Dense Mozzarella String Pull', 22], ['Extra Danish Feta Crumbles', 18]),
      g('Garlic Herb Glaze', ['Original Fresh Garlic Herb Butter', 0], ['Double Garlic Butter Glaze', 15], ['Extra Virgin Olive Oil & Wild Oregano', 0]),
      g('Veggie Add-ons', ['Keep Classic Cheesy', 0], ['Add Sautéed Mushrooms', 16], ['Add Sweet Peppadews', 14], ['Add Pickled Jalapeños', 12]),
    ],
  },

  // CAPE SUBURB PIZZAS
  {
    id: 5, category: 'hoods', name: 'District Six Pizza', price: 185, tag: 'Cape Icon',
    desc: 'Tender grilled lamb chops, fresh sliced mushrooms, red onion, and creamy Danish feta, topped with Manies secret garlic herb drizzle on a charred wood-fired base.',
    img: u('1513104890138-7c749659a591'), popular: true,
    ingredients: ['Grilled Lamb Chops', 'Sliced Mushrooms', 'Red Onion', 'Danish Feta', 'Manies Garlic Drizzle', 'Woodfired Crust'],
    options: [
      g('Crust Style', ['Authentic 450°C Leopard Blister Crust', 0], ['Extra Charred Crispy Base', 0], ['Garlic Herb Butter Brushed Crust', 15]),
      g('Cheese & Topping Boost', ['Classic Grilled Lamb & Feta', 0], ['Extra Melted Mozzarella', 22], ['Extra Danish Feta', 18], ['Extra Portobello Mushrooms', 16]),
      g('Finishing Drizzle', ['Manies Secret Garlic Herb Drizzle', 0], ['Cape Chili Infused Garlic Oil', 10], ['Fresh Wild Rocket Portion on Top', 14]),
    ],
  },
  {
    id: 6, category: 'hoods', name: 'Plumstead Chicken Pizza', price: 149, tag: 'Crowd Pleaser',
    desc: 'Smoky BBQ tender chicken strips, crumbled Danish feta, crisp red onions, and melted mozzarella over slow-simmered Napolitana tomato base.',
    img: u('1590947132387-155cc02f3212'),
    ingredients: ['Smoky BBQ Chicken', 'Crumbled Feta', 'Crisp Red Onion', 'Mozzarella', 'Herb Napolitana'],
    options: [
      g('Crust Style', ['Classic Woodfire Hearth Crust', 0], ['Thin & Extra Crispy Base', 0], ['Garlic Butter Brushed Crust', 15]),
      g('Extra Toppings', ['Standard BBQ Chicken & Feta', 0], ['Extra Smoky BBQ Chicken Strips', 28], ['Extra Melted Mozzarella', 22], ['Sweet Peppadews', 14]),
      g('Sauce Drizzle', ['Smoky BBQ Sauce Swirl', 0], ['Hot Honey & Garlic Glaze', 15], ['Extra Garlic Herb Drizzle', 10]),
    ],
  },
  {
    id: 7, category: 'hoods', name: 'Wynberg Steak Pizza', price: 165, tag: 'Signature',
    desc: 'Tender strips of seasoned pepper steak, fresh portobello mushrooms, green bell peppers, sweet red onion, and rich mozzarella on blistered sourdough.',
    img: u('1534308983496-4fabb1a015ee'), popular: true,
    ingredients: ['Pepper Steak Strips', 'Portobello Mushrooms', 'Green Bell Peppers', 'Red Onion', 'Mozzarella'],
    options: [
      g('Crust Style', ['Sourdough Woodfire Crust', 0], ['Extra Crispy Hearth Crust', 0], ['Crushed Garlic Butter Crust', 15]),
      g('Meat & Cheese Additions', ['Standard Tender Pepper Steak', 0], ['Double Pepper Steak Portion', 35], ['Extra Melted Mozzarella', 22], ['Creamy Danish Feta Crumbles', 18]),
      g('Pepper & Heat Kick', ['Mild Black Pepper Aroma', 0], ['Spiced Kaapse Chili Kick', 10], ['Add Sliced Pickled Jalapeños', 12]),
    ],
  },
  {
    id: 8, category: 'hoods', name: 'Mitchells Plain Meat', price: 155, tag: 'Unique Flavour',
    desc: 'Smokey BBQ sausage, fresh sweet banana slices, caramelized onions, fresh wild rocket, and a sticky balsamic reduction glaze.',
    img: u('1588315029754-2dd089d39a1a'),
    ingredients: ['Smoky BBQ Sausage', 'Sweet Banana Slices', 'Caramelized Onions', 'Wild Rocket', 'Balsamic Reduction'],
    options: [
      g('Crust Preparation', ['Authentic Woodfire Hearth Crust', 0], ['Extra Crispy Base', 0], ['Garlic Butter Brushed Cornicione', 15]),
      g('Flavour Balance & Additions', ['Classic Sweet Banana & Sausage', 0], ['Extra Caramelized Balsamic Onions', 14], ['Extra Smoky Sausage Slices', 25], ['Extra Melted Mozzarella', 22]),
      g('Glaze Finish', ['Sticky Balsamic Reduction Glaze', 0], ['Sweet Chili Garlic Glaze', 10], ['Extra Wild Rocket Leaves', 10]),
    ],
  },
  {
    id: 9, category: 'hoods', name: 'Bo-Kaap Spicy Delight', price: 150, tag: 'Cape Malay Spice',
    desc: 'Spiced mince, pickled jalapeños, sweet peppadews, red onion, fresh coriander, and double melted mozzarella for that authentic Cape Malay kick.',
    img: u('1571997478779-2adcbbe9ab2f'), spicy: true,
    ingredients: ['Spiced Mince', 'Pickled Jalapeños', 'Sweet Peppadews', 'Red Onion', 'Coriander', 'Double Mozzarella'],
    options: [
      g('Spice & Heat Level', ['Cape Malay Traditional Spice', 0], ['Extra Hot Bird’s-Eye Chillies', 10], ['Mild Malay Spice', 0]),
      g('Cheese & Meat Boost', ['Double Mozzarella (Included)', 0], ['Extra Spiced Mince', 26], ['Extra Sweet Peppadews', 14], ['Extra Danish Feta', 18]),
      g('Finish & Drizzle', ['Fresh Garden Coriander', 0], ['Creamy Garlic Aioli Drizzle', 12], ['Chili Infused Extra Virgin Olive Oil', 10]),
    ],
  },

  // VEGETARIAN
  {
    id: 10, category: 'veg', name: 'Heathfield Roast Veg', price: 145, tag: 'Vegetarian',
    desc: 'Roasted sweet butternut, tender baby marrow, sautéed mushrooms, caramelized onions, sweet peppadews, and Danish feta on our signature dough.',
    img: u('1594007654729-407eedc4be65'), vegetarian: true,
    ingredients: ['Roasted Butternut', 'Baby Marrow', 'Sautéed Mushrooms', 'Caramelized Onions', 'Peppadews', 'Feta'],
    options: [
      g('Crust & Base', ['Blistered Sourdough Base', 0], ['Extra Crispy Hearth Crust', 0], ['Garlic & Herb Butter Brushed Crust', 15]),
      g('Cheese Selection', ['Danish Feta & Mozzarella Blend', 0], ['Extra Danish Feta', 18], ['Extra Mozzarella Layer', 22], ['Vegan Dairy-Free Mozzarella', 18]),
      g('Extra Roasted Veggies', ['Standard Roast Veg Selection', 0], ['Extra Sweet Butternut & Marrow', 16], ['Extra Portobello Mushrooms', 16], ['Add Pickled Jalapeños', 12]),
    ],
  },
  {
    id: 11, category: 'veg', name: 'Cheesy Trio Margherita', price: 132, tag: 'Classic',
    desc: 'A rich blend of imported mozzarella, yellow mature cheddar, and creamy feta layered over slow-cooked oregano Napolitana tomato base.',
    img: u('1574071318508-1cdbab80d002'), vegetarian: true,
    ingredients: ['Mozzarella', 'Mature Cheddar', 'Feta', 'Napolitana Sauce', 'Fresh Basil'],
    options: [
      g('Crust Style', ['Traditional Neapolitan Blister Crust', 0], ['Extra Thin & Crispy Base', 0], ['Garlic Butter Brushed Edge', 15]),
      g('Cheese Blend Density', ['Classic Three Cheese Blend', 0], ['Extra Double Mozzarella Layer', 24], ['Extra Sharp Mature Cheddar', 18], ['Extra Creamy Danish Feta', 18]),
      g('Herbs & Finish', ['Fresh Wild Basil & EVOO', 0], ['Crushed Garlic Butter Splash', 12], ['Hot Chili Flakes & Oregano', 0]),
    ],
  },
  {
    id: 12, category: 'veg', name: 'Woodfire Garlic Chita Bread', price: 65, tag: 'Starter Star',
    desc: 'Puffed woodfire flatbread brushed with copious amounts of crushed garlic butter, sea salt, dried oregano, and melted mozzarella cheese.',
    img: u('1585238342024-78d387f4a707'), vegetarian: true,
    ingredients: ['Woodfired Chita Flatbread', 'Crushed Garlic Butter', 'Melted Mozzarella', 'Sea Salt', 'Wild Oregano'],
    options: [
      g('Garlic Butter Intensity', ['Generous Crushed Garlic Butter', 0], ['Heavy Garlic Lovers Splash', 12], ['Chili Infused Garlic Butter', 10]),
      g('Cheese & Topping Add-ons', ['Melted Mozzarella & Oregano', 0], ['Double Loaded Mozzarella', 20], ['Add Danish Feta & Peppadews', 18], ['Add Sliced Pickled Jalapeños', 12]),
      g('Dip Pairing', ['No Extra Dip', 0], ['Add Creamy Garlic Aioli Dip', 15], ['Add Sweet Chili Mayo Dip', 15]),
    ],
  },

  // SHAKES & DESSERTS
  {
    id: 13, category: 'shakes', name: 'Blueberry Cheesecake Shake', price: 75, tag: 'Cult Favourite',
    desc: 'Ultra-thick double cream milkshake blended with real blueberry coulis, biscuit crumb base, and cream cheese whip.',
    img: u('1572490122747-3968b75cc699'), popular: true,
    ingredients: ['Double Cream Ice Cream', 'Real Blueberry Coulis', 'Graham Biscuit Crumb', 'Cream Cheese Whip'],
    options: [
      g('Shake Consistency', ['Signature Ultra-Thick Double Cream', 0], ['Extra Thick Spoonable Shake', 10], ['Almond / Oat Milk Alternative', 18]),
      g('Coulis & Biscuit Topping', ['Real Blueberry Coulis & Graham Crumb', 0], ['Extra Blueberry Swirl Layer', 15], ['Double Crushed Biscuit Crumb', 12], ['Extra Cream Cheese Whip Top', 14]),
      g('Straw & Utensil', ['Standard Boba Straw', 0], ['Spoon & Straw Combo', 0]),
    ],
  },
  {
    id: 14, category: 'shakes', name: 'Salted Caramel Loaded Shake', price: 75, tag: 'Sweet & Salty',
    desc: 'Handmade salted butterscotch caramel spun with creamy vanilla soft serve, topped with crushed wafers and fudge pieces.',
    img: u('1541658016709-82535e94bc69'),
    ingredients: ['Salted Butterscotch', 'Creamy Vanilla Soft Serve', 'Crushed Wafers', 'Soft Fudge Chunks'],
    options: [
      g('Shake Texture', ['Double Cream Thickshake', 0], ['Extra Thick Heavy Blend', 10], ['Dairy-Free Milk Substitute', 18]),
      g('Caramel & Loaded Crunch', ['Handmade Salted Butterscotch', 0], ['Extra Warm Caramel Drizzle', 15], ['Double Fudge Chunks & Wafers', 16], ['Crushed Lotus Biscoff Crumb', 14]),
      g('Straw Preference', ['Standard Boba Straw', 0], ['Spoon & Straw Combo', 0]),
    ],
  },
  {
    id: 15, category: 'shakes', name: 'Lotus Biscoff Loaded Sundae', price: 68, tag: 'Dessert',
    desc: 'Warm melted Biscoff spread poured generously over artisan vanilla soft serve with crunchy caramelized Biscoff biscuit crumb.',
    img: u('1517433670267-08bbd4be890f'),
    ingredients: ['Warm Biscoff Spread', 'Artisan Vanilla Soft Serve', 'Caramelized Biscoff Crumb'],
    options: [
      g('Biscoff Spread Level', ['Warm Melted Biscoff Drizzle', 0], ['Double Warm Biscoff Waterfall', 18], ['Extra Biscoff Biscuit Crumb', 12]),
      g('Soft Serve & Additions', ['Creamy Artisan Vanilla Soft Serve', 0], ['Extra Soft Serve Swirl', 15], ['Add Soft Caramel Fudge Cubes', 14], ['Add Crushed Roasted Almonds', 14]),
    ],
  },
];
