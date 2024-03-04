export class Product{
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl:string;
  constructor(id: number, name: string, description: string, price: string, imageUrl: string) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
  }

}
