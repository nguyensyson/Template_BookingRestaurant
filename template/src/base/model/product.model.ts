export class ProductModel {
    id?: number;
    name?: string;
    price: number = 0;
    description?: string;
    imageThumbnail?: string;
    totalReviews?: number;
    rating?: number;
    quantity: number = 1;
}