class ListProductCharacteristicsDTO {
  name: string;
  description: string;
}

class ListImageProductDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  id: string;
  userId: string;
  name: string;
  value: number;
  availableQuantity: number;
  description: string;
  characteristics: ListProductCharacteristicsDTO[];
  images: ListImageProductDTO[];
  category: string;
}
