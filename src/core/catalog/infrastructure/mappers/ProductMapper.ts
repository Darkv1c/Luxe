import { Product } from '../../domain/Product';

export function mapExternalToProduct(json: unknown): Product {
    const obj = json as Record<string, unknown>;
    return {
        id: String(obj.id ?? ''),
        name: String(obj.name ?? ''),
        priceCents: Number(obj.priceCents ?? obj.price_cents ?? 0),
    };
}
