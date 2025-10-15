export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5 stars
  title?: string;
  comment?: string;
  createdAt: Date;
  verified?: boolean;
  helpful?: number;
}
