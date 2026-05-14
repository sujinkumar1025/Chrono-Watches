const imageModules = import.meta.glob('../assets/*.jpg', { eager: true });
const img = (name) => imageModules[`../assets/${name}`]?.default;

export const watches = [
  {
    id: 1, brand: "Aurex", name: "Ocean Master", ref: "AX-1266", price: 12500,
    image: img('watch1.jpg'),
    images: [img('watch1.jpg'), img('watch1 (1).jpg'), img('watch1 (2).jpg')],
    badge: "Bestseller", collection: "Luxury",
    desc: "The Ocean Master is Aurex's flagship luxury timepiece — a seamless fusion of deep-sea engineering and haute horology. Built for those who command both boardrooms and oceans.",
    specs: { Movement: "Automatic", "Case Size": "42mm", "Water Resistance": "300m", Material: "Stainless Steel", Crystal: "Sapphire", Power: "72h Reserve" }
  },
  {
    id: 2, brand: "Velor", name: "Lunar Chrono", ref: "VL-3104", price: 6500,
    image: img('watch2.jpg'),
    images: [img('watch2.jpg'), img('watch2 (2).jpg'), img('watch2 (3).jpg'), img('watch2 (1).jpg')],
    badge: "Iconic", collection: "Chronograph",
    desc: "The Lunar Chrono captures time in all its complexity. A chronograph movement with moon-phase display, crafted for those who track more than just minutes.",
    specs: { Movement: "Automatic Chronograph", "Case Size": "41mm", "Water Resistance": "100m", Material: "Rose Gold PVD", Crystal: "Sapphire", Power: "48h Reserve" }
  },
  {
    id: 3, brand: "Zenar", name: "Snow Dial", ref: "ZN-211", price: 5500,
    image: img('watch3.jpg'),
    images: [img('watch3.jpg'), img('watch3 (1).jpg'), img('watch3 (2).jpg'), img('watch3 (3).jpg'), img('watch3 (4).jpg')],
    badge: "Limited", collection: "Minimalist",
    desc: "Inspired by alpine stillness, the Snow Dial features a frost-white textured dial with zero clutter. Limited to 500 pieces worldwide.",
    specs: { Movement: "Swiss Quartz", "Case Size": "38mm", "Water Resistance": "50m", Material: "Titanium", Crystal: "Mineral", Power: "Battery" }
  },
  {
    id: 4, brand: "Torvex", name: "Racer Pro", ref: "TX-8821", price: 3800,
    image: img('watch4.jpg'),
    images: [img('watch4.jpg'), img('watch4 (1).jpg'), img('watch4 (2).jpg'),img('watch4 (3).jpg')],
    collection: "Sport",
    desc: "Born on the track, refined for the street. The Racer Pro delivers motorsport-grade precision with a tachymeter bezel and anti-shock movement.",
    specs: { Movement: "Automatic", "Case Size": "44mm", "Water Resistance": "100m", Material: "Carbon Fibre Bezel", Crystal: "Sapphire", Power: "42h Reserve" }
  },
  {
    id: 5, brand: "Nomira", name: "Classic 38", ref: "NM-101", price: 1950,
    image: img('watch5.jpg'),
    images: [img('watch5.jpg'), img('watch13.jpg'), img('watch1.jpg')],
    badge: "Design Icon", collection: "Minimalist",
    desc: "The Classic 38 is the purest expression of Nomira's design philosophy — less is more. A sunburst dial, slim case, and no unnecessary complications.",
    specs: { Movement: "Swiss Quartz", "Case Size": "38mm", "Water Resistance": "30m", Material: "316L Steel", Crystal: "Mineral", Power: "Battery" }
  },
  {
    id: 6, brand: "Sekron", name: "Deep Diver", ref: "SK-143", price: 850,
    image: img('watch6.jpg'),
    images: [img('watch6.jpg'), img('watch14.jpg'), img('watch2.jpg')],
    badge: "Value Pick", collection: "Dive Watches",
    desc: "The Deep Diver is Sekron's most accessible professional diver. ISO-certified at 200m, luminous hands, and a unidirectional bezel for serious underwater use.",
    specs: { Movement: "Automatic", "Case Size": "40mm", "Water Resistance": "200m", Material: "Stainless Steel", Crystal: "Hardened Mineral", Power: "40h Reserve" }
  },
  {
    id: 7, brand: "Aviros", name: "Pilot Mark X", ref: "AV-2207", price: 6200,
    image: img('watch7.jpg'),
    images: [img('watch7.jpg'), img('watch15.jpg'), img('watch3.jpg')],
    badge: "New", collection: "Dress Watches",
    desc: "The Pilot Mark X draws from aviation heritage — large Arabic numerals, anti-reflective glass, and a movement that performs at altitude and attitude.",
    specs: { Movement: "Automatic", "Case Size": "40mm", "Water Resistance": "60m", Material: "Stainless Steel", Crystal: "Double AR Sapphire", Power: "72h Reserve" }
  },
  {
    id: 8, brand: "Lunex", name: "Hydro Sport", ref: "LX-4966", price: 1800,
    image: img('watch8.jpg'),
    images: [img('watch8.jpg'), img('watch16.jpg'), img('watch4.jpg')],
    collection: "Sport",
    desc: "Built for swimmers and surfers, the Hydro Sport pairs a sporty silhouette with a robust 100m water resistance rating and vivid colour options.",
    specs: { Movement: "Quartz", "Case Size": "43mm", "Water Resistance": "100m", Material: "Resin & Steel", Crystal: "Mineral", Power: "Battery" }
  },
  {
    id: 9, brand: "Aurex", name: "Royal Steel", ref: "AX-2091", price: 9800,
    image: img('watch9.jpg'),
    images: [img('watch9.jpg'), img('watch1.jpg'), img('watch13.jpg')],
    badge: "Premium", collection: "Luxury",
    desc: "The Royal Steel is Aurex's crown jewel in integrated bracelet design. Every link is hand-finished, every edge bevelled to perfection.",
    specs: { Movement: "Automatic", "Case Size": "39mm", "Water Resistance": "120m", Material: "Brushed Steel", Crystal: "Sapphire", Power: "60h Reserve" }
  },
  {
    id: 10, brand: "Velor", name: "Chrono X", ref: "VL-7782", price: 7200,
    image: img('watch10.jpg'),
    images: [img('watch10.jpg'), img('watch2.jpg'), img('watch14.jpg')],
    collection: "Chronograph",
    desc: "The Chrono X is Velor's most technically ambitious watch — a column-wheel chronograph with vertical clutch and flyback function.",
    specs: { Movement: "Automatic Flyback", "Case Size": "42mm", "Water Resistance": "100m", Material: "DLC Steel", Crystal: "Sapphire", Power: "55h Reserve" }
  },
  {
    id: 11, brand: "Zenar", name: "Pure White", ref: "ZN-4521", price: 4300,
    image: img('watch11.jpg'),
    images: [img('watch11.jpg'), img('watch3.jpg'), img('watch15.jpg')],
    badge: "Limited", collection: "Minimalist",
    desc: "Pure White is Zenar's meditation on colour — or the absence of it. An all-white lacquered dial with matching ceramic bezel, limited to 300 pieces.",
    specs: { Movement: "Swiss Quartz", "Case Size": "36mm", "Water Resistance": "50m", Material: "Ceramic & Steel", Crystal: "Sapphire", Power: "Battery" }
  },
  {
    id: 12, brand: "Torvex", name: "Speed Edge", ref: "TX-9901", price: 3900,
    image: img('watch12.jpg'),
    images: [img('watch12.jpg'), img('watch4.jpg'), img('watch16.jpg')],
    collection: "Sport",
    desc: "The Speed Edge features an asymmetric case and a skeletonised dial that exposes the beating heart of its automatic movement.",
    specs: { Movement: "Automatic Skeleton", "Case Size": "45mm", "Water Resistance": "100m", Material: "PVD Black Steel", Crystal: "Sapphire", Power: "48h Reserve" }
  },
  {
    id: 13, brand: "Nomira", name: "Slim Classic", ref: "NM-204", price: 2100,
    image: img('watch13.jpg'),
    images: [img('watch13.jpg'), img('watch5.jpg'), img('watch9.jpg')],
    badge: "Elegant", collection: "Minimalist",
    desc: "At just 6.8mm thin, the Slim Classic is Nomira's dress watch for the modern minimalist. Pairs as naturally with a suit as with weekend casual.",
    specs: { Movement: "Swiss Quartz", "Case Size": "40mm", "Water Resistance": "30m", Material: "316L Steel", Crystal: "Sapphire", Power: "Battery" }
  },
  {
    id: 14, brand: "Sekron", name: "Ocean Pro", ref: "SK-778", price: 1200,
    image: img('watch14.jpg'),
    images: [img('watch14.jpg'), img('watch6.jpg'), img('watch10.jpg')],
    badge: "Best Value", collection: "Dive Watches",
    desc: "The Ocean Pro upgrades Sekron's dive line with a helium escape valve and 300m water resistance — professional grade at an accessible price.",
    specs: { Movement: "Automatic", "Case Size": "42mm", "Water Resistance": "300m", Material: "Stainless Steel", Crystal: "Sapphire", Power: "38h Reserve" }
  },
  {
    id: 15, brand: "Aviros", name: "Sky Navigator", ref: "AV-5512", price: 6700,
    image: img('watch15.jpg'),
    images: [img('watch15.jpg'), img('watch7.jpg'), img('watch11.jpg')],
    collection: "Dress Watches",
    desc: "The Sky Navigator features a GMT function with a dual-tone bezel — track two time zones in elegant style, whether you're in a cockpit or a conference room.",
    specs: { Movement: "Automatic GMT", "Case Size": "41mm", "Water Resistance": "100m", Material: "Stainless Steel", Crystal: "Sapphire", Power: "52h Reserve" }
  },
  {
    id: 16, brand: "Lunex", name: "Aqua Sport X", ref: "LX-8823", price: 2400,
    image: img('watch16.jpg'),
    images: [img('watch16.jpg'), img('watch8.jpg'), img('watch12.jpg')],
    badge: "New", collection: "Sport",
    desc: "The Aqua Sport X is Lunex's boldest sport watch — a high-contrast dial, ceramic insert bezel, and 200m water resistance for the adventurous wearer.",
    specs: { Movement: "Automatic", "Case Size": "44mm", "Water Resistance": "200m", Material: "Ceramic & Steel", Crystal: "Sapphire", Power: "42h Reserve" }
  }
];
