import { Product } from './domain/Product';
import { Category } from './domain/Category';
import { Brand } from './domain/Brand';
import { Review } from './domain/Review';

// Categories test data
export const testCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    slug: 'electronics',
    imageUrl: '/categories/electronics.jpg'
  },
  {
    id: 'cat-2',
    name: 'Smartphones',
    description: 'Mobile phones and accessories',
    parentId: 'cat-1',
    slug: 'smartphones',
    imageUrl: '/categories/smartphones.jpg'
  },
  {
    id: 'cat-3',
    name: 'Laptops',
    description: 'Portable computers',
    parentId: 'cat-1',
    slug: 'laptops',
    imageUrl: '/categories/laptops.jpg'
  },
  {
    id: 'cat-4',
    name: 'Audio',
    description: 'Headphones, speakers, and audio equipment',
    parentId: 'cat-1',
    slug: 'audio',
    imageUrl: '/categories/audio.jpg'
  },
  {
    id: 'cat-5',
    name: 'Fashion',
    description: 'Clothing and accessories',
    slug: 'fashion',
    imageUrl: '/categories/fashion.jpg'
  },
  {
    id: 'cat-6',
    name: 'Men\'s Clothing',
    description: 'Apparel for men',
    parentId: 'cat-5',
    slug: 'mens-clothing',
    imageUrl: '/categories/mens-clothing.jpg'
  },
  {
    id: 'cat-7',
    name: 'Women\'s Clothing',
    description: 'Apparel for women',
    parentId: 'cat-5',
    slug: 'womens-clothing',
    imageUrl: '/categories/womens-clothing.jpg'
  },
  {
    id: 'cat-8',
    name: 'Home & Garden',
    description: 'Home decor and garden supplies',
    slug: 'home-garden',
    imageUrl: '/categories/home-garden.jpg'
  },
  {
    id: 'cat-9',
    name: 'Sports & Outdoors',
    description: 'Athletic and outdoor equipment',
    slug: 'sports-outdoors',
    imageUrl: '/categories/sports-outdoors.jpg'
  },
  {
    id: 'cat-10',
    name: 'Books',
    description: 'Physical and digital books',
    slug: 'books',
    imageUrl: '/categories/books.jpg'
  }
];

// Brands test data
export const testBrands: Brand[] = [
  {
    id: 'brand-1',
    name: 'TechPro',
    description: 'Premium electronics manufacturer',
    logoUrl: '/brands/techpro.svg',
    website: 'https://techpro.example.com',
    slug: 'techpro'
  },
  {
    id: 'brand-2',
    name: 'StyleCo',
    description: 'Fashion and lifestyle brand',
    logoUrl: '/brands/styleco.svg',
    website: 'https://styleco.example.com',
    slug: 'styleco'
  },
  {
    id: 'brand-3',
    name: 'SoundWave',
    description: 'Audio equipment specialist',
    logoUrl: '/brands/soundwave.svg',
    website: 'https://soundwave.example.com',
    slug: 'soundwave'
  },
  {
    id: 'brand-4',
    name: 'ActiveGear',
    description: 'Sports and outdoor equipment',
    logoUrl: '/brands/activegear.svg',
    website: 'https://activegear.example.com',
    slug: 'activegear'
  },
  {
    id: 'brand-5',
    name: 'HomeEssentials',
    description: 'Quality home products',
    logoUrl: '/brands/homeessentials.svg',
    website: 'https://homeessentials.example.com',
    slug: 'homeessentials'
  },
  {
    id: 'brand-6',
    name: 'ReadMore',
    description: 'Publishing house',
    logoUrl: '/brands/readmore.svg',
    website: 'https://readmore.example.com',
    slug: 'readmore'
  },
  {
    id: 'brand-7',
    name: 'GigaTech',
    description: 'Computing solutions',
    logoUrl: '/brands/gigatech.svg',
    website: 'https://gigatech.example.com',
    slug: 'gigatech'
  },
  {
    id: 'brand-8',
    name: 'UrbanStyle',
    description: 'Contemporary fashion',
    logoUrl: '/brands/urbanstyle.svg',
    website: 'https://urbanstyle.example.com',
    slug: 'urbanstyle'
  }
];

