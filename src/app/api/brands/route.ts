import { NextResponse } from 'next/server';
import { createCatalogDependencies } from '@/core/catalog';

// Create dependencies with test data
const deps = createCatalogDependencies({ useMemory: true, withTestData: true });

export async function GET() {
  try {
    const brands = await deps.getAllBrandsUseCase.execute();
    
    return NextResponse.json({
      success: true,
      data: brands,
      count: brands.length,
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch brands',
      },
      { status: 500 }
    );
  }
}
