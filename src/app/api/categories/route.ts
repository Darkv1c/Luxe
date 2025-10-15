import { NextResponse } from 'next/server';
import { createCatalogDependencies } from '@/core/catalog';

// Create dependencies with test data
const deps = createCatalogDependencies({ useMemory: true, withTestData: true });

export async function GET() {
  try {
    const categories = await deps.getAllCategoriesUseCase.execute();
    
    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}
