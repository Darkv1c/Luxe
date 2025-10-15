import { NextResponse } from 'next/server';
import { createCatalogDependencies } from '@/core/catalog';

// Create dependencies with in-memory repository and test data
const deps = createCatalogDependencies({ useMemory: true, withTestData: true });

export async function GET() {
  try {
    const products = await deps.getAllProductsUseCase.execute();
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching catalog:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch catalog',
      },
      { status: 500 }
    );
  }
}
