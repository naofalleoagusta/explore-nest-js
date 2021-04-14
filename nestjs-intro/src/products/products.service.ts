import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getAllProduct(): Product[] {
    return [...this.products];
  }

  getProduct(productId: string): Product {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(productId:string){
    const index = this.findProduct(productId)[1];
    this.products.splice(index,1);

  }

  private findProduct(productId: string): [Product, number] {
    const index = this.products.findIndex((prod) => prod.id === productId);
    const product = this.products[index];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, index];
  }
}