// Products test data (50+ products with variety)
export const testProducts: Product[] = [
  // Electronics - Smartphones (10 products)
  {
    id: '1',
    name: 'TechPro X1 Smartphone',
    priceCents: 79999,
    description: 'Flagship smartphone with 6.7" OLED display, 5G connectivity, and 108MP camera',
    categoryId: 'cat-2',
    brandId: 'brand-1',
    images: ['/products/phone-1.jpg', '/products/phone-1-2.jpg'],
    stock: 50,
    rating: 4.8,
    reviewCount: 245,
    tags: ['5G', 'OLED', 'Premium'],
    specifications: {
      'Screen Size': '6.7"',
      'Camera': '108MP',
      'Battery': '5000mAh',
      'Storage': '256GB'
    }
  },
  {
    id: '2',
    name: 'TechPro Mini Phone',
    priceCents: 49999,
    description: 'Compact smartphone with powerful performance',
    categoryId: 'cat-2',
    brandId: 'brand-1',
    images: ['/products/phone-2.jpg'],
    stock: 75,
    rating: 4.5,
    reviewCount: 180,
    tags: ['Compact', 'Budget-friendly'],
    specifications: {
      'Screen Size': '5.4"',
      'Camera': '48MP',
      'Battery': '3500mAh',
      'Storage': '128GB'
    }
  },
  {
    id: '3',
    name: 'GigaTech Z9 Pro',
    priceCents: 89999,
    description: 'Ultra-premium smartphone with cutting-edge features',
    categoryId: 'cat-2',
    brandId: 'brand-7',
    images: ['/products/phone-3.jpg', '/products/phone-3-2.jpg', '/products/phone-3-3.jpg'],
    stock: 30,
    rating: 4.9,
    reviewCount: 312,
    tags: ['5G', 'Premium', 'AI Camera'],
    specifications: {
      'Screen Size': '6.9"',
      'Camera': '200MP',
      'Battery': '6000mAh',
      'Storage': '512GB'
    }
  },
  {
    id: '4',
    name: 'TechPro Budget Phone',
    priceCents: 19999,
    description: 'Affordable smartphone for everyday use',
    categoryId: 'cat-2',
    brandId: 'brand-1',
    images: ['/products/phone-4.jpg'],
    stock: 120,
    rating: 4.2,
    reviewCount: 95,
    tags: ['Budget', 'Essential'],
    specifications: {
      'Screen Size': '6.1"',
      'Camera': '13MP',
      'Battery': '4000mAh',
      'Storage': '64GB'
    }
  },
  {
    id: '5',
    name: 'GigaTech Fold Max',
    priceCents: 149999,
    description: 'Revolutionary foldable smartphone',
    categoryId: 'cat-2',
    brandId: 'brand-7',
    images: ['/products/phone-5.jpg', '/products/phone-5-2.jpg'],
    stock: 15,
    rating: 4.7,
    reviewCount: 89,
    tags: ['Foldable', 'Premium', 'Innovation'],
    specifications: {
      'Screen Size': '7.6" unfolded',
      'Camera': '50MP',
      'Battery': '4500mAh',
      'Storage': '512GB'
    }
  },
  {
    id: '6',
    name: 'TechPro Camera Phone',
    priceCents: 69999,
    description: 'Photography-focused smartphone',
    categoryId: 'cat-2',
    brandId: 'brand-1',
    images: ['/products/phone-6.jpg'],
    stock: 60,
    rating: 4.6,
    reviewCount: 156,
    tags: ['Camera', 'Photography'],
    specifications: {
      'Screen Size': '6.5"',
      'Camera': '64MP Triple',
      'Battery': '4800mAh',
      'Storage': '256GB'
    }
  },
  {
    id: '7',
    name: 'GigaTech Gaming Phone',
    priceCents: 79999,
    description: 'Mobile gaming powerhouse',
    categoryId: 'cat-2',
    brandId: 'brand-7',
    images: ['/products/phone-7.jpg'],
    stock: 40,
    rating: 4.7,
    reviewCount: 203,
    tags: ['Gaming', 'Performance'],
    specifications: {
      'Screen Size': '6.8"',
      'Camera': '64MP',
      'Battery': '6500mAh',
      'Storage': '512GB'
    }
  },
  {
    id: '8',
    name: 'TechPro Senior Phone',
    priceCents: 14999,
    description: 'Easy-to-use phone for seniors',
    categoryId: 'cat-2',
    brandId: 'brand-1',
    images: ['/products/phone-8.jpg'],
    stock: 90,
    rating: 4.4,
    reviewCount: 67,
    tags: ['Senior-friendly', 'Simple'],
    specifications: {
      'Screen Size': '5.5"',
      'Camera': '8MP',
      'Battery': '3000mAh',
      'Storage': '32GB'
    }
  },
  {
    id: '9',
    name: 'GigaTech Rugged Phone',
    priceCents: 39999,
    description: 'Waterproof and shockproof smartphone',
    categoryId: 'cat-2',
    brandId: 'brand-7',
    images: ['/products/phone-9.jpg'],
    stock: 55,
    rating: 4.5,
    reviewCount: 112,
    tags: ['Rugged', 'Waterproof'],
    specifications: {
      'Screen Size': '6.3"',
      'Camera': '48MP',
      'Battery': '5500mAh',
      'Storage': '128GB'
    }
  },
  {
    id: '10',
    name: 'TechPro Eco Phone',
    priceCents: 44999,
    description: 'Environmentally friendly smartphone',
    categoryId: 'cat-2',
    brandId: 'brand-1',
    images: ['/products/phone-10.jpg'],
    stock: 70,
    rating: 4.3,
    reviewCount: 88,
    tags: ['Eco-friendly', 'Sustainable'],
    specifications: {
      'Screen Size': '6.2"',
      'Camera': '50MP',
      'Battery': '4200mAh',
      'Storage': '128GB'
    }
  },

  // Laptops (10 products)
  {
    id: '11',
    name: 'GigaTech UltraBook Pro',
    priceCents: 129999,
    description: '15.6" laptop with Intel i7, 16GB RAM, 512GB SSD',
    categoryId: 'cat-3',
    brandId: 'brand-7',
    images: ['/products/laptop-1.jpg'],
    stock: 35,
    rating: 4.7,
    reviewCount: 198,
    tags: ['Professional', 'Performance'],
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Screen': '15.6" Full HD'
    }
  },
  {
    id: '12',
    name: 'TechPro Gaming Laptop',
    priceCents: 179999,
    description: 'High-performance gaming laptop with RTX graphics',
    categoryId: 'cat-3',
    brandId: 'brand-1',
    images: ['/products/laptop-2.jpg', '/products/laptop-2-2.jpg'],
    stock: 25,
    rating: 4.8,
    reviewCount: 234,
    tags: ['Gaming', 'RTX', 'High-end'],
    specifications: {
      'Processor': 'Intel Core i9',
      'RAM': '32GB',
      'Storage': '1TB SSD',
      'Screen': '17.3" 144Hz',
      'GPU': 'RTX 4070'
    }
  },
  {
    id: '13',
    name: 'GigaTech Slim Notebook',
    priceCents: 79999,
    description: 'Lightweight laptop perfect for students',
    categoryId: 'cat-3',
    brandId: 'brand-7',
    images: ['/products/laptop-3.jpg'],
    stock: 60,
    rating: 4.5,
    reviewCount: 145,
    tags: ['Portable', 'Student'],
    specifications: {
      'Processor': 'Intel Core i5',
      'RAM': '8GB',
      'Storage': '256GB SSD',
      'Screen': '14" Full HD'
    }
  },
  {
    id: '14',
    name: 'TechPro Workstation',
    priceCents: 249999,
    description: 'Professional workstation for creators',
    categoryId: 'cat-3',
    brandId: 'brand-1',
    images: ['/products/laptop-4.jpg'],
    stock: 15,
    rating: 4.9,
    reviewCount: 176,
    tags: ['Professional', 'Creator', 'Workstation'],
    specifications: {
      'Processor': 'Intel Xeon',
      'RAM': '64GB',
      'Storage': '2TB SSD',
      'Screen': '15.6" 4K',
      'GPU': 'Quadro RTX'
    }
  },
  {
    id: '15',
    name: 'GigaTech Budget Laptop',
    priceCents: 44999,
    description: 'Affordable laptop for basic tasks',
    categoryId: 'cat-3',
    brandId: 'brand-7',
    images: ['/products/laptop-5.jpg'],
    stock: 80,
    rating: 4.2,
    reviewCount: 92,
    tags: ['Budget', 'Basic'],
    specifications: {
      'Processor': 'Intel Celeron',
      'RAM': '4GB',
      'Storage': '128GB SSD',
      'Screen': '14" HD'
    }
  },
  {
    id: '16',
    name: 'TechPro 2-in-1 Convertible',
    priceCents: 109999,
    description: 'Versatile laptop and tablet in one',
    categoryId: 'cat-3',
    brandId: 'brand-1',
    images: ['/products/laptop-6.jpg', '/products/laptop-6-2.jpg'],
    stock: 45,
    rating: 4.6,
    reviewCount: 167,
    tags: ['2-in-1', 'Touchscreen', 'Versatile'],
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Screen': '13.3" Touchscreen'
    }
  },
  {
    id: '17',
    name: 'GigaTech Business Pro',
    priceCents: 139999,
    description: 'Enterprise-grade laptop with security features',
    categoryId: 'cat-3',
    brandId: 'brand-7',
    images: ['/products/laptop-7.jpg'],
    stock: 30,
    rating: 4.7,
    reviewCount: 189,
    tags: ['Business', 'Security', 'Enterprise'],
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Screen': '14" Full HD',
      'Features': 'TPM 2.0, Fingerprint'
    }
  },
  {
    id: '18',
    name: 'TechPro Ultra Thin',
    priceCents: 149999,
    description: 'Ultra-thin premium laptop',
    categoryId: 'cat-3',
    brandId: 'brand-1',
    images: ['/products/laptop-8.jpg'],
    stock: 40,
    rating: 4.8,
    reviewCount: 221,
    tags: ['Premium', 'Thin', 'Lightweight'],
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB',
      'Storage': '1TB SSD',
      'Screen': '13.3" 4K',
      'Weight': '0.99 kg'
    }
  },
  {
    id: '19',
    name: 'GigaTech Chromebook',
    priceCents: 34999,
    description: 'Fast and secure Chromebook',
    categoryId: 'cat-3',
    brandId: 'brand-7',
    images: ['/products/laptop-9.jpg'],
    stock: 95,
    rating: 4.4,
    reviewCount: 134,
    tags: ['Chromebook', 'Fast', 'Affordable'],
    specifications: {
      'Processor': 'Intel Celeron',
      'RAM': '8GB',
      'Storage': '64GB eMMC',
      'Screen': '14" HD'
    }
  },
  {
    id: '20',
    name: 'TechPro Creator Laptop',
    priceCents: 199999,
    description: 'Optimized for content creation',
    categoryId: 'cat-3',
    brandId: 'brand-1',
    images: ['/products/laptop-10.jpg'],
    stock: 20,
    rating: 4.9,
    reviewCount: 156,
    tags: ['Creator', 'Video Editing', 'Premium'],
    specifications: {
      'Processor': 'AMD Ryzen 9',
      'RAM': '32GB',
      'Storage': '1TB SSD',
      'Screen': '16" 4K OLED',
      'GPU': 'RTX 4060'
    }
  },

  // Audio Equipment (10 products)
  {
    id: '21',
    name: 'SoundWave Elite Headphones',
    priceCents: 34999,
    description: 'Premium noise-canceling headphones',
    categoryId: 'cat-4',
    brandId: 'brand-3',
    images: ['/products/headphones-1.jpg'],
    stock: 85,
    rating: 4.8,
    reviewCount: 312,
    tags: ['Wireless', 'Noise-Canceling', 'Premium'],
    specifications: {
      'Type': 'Over-ear',
      'Battery': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Features': 'ANC, Hi-Res Audio'
    }
  },
  {
    id: '22',
    name: 'SoundWave Sport Earbuds',
    priceCents: 12999,
    description: 'Waterproof earbuds for active lifestyle',
    categoryId: 'cat-4',
    brandId: 'brand-3',
    images: ['/products/earbuds-1.jpg'],
    stock: 150,
    rating: 4.6,
    reviewCount: 245,
    tags: ['Sport', 'Waterproof', 'Wireless'],
    specifications: {
      'Type': 'In-ear',
      'Battery': '8 hours',
      'Rating': 'IPX7',
      'Connectivity': 'Bluetooth 5.2'
    }
  },
  {
    id: '23',
    name: 'TechPro Studio Monitor',
    priceCents: 89999,
    description: 'Professional studio monitor speakers (pair)',
    categoryId: 'cat-4',
    brandId: 'brand-1',
    images: ['/products/speakers-1.jpg'],
    stock: 30,
    rating: 4.9,
    reviewCount: 87,
    tags: ['Professional', 'Studio', 'High-fidelity'],
    specifications: {
      'Type': 'Active Monitors',
      'Power': '150W',
      'Frequency': '40Hz-20kHz',
      'Size': '8 inch woofer'
    }
  },
  {
    id: '24',
    name: 'SoundWave Portable Speaker',
    priceCents: 19999,
    description: 'Compact Bluetooth speaker with powerful sound',
    categoryId: 'cat-4',
    brandId: 'brand-3',
    images: ['/products/speaker-2.jpg'],
    stock: 120,
    rating: 4.7,
    reviewCount: 289,
    tags: ['Portable', 'Bluetooth', 'Waterproof'],
    specifications: {
      'Type': 'Portable',
      'Battery': '12 hours',
      'Rating': 'IPX7',
      'Power': '20W'
    }
  },
  {
    id: '25',
    name: 'TechPro Wireless Earbuds Pro',
    priceCents: 24999,
    description: 'Premium wireless earbuds with ANC',
    categoryId: 'cat-4',
    brandId: 'brand-1',
    images: ['/products/earbuds-2.jpg', '/products/earbuds-2-2.jpg'],
    stock: 95,
    rating: 4.8,
    reviewCount: 401,
    tags: ['Premium', 'ANC', 'Wireless'],
    specifications: {
      'Type': 'In-ear',
      'Battery': '6 hours (24 with case)',
      'Features': 'ANC, Transparency',
      'Connectivity': 'Bluetooth 5.3'
    }
  },
  {
    id: '26',
    name: 'SoundWave Gaming Headset',
    priceCents: 14999,
    description: 'Immersive gaming headset with mic',
    categoryId: 'cat-4',
    brandId: 'brand-3',
    images: ['/products/headset-1.jpg'],
    stock: 75,
    rating: 4.6,
    reviewCount: 178,
    tags: ['Gaming', 'RGB', 'Microphone'],
    specifications: {
      'Type': 'Over-ear',
      'Connectivity': 'USB/3.5mm',
      'Features': '7.1 Surround, RGB',
      'Microphone': 'Detachable'
    }
  },
  {
    id: '27',
    name: 'TechPro Soundbar',
    priceCents: 44999,
    description: 'Premium soundbar with subwoofer',
    categoryId: 'cat-4',
    brandId: 'brand-1',
    images: ['/products/soundbar-1.jpg'],
    stock: 40,
    rating: 4.7,
    reviewCount: 156,
    tags: ['Soundbar', 'Home Theater', 'Wireless'],
    specifications: {
      'Type': '3.1 Channel',
      'Power': '300W',
      'Connectivity': 'HDMI ARC, Bluetooth',
      'Features': 'Dolby Atmos'
    }
  },
  {
    id: '28',
    name: 'SoundWave Budget Earbuds',
    priceCents: 5999,
    description: 'Affordable wireless earbuds',
    categoryId: 'cat-4',
    brandId: 'brand-3',
    images: ['/products/earbuds-3.jpg'],
    stock: 200,
    rating: 4.3,
    reviewCount: 312,
    tags: ['Budget', 'Wireless', 'Compact'],
    specifications: {
      'Type': 'In-ear',
      'Battery': '5 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Charging': 'USB-C'
    }
  },
  {
    id: '29',
    name: 'TechPro Studio Headphones',
    priceCents: 59999,
    description: 'Professional studio headphones',
    categoryId: 'cat-4',
    brandId: 'brand-1',
    images: ['/products/headphones-2.jpg'],
    stock: 50,
    rating: 4.9,
    reviewCount: 124,
    tags: ['Professional', 'Studio', 'Hi-Res'],
    specifications: {
      'Type': 'Over-ear',
      'Impedance': '250 Ohm',
      'Frequency': '5Hz-35kHz',
      'Cable': '3m coiled'
    }
  },
  {
    id: '30',
    name: 'SoundWave Party Speaker',
    priceCents: 39999,
    description: 'Large Bluetooth speaker with RGB lights',
    categoryId: 'cat-4',
    brandId: 'brand-3',
    images: ['/products/speaker-3.jpg'],
    stock: 55,
    rating: 4.5,
    reviewCount: 201,
    tags: ['Party', 'RGB', 'Powerful'],
    specifications: {
      'Type': 'Party Speaker',
      'Battery': '18 hours',
      'Power': '100W',
      'Features': 'RGB, Karaoke'
    }
  },

  // Fashion - Men's Clothing (8 products)
  {
    id: '31',
    name: 'StyleCo Classic T-Shirt',
    priceCents: 2999,
    description: 'Premium cotton t-shirt in various colors',
    categoryId: 'cat-6',
    brandId: 'brand-2',
    images: ['/products/tshirt-1.jpg'],
    stock: 250,
    rating: 4.7,
    reviewCount: 567,
    tags: ['Casual', 'Cotton', 'Basic'],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Care': 'Machine wash',
      'Sizes': 'S-XXL'
    }
  },
  {
    id: '32',
    name: 'UrbanStyle Denim Jeans',
    priceCents: 7999,
    description: 'Modern fit denim jeans',
    categoryId: 'cat-6',
    brandId: 'brand-8',
    images: ['/products/jeans-1.jpg', '/products/jeans-1-2.jpg'],
    stock: 180,
    rating: 4.6,
    reviewCount: 423,
    tags: ['Denim', 'Casual', 'Durable'],
    specifications: {
      'Material': 'Denim',
      'Fit': 'Slim',
      'Wash': 'Dark blue',
      'Sizes': '28-40'
    }
  },
  {
    id: '33',
    name: 'StyleCo Formal Shirt',
    priceCents: 4999,
    description: 'Business formal dress shirt',
    categoryId: 'cat-6',
    brandId: 'brand-2',
    images: ['/products/shirt-1.jpg'],
    stock: 150,
    rating: 4.5,
    reviewCount: 234,
    tags: ['Formal', 'Business', 'Professional'],
    specifications: {
      'Material': 'Cotton blend',
      'Fit': 'Slim fit',
      'Collar': 'Point collar',
      'Sizes': 'S-XXL'
    }
  },
  {
    id: '34',
    name: 'UrbanStyle Hoodie',
    priceCents: 5999,
    description: 'Comfortable pullover hoodie',
    categoryId: 'cat-6',
    brandId: 'brand-8',
    images: ['/products/hoodie-1.jpg'],
    stock: 200,
    rating: 4.8,
    reviewCount: 389,
    tags: ['Casual', 'Warm', 'Comfortable'],
    specifications: {
      'Material': 'Cotton/Polyester blend',
      'Fit': 'Regular',
      'Features': 'Kangaroo pocket',
      'Sizes': 'S-XXL'
    }
  },
  {
    id: '35',
    name: 'StyleCo Chinos',
    priceCents: 6999,
    description: 'Versatile chino pants',
    categoryId: 'cat-6',
    brandId: 'brand-2',
    images: ['/products/chinos-1.jpg'],
    stock: 160,
    rating: 4.6,
    reviewCount: 298,
    tags: ['Smart Casual', 'Versatile'],
    specifications: {
      'Material': 'Cotton twill',
      'Fit': 'Tapered',
      'Style': 'Flat front',
      'Sizes': '28-40'
    }
  },
  {
    id: '36',
    name: 'UrbanStyle Bomber Jacket',
    priceCents: 12999,
    description: 'Trendy bomber jacket',
    categoryId: 'cat-6',
    brandId: 'brand-8',
    images: ['/products/jacket-1.jpg'],
    stock: 90,
    rating: 4.7,
    reviewCount: 167,
    tags: ['Outerwear', 'Trendy', 'Warm'],
    specifications: {
      'Material': 'Polyester',
      'Fit': 'Regular',
      'Features': 'Ribbed cuffs',
      'Sizes': 'S-XXL'
    }
  },
  {
    id: '37',
    name: 'StyleCo Sneakers',
    priceCents: 8999,
    description: 'Comfortable casual sneakers',
    categoryId: 'cat-6',
    brandId: 'brand-2',
    images: ['/products/sneakers-1.jpg'],
    stock: 140,
    rating: 4.5,
    reviewCount: 456,
    tags: ['Footwear', 'Casual', 'Comfortable'],
    specifications: {
      'Material': 'Canvas/Rubber',
      'Sole': 'Rubber',
      'Closure': 'Lace-up',
      'Sizes': '7-13'
    }
  },
  {
    id: '38',
    name: 'UrbanStyle Leather Belt',
    priceCents: 3999,
    description: 'Genuine leather belt',
    categoryId: 'cat-6',
    brandId: 'brand-8',
    images: ['/products/belt-1.jpg'],
    stock: 220,
    rating: 4.6,
    reviewCount: 178,
    tags: ['Accessory', 'Leather', 'Classic'],
    specifications: {
      'Material': 'Genuine leather',
      'Width': '1.5 inches',
      'Buckle': 'Metal',
      'Sizes': '30-44'
    }
  },

  // Fashion - Women's Clothing (6 products)
  {
    id: '39',
    name: 'StyleCo Summer Dress',
    priceCents: 5999,
    description: 'Light and breezy summer dress',
    categoryId: 'cat-7',
    brandId: 'brand-2',
    images: ['/products/dress-1.jpg', '/products/dress-1-2.jpg'],
    stock: 120,
    rating: 4.7,
    reviewCount: 289,
    tags: ['Summer', 'Casual', 'Feminine'],
    specifications: {
      'Material': 'Cotton/Linen',
      'Length': 'Midi',
      'Style': 'A-line',
      'Sizes': 'XS-XL'
    }
  },
  {
    id: '40',
    name: 'UrbanStyle Yoga Pants',
    priceCents: 4999,
    description: 'High-waisted yoga leggings',
    categoryId: 'cat-7',
    brandId: 'brand-8',
    images: ['/products/yoga-1.jpg'],
    stock: 200,
    rating: 4.8,
    reviewCount: 512,
    tags: ['Activewear', 'Comfortable', 'Stretchy'],
    specifications: {
      'Material': 'Spandex/Polyester',
      'Fit': 'High-waisted',
      'Features': 'Moisture-wicking',
      'Sizes': 'XS-XL'
    }
  },
  {
    id: '41',
    name: 'StyleCo Blouse',
    priceCents: 4499,
    description: 'Elegant office blouse',
    categoryId: 'cat-7',
    brandId: 'brand-2',
    images: ['/products/blouse-1.jpg'],
    stock: 150,
    rating: 4.6,
    reviewCount: 198,
    tags: ['Professional', 'Elegant', 'Office'],
    specifications: {
      'Material': 'Silk blend',
      'Fit': 'Regular',
      'Collar': 'V-neck',
      'Sizes': 'XS-XL'
    }
  },
  {
    id: '42',
    name: 'UrbanStyle Cardigan',
    priceCents: 6999,
    description: 'Cozy knit cardigan',
    categoryId: 'cat-7',
    brandId: 'brand-8',
    images: ['/products/cardigan-1.jpg'],
    stock: 130,
    rating: 4.7,
    reviewCount: 234,
    tags: ['Warm', 'Comfortable', 'Layering'],
    specifications: {
      'Material': 'Acrylic/Wool blend',
      'Fit': 'Relaxed',
      'Features': 'Button front',
      'Sizes': 'XS-XL'
    }
  },
  {
    id: '43',
    name: 'StyleCo High Heels',
    priceCents: 9999,
    description: 'Classic elegant high heels',
    categoryId: 'cat-7',
    brandId: 'brand-2',
    images: ['/products/heels-1.jpg'],
    stock: 80,
    rating: 4.5,
    reviewCount: 167,
    tags: ['Footwear', 'Elegant', 'Formal'],
    specifications: {
      'Material': 'Synthetic leather',
      'Heel Height': '3 inches',
      'Style': 'Closed toe',
      'Sizes': '5-11'
    }
  },
  {
    id: '44',
    name: 'UrbanStyle Handbag',
    priceCents: 11999,
    description: 'Stylish everyday handbag',
    categoryId: 'cat-7',
    brandId: 'brand-8',
    images: ['/products/handbag-1.jpg'],
    stock: 95,
    rating: 4.6,
    reviewCount: 223,
    tags: ['Accessory', 'Fashion', 'Practical'],
    specifications: {
      'Material': 'Vegan leather',
      'Dimensions': '12" x 10" x 5"',
      'Features': 'Multiple compartments',
      'Closure': 'Zipper'
    }
  },

  // Home & Garden (3 products)
  {
    id: '45',
    name: 'HomeEssentials Vacuum Cleaner',
    priceCents: 29999,
    description: 'Powerful cordless vacuum cleaner',
    categoryId: 'cat-8',
    brandId: 'brand-5',
    images: ['/products/vacuum-1.jpg'],
    stock: 60,
    rating: 4.7,
    reviewCount: 289,
    tags: ['Appliance', 'Cordless', 'Powerful'],
    specifications: {
      'Type': 'Cordless stick',
      'Battery': '60 minutes',
      'Filter': 'HEPA',
      'Weight': '2.5 kg'
    }
  },
  {
    id: '46',
    name: 'HomeEssentials Coffee Maker',
    priceCents: 14999,
    description: 'Programmable drip coffee maker',
    categoryId: 'cat-8',
    brandId: 'brand-5',
    images: ['/products/coffee-1.jpg'],
    stock: 100,
    rating: 4.6,
    reviewCount: 412,
    tags: ['Kitchen', 'Coffee', 'Programmable'],
    specifications: {
      'Capacity': '12 cups',
      'Features': 'Auto-brew, Keep warm',
      'Filter': 'Permanent',
      'Power': '900W'
    }
  },
  {
    id: '47',
    name: 'HomeEssentials Bed Sheets Set',
    priceCents: 7999,
    description: 'Luxury Egyptian cotton bed sheets',
    categoryId: 'cat-8',
    brandId: 'brand-5',
    images: ['/products/sheets-1.jpg'],
    stock: 150,
    rating: 4.8,
    reviewCount: 567,
    tags: ['Bedding', 'Cotton', 'Luxury'],
    specifications: {
      'Material': 'Egyptian cotton',
      'Thread Count': '800',
      'Set Includes': 'Fitted, flat, pillowcases',
      'Sizes': 'Twin-King'
    }
  },

  // Sports & Outdoors (3 products)
  {
    id: '48',
    name: 'ActiveGear Running Shoes',
    priceCents: 12999,
    description: 'High-performance running shoes',
    categoryId: 'cat-9',
    brandId: 'brand-4',
    images: ['/products/running-shoes-1.jpg'],
    stock: 110,
    rating: 4.8,
    reviewCount: 398,
    tags: ['Running', 'Athletic', 'Breathable'],
    specifications: {
      'Type': 'Running',
      'Cushioning': 'Air sole',
      'Upper': 'Breathable mesh',
      'Sizes': '6-14'
    }
  },
  {
    id: '49',
    name: 'ActiveGear Yoga Mat',
    priceCents: 4999,
    description: 'Non-slip eco-friendly yoga mat',
    categoryId: 'cat-9',
    brandId: 'brand-4',
    images: ['/products/yoga-mat-1.jpg'],
    stock: 180,
    rating: 4.7,
    reviewCount: 456,
    tags: ['Yoga', 'Fitness', 'Eco-friendly'],
    specifications: {
      'Material': 'TPE',
      'Thickness': '6mm',
      'Dimensions': '72" x 24"',
      'Features': 'Non-slip, carrying strap'
    }
  },
  {
    id: '50',
    name: 'ActiveGear Water Bottle',
    priceCents: 2999,
    description: 'Insulated stainless steel water bottle',
    categoryId: 'cat-9',
    brandId: 'brand-4',
    images: ['/products/bottle-1.jpg'],
    stock: 250,
    rating: 4.6,
    reviewCount: 678,
    tags: ['Hydration', 'Insulated', 'Durable'],
    specifications: {
      'Capacity': '750ml',
      'Material': 'Stainless steel',
      'Insulation': 'Double-wall vacuum',
      'Features': 'Leak-proof lid'
    }
  },

  // Books (2 products)
  {
    id: '51',
    name: 'JavaScript: The Complete Guide',
    priceCents: 4999,
    description: 'Comprehensive JavaScript programming book',
    categoryId: 'cat-10',
    brandId: 'brand-6',
    images: ['/products/book-1.jpg'],
    stock: 120,
    rating: 4.9,
    reviewCount: 234,
    tags: ['Programming', 'Education', 'JavaScript'],
    specifications: {
      'Pages': '856',
      'Publisher': 'ReadMore Publishing',
      'Language': 'English',
      'Format': 'Paperback'
    }
  },
  {
    id: '52',
    name: 'Design Patterns for Modern Apps',
    priceCents: 5999,
    description: 'Essential guide to software design patterns',
    categoryId: 'cat-10',
    brandId: 'brand-6',
    images: ['/products/book-2.jpg'],
    stock: 90,
    rating: 4.8,
    reviewCount: 178,
    tags: ['Programming', 'Design', 'Architecture'],
    specifications: {
      'Pages': '512',
      'Publisher': 'ReadMore Publishing',
      'Language': 'English',
      'Format': 'Hardcover'
    }
  }
];

