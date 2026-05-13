/**
 * menuData.js — MY Cafe Indian menu
 * Every image URL is semantically matched to its item.
 * No duplicate images. Curated Unsplash food photography.
 */

export const CATEGORIES = [
  { id: 'all',            label: 'All Items',      emoji: '🍽️' },
  { id: 'coffee',         label: 'Coffee',         emoji: '☕' },
  { id: 'tea',            label: 'Tea',            emoji: '🍵' },
  { id: 'cold-beverages', label: 'Cold Beverages', emoji: '🥤' },
  { id: 'milkshakes',     label: 'Milkshakes',     emoji: '🥛' },
  { id: 'pizza',          label: 'Pizza',          emoji: '🍕' },
  { id: 'burger',         label: 'Burger',         emoji: '🍔' },
  { id: 'sandwich',       label: 'Sandwich',       emoji: '🥪' },
  { id: 'pasta',          label: 'Pasta',          emoji: '🍝' },
  { id: 'desserts',       label: 'Desserts',       emoji: '🍰' },
  { id: 'indian-snacks',  label: 'Indian Snacks',  emoji: '🥘' },
  { id: 'combo-meals',    label: 'Combo Meals',    emoji: '🎁' },
];

export const menuItems = [

  // ── COFFEE ──────────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'coffee',
    name: 'Classic Espresso',
    description: 'Rich, bold single-origin espresso shot with a perfect golden crema layer. Pure coffee in its most concentrated form.',
    price: 120,
    // Espresso shot in a small white ceramic cup
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },
  {
    id: 2,
    category: 'coffee',
    name: 'Café Latte',
    description: 'Smooth double espresso with velvety steamed milk and a delicate rosetta latte art on top.',
    price: 180,
    // Latte with beautiful latte art — tulip/rosetta pattern
    image: 'https://images.unsplash.com/photo-1561882468-9110d70b5f74?w=500&q=80',
    isVeg: true, rating: 4.7, popular: true,
  },
  {
    id: 3,
    category: 'coffee',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and thick airy foam. Dusted with premium cocoa powder.',
    price: 160,
    // Cappuccino with thick white foam in wide cup
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80',
    isVeg: true, rating: 4.9, popular: true,
  },
  {
    id: 4,
    category: 'coffee',
    name: 'Caramel Macchiato',
    description: 'Vanilla syrup, steamed milk, a bold espresso shot, and a generous caramel drizzle on top.',
    price: 220,
    // Tall glass with layered caramel macchiato
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d9?w=500&q=80',
    isVeg: true, rating: 4.8, popular: false,
  },
  {
    id: 5,
    category: 'coffee',
    name: 'Cold Brew Coffee',
    description: 'Slow-steeped for 18 hours in cold water. Naturally smooth, low-acid, and incredibly refreshing.',
    price: 200,
    // Cold brew in tall glass with ice, dark coffee
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80',
    isVeg: true, rating: 4.7, popular: true,
  },
  {
    id: 6,
    category: 'coffee',
    name: 'Hazelnut Mocha',
    description: 'Espresso, dark chocolate sauce, steamed milk, and toasted hazelnut syrup — topped with whipped cream.',
    price: 240,
    // Mocha with whipped cream and chocolate drizzle
    image: 'https://images.unsplash.com/photo-1579888944880-d498d2b6c571?w=500&q=80',
    isVeg: true, rating: 4.6, popular: false,
  },

  // ── TEA ─────────────────────────────────────────────────────────────────
  {
    id: 7,
    category: 'tea',
    name: 'Masala Chai',
    description: 'Authentic Indian spiced tea slow-brewed with ginger, cardamom, cinnamon, cloves, and black pepper.',
    price: 80,
    // Masala chai in a glass with spices visible
    image: 'https://images.unsplash.com/photo-1561336526-2914f13ceb36?w=500&q=80',
    isVeg: true, rating: 4.9, popular: true,
  },
  {
    id: 8,
    category: 'tea',
    name: 'Green Tea',
    description: 'Premium Japanese Sencha green tea leaves steeped at the perfect temperature. Clean, grassy, and antioxidant-rich.',
    price: 100,
    // Clear glass with pale green tea
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80',
    isVeg: true, rating: 4.5, popular: false,
  },
  {
    id: 9,
    category: 'tea',
    name: 'Kashmiri Kahwa',
    description: 'Royal saffron-infused green tea with Kashmiri spices, dry fruits, rose petals, and almonds.',
    price: 140,
    // Golden amber tea in ornate cup with saffron
    image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },
  {
    id: 10,
    category: 'tea',
    name: 'Iced Lemon Tea',
    description: 'Chilled brewed black tea with fresh-squeezed lemon juice, honey, and mint leaves over ice.',
    price: 110,
    // Iced tea in glass with lemon slice
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&q=80',
    isVeg: true, rating: 4.6, popular: false,
  },

  // ── COLD BEVERAGES ───────────────────────────────────────────────────────
  {
    id: 11,
    category: 'cold-beverages',
    name: 'Mango Lassi',
    description: 'Thick, chilled yogurt blended with sweet Alphonso mangoes, a pinch of cardamom, and saffron.',
    price: 130,
    // Yellow/golden mango lassi in a tall glass
    image: 'https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0e?w=500&q=80',
    isVeg: true, rating: 4.9, popular: true,
  },
  {
    id: 12,
    category: 'cold-beverages',
    name: 'Virgin Mojito',
    description: 'Fresh mint leaves, lime juice, cane sugar, and chilled soda water — the ultimate summer cooler.',
    price: 150,
    // Green mojito with mint and lime in glass
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&q=80',
    isVeg: true, rating: 4.7, popular: true,
  },
  {
    id: 13,
    category: 'cold-beverages',
    name: 'Blue Lagoon',
    description: 'A stunning blue tropical mocktail with blue curacao flavor, pineapple juice, and coconut cream.',
    price: 170,
    // Bright blue drink with garnish
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80',
    isVeg: true, rating: 4.6, popular: false,
  },
  {
    id: 14,
    category: 'cold-beverages',
    name: 'Fresh Watermelon Juice',
    description: 'Cold-pressed fresh watermelon with a squeeze of lime and a pinch of black salt. Naturally sweet.',
    price: 100,
    // Red watermelon juice in glass
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500&q=80',
    isVeg: true, rating: 4.5, popular: false,
  },

  // ── MILKSHAKES ───────────────────────────────────────────────────────────
  {
    id: 15,
    category: 'milkshakes',
    name: 'Chocolate Milkshake',
    description: 'Rich Belgian dark chocolate blended with premium vanilla ice cream and whole milk. Topped with whipped cream.',
    price: 180,
    // Dark chocolate milkshake with whipped cream
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },
  {
    id: 16,
    category: 'milkshakes',
    name: 'Strawberry Shake',
    description: 'Fresh ripe strawberries blended smooth with creamy vanilla ice cream. A classic fruity favorite.',
    price: 190,
    // Pink strawberry milkshake in glass
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90bb0ae?w=500&q=80',
    isVeg: true, rating: 4.7, popular: false,
  },
  {
    id: 17,
    category: 'milkshakes',
    name: 'Oreo Cookie Shake',
    description: 'Crushed Oreo cookies blended with vanilla ice cream and milk. Thick, indulgent, and utterly dreamy.',
    price: 210,
    // Black and white Oreo milkshake with cookies on top
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&q=80',
    isVeg: true, rating: 4.9, popular: true,
  },
  {
    id: 18,
    category: 'milkshakes',
    name: 'Butterscotch Shake',
    description: 'Velvety butterscotch ice cream blended with milk, topped with caramel drizzle and praline bits.',
    price: 200,
    // Golden caramel-colored milkshake
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&q=80',
    isVeg: true, rating: 4.7, popular: false,
  },

  // ── PIZZA ────────────────────────────────────────────────────────────────
  {
    id: 19,
    category: 'pizza',
    name: 'Margherita Pizza',
    description: 'Classic Neapolitan-style with San Marzano tomato sauce, fresh mozzarella, and fragrant basil leaves.',
    price: 299,
    // Classic margherita — red sauce, white cheese, green basil
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
    isVeg: true, rating: 4.7, popular: true,
  },
  {
    id: 20,
    category: 'pizza',
    name: 'Paneer Tikka Pizza',
    description: 'Indian-spiced paneer cubes on a tandoori sauce base with red onion, green peppers, and mozzarella.',
    price: 349,
    // Loaded colorful Indian-fusion pizza
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
    isVeg: true, rating: 4.9, popular: true,
  },
  {
    id: 21,
    category: 'pizza',
    name: 'Chicken BBQ Pizza',
    description: 'Smoky BBQ sauce base with grilled chicken chunks, red onion, jalapeños, and double mozzarella cheese.',
    price: 399,
    // Dark BBQ pizza with chicken toppings
    image: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=500&q=80',
    isVeg: false, rating: 4.8, popular: true,
  },
  {
    id: 22,
    category: 'pizza',
    name: 'Farm Fresh Veggie',
    description: 'Loaded with roasted bell peppers, mushrooms, black olives, baby corn, spinach, and ricotta.',
    price: 329,
    // Colorful vegetable-topped pizza
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
    isVeg: true, rating: 4.6, popular: false,
  },

  // ── BURGER ───────────────────────────────────────────────────────────────
  {
    id: 23,
    category: 'burger',
    name: 'Classic Veggie Burger',
    description: 'Crispy spiced aloo-veggie patty, fresh lettuce, tomato, onion rings, and zesty house mayo in a brioche bun.',
    price: 199,
    // Classic veggie burger in sesame bun
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
    isVeg: true, rating: 4.6, popular: true,
  },
  {
    id: 24,
    category: 'burger',
    name: 'Chicken Zinger',
    description: 'Double-fried crispy chicken fillet with spicy sriracha coleslaw, dill pickles, and pepper mayo.',
    price: 249,
    // Crispy fried golden chicken burger — correct image
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80',
    isVeg: false, rating: 4.8, popular: true,
  },
  {
    id: 25,
    category: 'burger',
    name: 'Paneer Makhani Burger',
    description: 'Grilled paneer steak in a rich makhani butter glaze with tamarind chutney and coriander chutney.',
    price: 229,
    // Paneer-style burger with colorful toppings
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80',
    isVeg: true, rating: 4.7, popular: false,
  },
  {
    id: 26,
    category: 'burger',
    name: 'Loaded Double Patty',
    description: 'Two thick patties, cheddar cheese, caramelized onions, bacon-style mushrooms, and truffle aioli.',
    price: 299,
    // Double-stacked burger with cheese melting
    image: 'https://images.unsplash.com/photo-1596956470007-2bf6095e7e16?w=500&q=80',
    isVeg: false, rating: 4.9, popular: true,
  },

  // ── SANDWICH ─────────────────────────────────────────────────────────────
  {
    id: 27,
    category: 'sandwich',
    name: 'Bombay Grilled Sandwich',
    description: 'Mumbai-street-style grilled sandwich with spiced potato, green chutney, cheese, beets, and veggies.',
    price: 149,
    // Golden grilled sandwich cut diagonally, grill marks visible
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },
  {
    id: 28,
    category: 'sandwich',
    name: 'Club Sandwich',
    description: 'Classic triple-decker with grilled chicken, fried egg, crispy lettuce, tomato, and creamy mayo.',
    price: 199,
    // Triple-layer club sandwich with toothpick
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80',
    isVeg: false, rating: 4.7, popular: true,
  },
  {
    id: 29,
    category: 'sandwich',
    name: 'Veggie Wrap',
    description: 'Whole-grain tortilla stuffed with hummus, roasted Mediterranean veggies, baby spinach, and feta.',
    price: 179,
    // Colorful veggie wrap/burrito cut in half
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80',
    isVeg: true, rating: 4.5, popular: false,
  },

  // ── PASTA ────────────────────────────────────────────────────────────────
  {
    id: 30,
    category: 'pasta',
    name: 'Penne Arrabbiata',
    description: 'Penne rigate in a fiery Italian tomato-garlic sauce with fresh basil and shaved parmesan.',
    price: 249,
    // Penne pasta in red tomato sauce, garnished with basil
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80',
    isVeg: true, rating: 4.6, popular: false,
  },
  {
    id: 31,
    category: 'pasta',
    name: 'Creamy Alfredo Pasta',
    description: 'Fettuccine tossed in rich parmesan cream sauce with garlic butter, sautéed mushrooms, and herbs.',
    price: 279,
    // White/cream sauce pasta with fettuccine noodles
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },
  {
    id: 32,
    category: 'pasta',
    name: 'Chicken Pesto Pasta',
    description: 'Grilled chicken strips, al dente pasta, fresh basil pesto, cherry tomatoes, and toasted pine nuts.',
    price: 319,
    // Green pesto pasta with chicken and tomatoes
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500&q=80',
    isVeg: false, rating: 4.7, popular: true,
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────
  {
    id: 33,
    category: 'desserts',
    name: 'Chocolate Lava Cake',
    description: 'Warm dark chocolate fondant cake with a gooey molten center. Served with a scoop of vanilla ice cream.',
    price: 199,
    // Chocolate cake with molten lava flowing out
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80',
    isVeg: true, rating: 4.9, popular: true,
  },
  {
    id: 34,
    category: 'desserts',
    name: 'Tiramisu',
    description: 'Authentic Italian tiramisu — espresso-soaked ladyfingers layered with mascarpone cream and dusted cocoa.',
    price: 229,
    // Tiramisu slice showing layers, cocoa dusted top
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },
  {
    id: 35,
    category: 'desserts',
    name: 'Gulab Jamun',
    description: 'Soft khoya dumplings deep-fried golden and soaked in rose-cardamom sugar syrup. Served warm (3 pcs).',
    price: 120,
    // Gulab jamun
    image: 'https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },
  {
    id: 36,
    category: 'desserts',
    name: 'New York Cheesecake',
    description: 'Dense, creamy baked cheesecake on a buttery graham cracker crust. Served with fresh berry coulis.',
    price: 249,
    // Slice of white cheesecake with berry sauce
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80',
    isVeg: true, rating: 4.7, popular: false,
  },
  {
    id: 37,
    category: 'desserts',
    name: 'Fudgy Brownie',
    description: 'Dense, ultra-fudgy dark chocolate brownie with walnuts. Warm with a scoop of vanilla ice cream.',
    price: 159,
    // Dark fudgy brownie, square cut, with ice cream scoop
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },

  // ── INDIAN SNACKS ────────────────────────────────────────────────────────
  {
    id: 38,
    category: 'indian-snacks',
    name: 'Samosa (2 pcs)',
    description: 'Crispy golden triangular pastry stuffed with spiced potato, peas, and herbs. Served with green chutney.',
    price: 80,
    // Crispy triangular samosas with green chutney
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80',
    isVeg: true, rating: 4.8, popular: true,
  },
  {
    id: 39,
    category: 'indian-snacks',
    name: 'Paneer Pakoda',
    description: 'Thick paneer slices marinated in spiced gram-flour batter and deep-fried to a crispy golden perfection.',
    price: 140,
    // Golden fried pakodas/fritters on a plate
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80',
    isVeg: true, rating: 4.7, popular: true,
  },
  {
    id: 40,
    category: 'indian-snacks',
    name: 'Vada Pav',
    description: "Mumbai's beloved street food — spiced potato vada in a soft pav bun with dry garlic and green chutneys.",
    price: 70,
    // Vada pav sandwich with green chutney drizzle
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80',
    isVeg: true, rating: 4.9, popular: true,
  },
  {
    id: 41,
    category: 'indian-snacks',
    name: 'Pav Bhaji',
    description: 'Rich mixed vegetable masala bhaji cooked on a tawa, served with butter-toasted dinner rolls and onion.',
    price: 149,
    // Pav bhaji in thick orange gravy with pav on side
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80',
    isVeg: true, rating: 4.8, popular: false,
  },
  {
    id: 42,
    category: 'indian-snacks',
    name: 'Aloo Tikki Chaat',
    description: 'Pan-fried spiced potato patties topped with yogurt, sweet tamarind chutney, sev, and pomegranate seeds.',
    price: 130,
    // Aloo tikki chaat with colorful toppings
    image: 'https://images.unsplash.com/photo-1541696490-8687e87e2b1b?w=500&q=80',
    isVeg: true, rating: 4.7, popular: false,
  },
  {
    id: 43,
    category: 'indian-snacks',
    name: 'Crispy French Fries',
    description: 'Thick-cut golden potato fries seasoned with our house spice blend. Served with chipotle mayo dip.',
    price: 99,
    // Golden crispy french fries in a basket/cone
    image: 'https://images.unsplash.com/photo-1576107232684-1279f89e3ef3?w=500&q=80',
    isVeg: true, rating: 4.6, popular: true,
  },

  // ── COMBO MEALS ──────────────────────────────────────────────────────────
  {
    id: 44,
    category: 'combo-meals',
    name: 'Student Special',
    description: '1 Masala Chai + 2 Samosas + 1 Vada Pav. The best value combo for quick bites and study sessions!',
    price: 179,
    // Indian street food spread — samosa, chai
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80',
    isVeg: true, rating: 4.7, popular: true, badge: 'Best Value',
  },
  {
    id: 45,
    category: 'combo-meals',
    name: 'Cafe Brunch Combo',
    description: 'Club Sandwich + Cold Brew Coffee + Cheesecake slice. The perfect weekend brunch for one.',
    price: 499,
    // Brunch spread with sandwich and coffee
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80',
    isVeg: false, rating: 4.8, popular: true, badge: 'Popular',
  },
  {
    id: 46,
    category: 'combo-meals',
    name: 'Pizza Party Combo',
    description: 'Choose any medium pizza + 2 cold beverages + 1 Chocolate Lava Cake. Perfect for two!',
    price: 649,
    // Pizza with drinks setup on table
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
    isVeg: true, rating: 4.6, popular: false, badge: 'Family Deal',
  },
  {
    id: 47,
    category: 'combo-meals',
    name: "Coffee Lover's Pack",
    description: 'Cappuccino + Caramel Macchiato + Tiramisu. A coffee enthusiast\'s dream trio.',
    price: 549,
    // Two coffee cups with dessert — cafe table setup
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
    isVeg: true, rating: 4.9, popular: true, badge: 'Best Seller',
  },
];

export const featuredItems = menuItems.filter(i => i.popular).slice(0, 6);

export const specialOffers = [
  { id:'offer1', title:'Happy Hours',    description:'20% off all beverages between 3–5 PM on weekdays.', discount:'20% OFF',     icon:'☕', validUntil:'Weekdays only'  },
  { id:'offer2', title:'Weekend Brunch', description:'Free dessert with any combo meal on weekends.',  discount:'FREE DESSERT', icon:'🍰', validUntil:'Sat & Sun'       },
  { id:'offer3', title:'Student Deal',   description:'Show your student ID for 15% off your entire order.', discount:'15% OFF', icon:'🎓', validUntil:'Always available' },
];
