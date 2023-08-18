class ProductCharacteristics {
  name: string;
  description: string;
}

class ProductImage {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  value: number;
  availableQuantity: number;
  description: string;
  characteristics: ProductCharacteristics[];
  images: ProductImage[];
  category: string;
}
