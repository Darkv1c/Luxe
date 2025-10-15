import { NextResponse } from 'next/server';
import { createCatalogDependencies } from '@/core/catalog';

// Create dependencies with test data
const deps = createCatalogDependencies({ useMemory: true, withTestData: true });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (productId) {
      // Get reviews for specific product
      const reviews = await deps.getProductReviewsUseCase.execute(productId);
      return NextResponse.json({
        success: true,
        data: reviews,
        count: reviews.length,
      });
    } else {
      // Get all reviews
      const reviews = await deps.reviewRepo.listAll();
      return NextResponse.json({
        success: true,
        data: reviews,
        count: reviews.length,
      });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch reviews',
      },
      { status: 500 }
    );
  }
}
