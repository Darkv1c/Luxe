import { GetProduct } from '../../application/GetProduct';
import type { Product } from '../../domain/Product';

export class CatalogController {
    constructor(private getProductUseCase: GetProduct) { }

    async getProduct(id: string): Promise<Product | null> {
        return this.getProductUseCase.execute(id);
    }
}
