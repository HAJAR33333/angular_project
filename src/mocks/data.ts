export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  owner_id: number;
  ratings: { user_id: number; value: number }[];
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'T-shirt Blanc',
    price: 15.99,
    created_at: '2025-01-10T10:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 2, value: 4 }],
    imageUrl: '/manteau-long.png'
  },
  {
    id: 2,
    name: 'Jean Bleu',
    price: 39.99,
    created_at: '2025-02-01T09:30:00Z',
    owner_id: 11,
    ratings: [{ user_id: 3, value: 5 }],
    imageUrl: '/assets/products/jeans-blue.png'
  },
  {
    id: 3,
    name: 'Veste en Cuir',
    price: 89.99,
    created_at: '2025-02-12T12:00:00Z',
    owner_id: 12,
    ratings: [{ user_id: 4, value: 5 }],
    imageUrl: '/veste.png'
  },
  {
    id: 4,
    name: 'Robe Rouge',
    price: 49.99,
    created_at: '2025-03-01T08:45:00Z',
    owner_id: 13,
    ratings: [{ user_id: 2, value: 5 }],
    imageUrl: '/assets/products/red-dress.png'
  },
  {
    id: 5,
    name: 'Pull Gris',
    price: 29.99,
    created_at: '2025-03-05T07:20:00Z',
    owner_id: 14,
    ratings: [{ user_id: 1, value: 4 }],
    imageUrl: '/assets/products/grey-sweater.png'
  },
  {
    id: 6,
    name: 'Chemise Blanche',
    price: 34.99,
    created_at: '2025-03-10T14:10:00Z',
    owner_id: 15,
    ratings: [{ user_id: 3, value: 3 }],
    imageUrl: '/assets/products/white-shirt.png'
  },
  {
    id: 7,
    name: 'Short Noir',
    price: 24.99,
    created_at: '2025-03-11T11:00:00Z',
    owner_id: 16,
    ratings: [{ user_id: 6, value: 5 }],
    imageUrl: '/assets/products/black-shorts.png'
  },
  {
    id: 8,
    name: 'Jupe Plissée',
    price: 27.99,
    created_at: '2025-03-12T09:00:00Z',
    owner_id: 17,
    ratings: [{ user_id: 3, value: 2 }],
    imageUrl: '/assets/products/pleated-skirt.png'
  },
  {
    id: 9,
    name: 'Blouson Sport',
    price: 59.99,
    created_at: '2025-03-15T10:30:00Z',
    owner_id: 18,
    ratings: [{ user_id: 5, value: 5 }],
    imageUrl: '/assets/products/sport-jacket.png'
  },
  {
    id: 10,
    name: 'Casquette',
    price: 12.99,
    created_at: '2025-03-20T16:00:00Z',
    owner_id: 19,
    ratings: [{ user_id: 7, value: 4 }],
    imageUrl: '/assets/products/cap.png'
  },
  {
    id: 11,
    name: 'Écharpe en Laine',
    price: 19.99,
    created_at: '2025-03-22T12:40:00Z',
    owner_id: 20,
    ratings: [{ user_id: 2, value: 1 }],
    imageUrl: '/assets/products/wool-scarf.png'
  },
  {
    id: 12,
    name: 'Bottes Marron',
    price: 69.99,
    created_at: '2025-03-25T13:00:00Z',
    owner_id: 21,
    ratings: [{ user_id: 8, value: 5 }],
    imageUrl: '/assets/products/brown-boots.png'
  },
  {
    id: 13,
    name: 'T-shirt Noir',
    price: 15.99,
    created_at: '2025-04-01T07:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 9, value: 4 }],
    imageUrl: '/assets/products/black-tshirt.png'
  },
  {
    id: 14,
    name: 'Jean Slim',
    price: 42.99,
    created_at: '2025-04-03T08:00:00Z',
    owner_id: 11,
    ratings: [{ user_id: 1, value: 1 }],
    imageUrl: '/chapeau.png'
  },
  {
    id: 15,
    name: 'Robe Bleue',
    price: 49.99,
    created_at: '2025-04-05T10:20:00Z',
    owner_id: 12,
    ratings: [{ user_id: 3, value: 5 }],
    imageUrl: '/vest-jean.png'
  },
  {
    id: 16,
    name: 'Chaussures Blanc',
    price: 59.99,
    created_at: '2025-04-10T14:00:00Z',
    owner_id: 13,
    ratings: [{ user_id: 6, value: 4 }],
    imageUrl: '/chapeau.png'
  },
  {
    id: 17,
    name: 'Pull à Rayures',
    price: 32.99,
    created_at: '2025-04-12T12:30:00Z',
    owner_id: 14,
    ratings: [{ user_id: 5, value: 4 }],
    imageUrl: '/vest-jean.png'
  },
  {
    id: 18,
    name: 'Veste Jeans',
    price: 65.99,
    created_at: '2025-04-15T11:10:00Z',
    owner_id: 15,
    ratings: [{ user_id: 8, value: 5 }],
    imageUrl: '/vest-jean.png'
  },
  {
    id: 19,
    name: 'Chapeau Fedora',
    price: 22.99,
    created_at: '2025-04-18T09:40:00Z',
    owner_id: 16,
    ratings: [{ user_id: 2, value: 4 }],
    imageUrl: '/chapeau.png'
  },
  {
    id: 20,
    name: 'Manteau Long',
    price: 120.99,
    created_at: '2025-04-20T15:00:00Z',
    owner_id: 17,
    ratings: [{ user_id: 9, value: 5 }],
    imageUrl: '/manteau-long.png'
  }
];
