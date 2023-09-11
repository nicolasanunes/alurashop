class ListProductCharacteristicsDTO {
  name: string;
  description: string;
}

class ListProductImagesDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly value: number,
    readonly availableQuantity: number,
    readonly description: string,
    readonly characteristics: ListProductCharacteristicsDTO[],
    readonly images: ListProductImagesDTO[],
    readonly category: string,
  ) {}
}
