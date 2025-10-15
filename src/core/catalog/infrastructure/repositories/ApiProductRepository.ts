import { Product } from '../../domain/Product';
import { ProductRepository } from '../../domain/ProductRepository';
import { mapExternalToProduct } from '../mappers/ProductMapper';

export class ApiProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    const res = await fetch(`https://api.example.com/products/${id}`);
    if (!res.ok) return null;
    const json = await res.json();
    return mapExternalToProduct(json);
  }

  async save(product: Product): Promise<void> {
    await fetch(`https://api.example.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  }

  async listAll(): Promise<Product[]> {
    const res = await fetch(`https://api.example.com/products`);
    if (!res.ok) return [];
    const json = await res.json();
    if (!Array.isArray(json)) return [];
    return (json as unknown[]).map(mapExternalToProduct);
  }
}