// Reviews test data
export const testReviews: Review[] = [
  {
    id: 'rev-1',
    productId: '1',
    userId: 'user-1',
    userName: 'John Smith',
    rating: 5,
    title: 'Amazing phone!',
    comment: 'Best smartphone I\'ve ever owned. The camera quality is outstanding and battery lasts all day.',
    createdAt: new Date('2024-01-15'),
    verified: true,
    helpful: 42
  },
  {
    id: 'rev-2',
    productId: '1',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    rating: 4,
    title: 'Great but expensive',
    comment: 'Excellent features and performance, but the price is quite high.',
    createdAt: new Date('2024-01-20'),
    verified: true,
    helpful: 28
  },
  {
    id: 'rev-3',
    productId: '12',
    userId: 'user-3',
    userName: 'Mike Chen',
    rating: 5,
    title: 'Perfect for gaming',
    comment: 'Runs all my games at max settings smoothly. The cooling system is impressive.',
    createdAt: new Date('2024-02-01'),
    verified: true,
    helpful: 67
  },
  {
    id: 'rev-4',
    productId: '21',
    userId: 'user-4',
    userName: 'Emma Wilson',
    rating: 5,
    title: 'Best headphones ever',
    comment: 'The noise cancellation is incredible. Perfect for long flights.',
    createdAt: new Date('2024-02-10'),
    verified: true,
    helpful: 89
  },
  {
    id: 'rev-5',
    productId: '31',
    userId: 'user-5',
    userName: 'David Brown',
    rating: 4,
    title: 'Good quality, comfortable',
    comment: 'Nice fabric and fits well. Would recommend.',
    createdAt: new Date('2024-02-15'),
    verified: false,
    helpful: 12
  }
];
