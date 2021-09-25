export interface StoreItem {
  id: string;
  name: string;
  imageUrls: string[];
  rating: 0;
  availableAmount: 0;
  price: 0;
  description: string;
  isInCart: boolean;
  isFavorite: boolean;
  category?: string;
  subCategory?: string;
  count?: number;
}
export interface CartItemTemp {
  id: string;
  amount: number;
}
