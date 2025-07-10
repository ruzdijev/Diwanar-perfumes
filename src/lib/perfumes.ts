export type Perfume = {
  id: string;
  name: string;
  descriptor: string;
  description: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  price: {
    GBP: number;
    EUR: number;
  };
  image: string;
  artisticImage: string;
};

const perfumes: Perfume[] = [
  {
    id: '1',
    name: 'Aurum',
    descriptor: 'A Symphony of Liquid Gold',
    description: 'Aurum is an opulent fragrance that captures the essence of liquid gold. A warm, radiant scent that envelops you in a luxurious embrace.',
    notes: {
      top: 'Saffron, Grapefruit',
      heart: 'Oud, Rose',
      base: 'Amber, Praline',
    },
    price: { GBP: 180, EUR: 210 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
  {
    id: '2',
    name: 'Nox',
    descriptor: 'An Ode to Midnight Rose',
    description: 'Nox is a mysterious and alluring scent that evokes the magic of a midnight garden. Deep, velvety, and unforgettable.',
    notes: {
      top: 'Blackcurrant, Pink Pepper',
      heart: 'Rose, Peony',
      base: 'Patchouli, Musk',
    },
    price: { GBP: 165, EUR: 195 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
  {
    id: '3',
    name: 'Zephyr',
    descriptor: 'Whispers of a Coastal Breeze',
    description: 'Zephyr is a fresh and invigorating fragrance that captures the crispness of a coastal breeze. Light, airy, and full of life.',
    notes: {
      top: 'Bergamot, Lemon',
      heart: 'Sea Salt, Jasmine',
      base: 'Cedarwood, Ambergris',
    },
    price: { GBP: 150, EUR: 175 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
  {
    id: '4',
    name: 'Silvanus',
    descriptor: 'The Heart of the Ancient Forest',
    description: 'Silvanus is an earthy and grounding scent that transports you to the heart of an ancient forest. Rich, woody, and deeply calming.',
    notes: {
      top: 'Pine, Cardamom',
      heart: 'Vetiver, Moss',
      base: 'Sandalwood, Balsam Fir',
    },
    price: { GBP: 170, EUR: 200 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
  {
    id: '5',
    name: 'Ignis',
    descriptor: 'The Spark of Spiced Embers',
    description: 'Ignis is a fiery and passionate fragrance, reminiscent of spiced embers glowing in the dark. Warm, spicy, and intensely captivating.',
    notes: {
      top: 'Cinnamon, Clove',
      heart: 'Tobacco, Leather',
      base: 'Vanilla, Tonka Bean',
    },
    price: { GBP: 185, EUR: 215 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
  {
    id: '6',
    name: 'Aether',
    descriptor: 'A Breath of Celestial Air',
    description: 'Aether is an ethereal and minimalist scent that feels like a breath of clean, celestial air. Pure, subtle, and transcendent.',
    notes: {
      top: 'Ambrette, Pear',
      heart: 'Orris, Iris',
      base: 'White Musk, Iso E Super',
    },
    price: { GBP: 190, EUR: 220 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
  {
    id: '7',
    name: 'Terra',
    descriptor: 'Sun-baked Earth and Roots',
    description: 'Terra is a raw and powerful fragrance that connects you to the sun-baked earth. Grounding, rich, and unapologetically natural.',
    notes: {
      top: 'Beetroot, Pink Pepper',
      heart: 'Geosmin, Patchouli',
      base: 'Vetiver, Oakwood',
    },
    price: { GBP: 160, EUR: 190 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
  {
    id: '8',
    name: 'Petale',
    descriptor: 'A Garden in Full Bloom',
    description: 'Petale is a vibrant and romantic floral explosion. It captures the joyful essence of a garden in full, magnificent bloom.',
    notes: {
      top: 'Mandarin, Freesia',
      heart: 'Jasmine, Tuberose',
      base: 'Orange Blossom, Sandalwood',
    },
    price: { GBP: 155, EUR: 180 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
  {
    id: '9',
    name: 'Crepuscule',
    descriptor: 'The Sweetness of Twilight',
    description: 'Crepuscule is a soft and comforting fragrance that embodies the gentle sweetness of twilight. Powdery, warm, and subtly sensual.',
    notes: {
      top: 'Bergamot, Lavender',
      heart: 'Almond Milk, Heliotrope',
      base: 'Tonka Bean, Vanilla',
    },
    price: { GBP: 175, EUR: 205 },
    image: '/images/parfume.webp',
    artisticImage: '/images/parfume.webp',
  },
];

export function getPerfumes(): Perfume[] {
  return perfumes;
}

export function getPerfumeById(id: string): Perfume | undefined {
  return perfumes.find((p) => p.id === id);
}
