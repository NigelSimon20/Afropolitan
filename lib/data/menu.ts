import type { MenuCategory, MenuCategoryId, MenuItem } from '@/lib/types';

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    tagline: 'Slow mornings, strong coffee and a plate that earns the day.',
    served: '8:00 AM – 12:00 PM',
  },
  {
    id: 'braai-mains',
    label: 'Braai & Mains',
    tagline: 'Open flame, hardwood coals, and cuts worth queueing for.',
    served: '12:00 PM – 11:00 PM',
  },
  {
    id: 'gelato',
    label: 'Gelato',
    tagline: 'Churned in-house daily — African flavours, Italian technique.',
    served: 'All day',
  },
  {
    id: 'drinks',
    label: 'Drinks',
    tagline: 'From sunrise espresso to 3 AM cocktails.',
    served: 'All day & late',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  /* ------------------------------ Breakfast ------------------------------ */
  {
    id: 'bf-01',
    name: 'Afropolitan Full Braai Breakfast',
    description:
      'Boerewors, flame-grilled tomato, smashed avocado, two eggs your way and charcoal-toasted sourdough.',
    price: 12.5,
    category: 'breakfast',
    image: '/media/menu/full-breakfast.jpg',
    signature: true,
  },
  {
    id: 'bf-02',
    name: 'Sadza & Eggs',
    description:
      'Crisped white maize sadza cakes, slow-cooked tomato-onion relish, poached eggs and coriander.',
    price: 8.0,
    category: 'breakfast',
    image: '/media/menu/sadza-eggs.jpg',
    tags: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'bf-03',
    name: 'Peri-Peri Shakshuka',
    description:
      'Eggs baked in a smoked pepper and Bird’s-eye chilli sugo with feta and warm flatbread.',
    price: 9.5,
    category: 'breakfast',
    image: '/media/menu/shakshuka.jpg',
    tags: ['vegetarian', 'spicy'],
  },
  {
    id: 'bf-04',
    name: 'Baobab & Banana Pancakes',
    description: 'Buttermilk stack, baobab curd, caramelised banana and a drizzle of forest honey.',
    price: 7.5,
    category: 'breakfast',
    image: '/media/menu/pancakes.jpg',
    tags: ['vegetarian'],
  },
  {
    id: 'bf-05',
    name: 'Harare Benedict',
    description:
      'Toasted brioche, hot-smoked Kariba bream, poached eggs and a lemon-thyme hollandaise.',
    price: 11.0,
    category: 'breakfast',
    image: '/media/menu/benedict.jpg',
  },
  {
    id: 'bf-06',
    name: 'Green Garden Bowl',
    description:
      'Avocado, charred greens, roasted sweet potato, toasted seeds and a herbed yoghurt dressing.',
    price: 8.5,
    category: 'breakfast',
    image: '/media/menu/green-bowl.jpg',
    tags: ['vegetarian', 'gluten-free'],
  },

  /* ---------------------------- Braai & Mains ---------------------------- */
  {
    id: 'br-01',
    name: 'The Afropolitan Braai Platter',
    description:
      'Beef short rib, lamb chops, boerewors coil and peri-peri chicken over coals. Served with sadza, chakalaka and grilled corn. Feeds two.',
    price: 42.0,
    category: 'braai-mains',
    image: '/media/menu/braai-platter.jpg',
    signature: true,
  },
  {
    id: 'br-02',
    name: 'Flame-Grilled Peri-Peri Chicken',
    description:
      'Half chicken marinated 24 hours in Bird’s-eye chilli, garlic and citrus. Choose mild, hot or Harare hot.',
    price: 16.0,
    category: 'braai-mains',
    image: '/media/menu/peri-chicken.jpg',
    tags: ['spicy', 'gluten-free'],
  },
  {
    id: 'br-03',
    name: 'Matabeleland Beef Short Rib',
    description:
      'Twelve-hour smoked short rib glazed in a gold-rum and tamarind lacquer, burnt-onion jus.',
    price: 24.0,
    category: 'braai-mains',
    image: '/media/menu/short-rib.jpg',
    signature: true,
  },
  {
    id: 'br-04',
    name: 'Whole Grilled Kariba Bream',
    description:
      'Butterflied over hardwood, dressed with lime, chilli butter and fresh herbs. Served with rice.',
    price: 19.5,
    category: 'braai-mains',
    image: '/media/menu/bream.jpg',
    tags: ['gluten-free'],
  },
  {
    id: 'br-05',
    name: 'Smoked Boerewors & Pap',
    description: 'House-ground farmhouse wors, creamy pap, chakalaka and a tomato-onion gravy.',
    price: 13.0,
    category: 'braai-mains',
    image: '/media/menu/boerewors.jpg',
  },
  {
    id: 'br-06',
    name: 'Braaied Cauliflower Steak',
    description:
      'Charred cauliflower, muhacha-nut romesco, pomegranate and crisp kale. Fully plant-based.',
    price: 12.0,
    category: 'braai-mains',
    image: '/media/menu/cauliflower.jpg',
    tags: ['vegan', 'contains-nuts'],
  },
  {
    id: 'br-07',
    name: 'Grill-House Burger',
    description:
      'Double flame-seared patty, smoked cheddar, caramelised onion, peri-peri mayo, brioche bun.',
    price: 14.0,
    category: 'braai-mains',
    image: '/media/menu/burger.jpg',
  },
  {
    id: 'br-08',
    name: 'Lamb Chops & Chimichurri',
    description: 'Three thick-cut chops over coals with a parsley, mint and green-chilli chimichurri.',
    price: 22.0,
    category: 'braai-mains',
    image: '/media/menu/lamb-chops.jpg',
    tags: ['gluten-free'],
  },

  /* ------------------------------- Gelato -------------------------------- */
  {
    id: 'gl-01',
    name: 'Salted Baobab Caramel',
    description: 'Tangy baobab fruit swirled through a deep salted caramel base.',
    price: 4.5,
    category: 'gelato',
    image: '/media/menu/baobab-gelato.jpg',
    tags: ['vegetarian'],
    signature: true,
  },
  {
    id: 'gl-02',
    name: 'Roasted Macadamia & Honey',
    description: 'Zimbabwean macadamias roasted dark, folded into acacia-honey gelato.',
    price: 4.5,
    category: 'gelato',
    image: '/media/menu/macadamia-gelato.jpg',
    tags: ['vegetarian', 'contains-nuts'],
  },
  {
    id: 'gl-03',
    name: 'Bitter Cocoa & Chilli',
    description: '70% single-origin cocoa with a slow, warm Bird’s-eye finish.',
    price: 5.0,
    category: 'gelato',
    image: '/media/menu/cocoa-gelato.jpg',
    tags: ['vegetarian', 'spicy'],
  },
  {
    id: 'gl-04',
    name: 'Mazoe Orange Sorbet',
    description: 'The nostalgic one. Bright, citrus-forward and completely dairy-free.',
    price: 4.0,
    category: 'gelato',
    image: '/media/menu/mazoe-sorbet.jpg',
    tags: ['vegan', 'gluten-free'],
  },
  {
    id: 'gl-05',
    name: 'Marula Cream Affogato',
    description: 'Double espresso poured over vanilla gelato with a shot of marula cream liqueur.',
    price: 7.0,
    category: 'gelato',
    image: '/media/menu/affogato.jpg',
    tags: ['vegetarian'],
  },
  {
    id: 'gl-06',
    name: 'Coconut & Passionfruit',
    description: 'Silky coconut gelato rippled with sharp passionfruit curd.',
    price: 4.5,
    category: 'gelato',
    image: '/media/menu/coconut-gelato.jpg',
    tags: ['vegan'],
  },

  /* -------------------------------- Drinks ------------------------------- */
  {
    id: 'dr-01',
    name: 'Harare Sundowner',
    description:
      'Gin, hibiscus, rooibos syrup and grapefruit. Built to be drunk facing the sunset.',
    price: 9.0,
    category: 'drinks',
    image: '/media/menu/sundowner.jpg',
    signature: true,
  },
  {
    id: 'dr-02',
    name: 'Smoked Marula Old Fashioned',
    description: 'Bourbon, marula, bitters and a hardwood-smoke finish poured tableside.',
    price: 11.0,
    category: 'drinks',
    image: '/media/menu/old-fashioned.jpg',
  },
  {
    id: 'dr-03',
    name: 'Afrobeat Spritz',
    description: 'Sparkling wine, amarula-orange cordial, soda and a burnt-citrus twist.',
    price: 8.5,
    category: 'drinks',
    image: '/media/menu/spritz.jpg',
  },
  {
    id: 'dr-04',
    name: 'Single-Origin Espresso',
    description: 'Roasted weekly in Harare. Also available as flat white, cortado or cold brew.',
    price: 3.0,
    category: 'drinks',
    image: '/media/menu/espresso.jpg',
    tags: ['vegan'],
  },
  {
    id: 'dr-05',
    name: 'Zvipfukuto Craft Lager',
    description: 'Crisp local craft lager on tap. Draught pint or bucket of five bottles.',
    price: 4.0,
    category: 'drinks',
    image: '/media/menu/lager.jpg',
    tags: ['vegan'],
  },
  {
    id: 'dr-06',
    name: 'Baobab Cooler (0%)',
    description: 'Baobab, lime, mint and soda over crushed ice. Zero proof, full flavour.',
    price: 5.0,
    category: 'drinks',
    image: '/media/menu/baobab-cooler.jpg',
    tags: ['vegan', 'gluten-free'],
  },
  {
    id: 'dr-07',
    name: 'Bottle Service — Gold Table',
    description:
      'Premium spirit, mixers, ice service and a reserved booth for up to six. Thu–Sat only.',
    price: 120.0,
    category: 'drinks',
    image: '/media/menu/bottle-service.jpg',
  },
];

/** Filter helper used by the interactive menu. */
export function getMenuItemsByCategory(category: MenuCategoryId): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === category);
}

/** Chef's picks used on the home page. */
export const SIGNATURE_ITEMS: MenuItem[] = MENU_ITEMS.filter((item) => item.signature);
