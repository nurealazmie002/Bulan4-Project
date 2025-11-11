import { Product } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Kemeja Katun',
    price: 150000,
    category: 'Pakaian', // <-- Kategori ditambahkan
    imageUrl: 'https://i.pinimg.com/1200x/d4/d9/dd/d4d9dd7b786506525236795f3e093e7b.jpg',
    description: 'Kemeja katun lembut, nyaman dipakai seharian.',
  },
  {
    id: '2',
    name: 'Rok Plisket Krem Diskon 20%', // <-- Tambahkan 'Diskon' di nama
    price: 120000 * 0.8, // Harga diskon
    category: 'Pakaian',
    imageUrl: 'https://i.pinimg.com/736x/43/99/0c/43990c1d50856dc5fddbd0b180afe1f7.jpg',
    description: 'Rok plisket elegan dengan warna hitam.',
  },
  {
    id: '3',
    name: 'Sepatu Sneaker Putih',
    price: 325000,
    category: 'Pakaian',
    imageUrl: 'https://i.pinimg.com/1200x/72/3c/19/723c196426b32086ee07624ba274f721.jpg',
    description: 'Sneaker putih klasik, cocok untuk berbagai acara.',
  },
  {
    id: '4',
    name: 'Tas Selempang Elektronik',
    price: 185000,
    category: 'Elektronik', // <-- Kategori Elektronik
    imageUrl: 'https://i.pinimg.com/1200x/a8/b6/c8/a8b6c8551ade808f60bdfbfd50b52ff5.jpg',
    description: 'Tas selempang kecil yang unik.',
  },
  {
    id: '5',
    name: 'Hoodie Tebal',
    price: 210000,
    category: 'Pakaian',
    imageUrl: 'https://i.pinimg.com/736x/f4/36/e9/f436e9b13ce21d26b85d09d4ffdc8c1b.jpg',
    description: 'Hoodie basic tebal, cocok untuk cuaca dingin.',
  },
  {
    id: '6',
    name: 'Celana Jeans Diskon 50%',
    price: 250000 * 0.5, // Harga diskon
    category: 'Pakaian',
    imageUrl: 'https://i.pinimg.com/1200x/fb/ad/30/fbad30e33401f66a4b0d866ccc33a774.jpg',
    description: 'Celana jeans slim fit, bahan denim premium.',
  },
  {
    id: '7',
    name: 'Kardigan Klasik',
    price: 280000,
    category: 'Pakaian',
    imageUrl: 'https://i.pinimg.com/1200x/b7/9f/f6/b79ff6754ee3f74788400ea3035fbc40.jpg',
    description: 'Kardigan klasik, nyaman untuk musim panas.',
  },
  {
    id: '8',
    name: 'Topi Baseball Otomotif',
    price: 75000,
    category: 'Otomotif', // <-- Kategori Otomotif
    imageUrl: 'https://i.pinimg.com/1200x/b6/7f/dd/b67fdd3d878ca0a6374d0c5c317e2768.jpg',
    description: 'Topi baseball klasik, adjustable.',
  },
  {
    id: '9',
    name: 'Jam Tangan Kulit Diskon',
    price: 450000 * 0.7, // Harga diskon
    category: 'Hiburan', // <-- Kategori Hiburan
    imageUrl: 'https://i.pinimg.com/1200x/b7/b1/e4/b7b1e447eea1d2748aebce16eebaac36.jpg',
    description: 'Jam tangan dengan strap kulit, desain minimalis.',
  },
  {
    id: '10',
    name: 'Sandal Jepit Santai',
    price: 45000,
    category: 'Pakaian',
    imageUrl: 'https://i.pinimg.com/736x/e8/05/c2/e805c2f37fe85cca5e8000c59528d12f.jpg',
    description: 'Sandal santai, anti-air.',
  },
];

export const HEADER_BG_URI = 'https://images.pexels.com/photos/626986/pexels-photo-626986.jpeg';