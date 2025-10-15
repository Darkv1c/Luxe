import { GetProduct } from '../../application/GetProduct';
import { GetAllProducts } from '../../application/GetAllProducts';
import type { Product } from '../../domain/Product';

export class CatalogController {
    constructor(
        private getProductUseCase: GetProduct,
        private getAllProductsUseCase?: GetAllProducts
    ) { }

    async getProduct(id: string): Promise<Product | null> {
        return this.getProductUseCase.execute(id);
    }

    async getAllProducts(): Promise<Product[]> {
        if (!this.getAllProductsUseCase) {
            throw new Error('GetAllProducts use case not configured');
        }
        return this.getAllProductsUseCase.execute();
    }
}
