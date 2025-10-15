import { BrandRepository } from '../domain/BrandRepository';
import { Brand } from '../domain/Brand';

export class GetAllBrands {
  constructor(private repo: BrandRepository) { }

  async execute(): Promise<Brand[]> {
    return this.repo.listAll();
  }
}
