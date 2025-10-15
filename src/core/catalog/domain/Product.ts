export interface Product {
  id: string;
  name: string;
  priceCents: number;
  description?: string;
  categoryId?: string;
  brandId?: string;
  images?: string[];
  stock?: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  specifications?: Record<string, string>;
}
