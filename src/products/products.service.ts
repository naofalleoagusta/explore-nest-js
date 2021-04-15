import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './../dto/products/create.product.dto';
import { PutProductDto } from './../dto/products/put.product.dto';
import { Product, ProductDocument } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAllProduct(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async getProduct(prodId: string): Promise<Product> {
    if (!prodId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException();
    }
    const product = await this.productModel.findById(prodId);
    if (!product) {
      throw new NotFoundException("Product doesn't exist!");
    }
    return product;
  }

  async updateProduct(
    prodId: string,
    putProductDto: PutProductDto,
  ): Promise<Product> {
    if (!prodId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException();
    }
    var productNewData: any = {};
    if (putProductDto.title) {
      productNewData.title = putProductDto.title;
    }
    if (putProductDto.description) {
      productNewData.description = putProductDto.description;
    }
    if (putProductDto.price) {
      productNewData.price = putProductDto.price;
    }
    const product = await this.productModel.findByIdAndUpdate(prodId, {
      $set: productNewData,
    });
    if (!product) {
      throw new NotFoundException("Product doesn't exist!");
    }
    return product;
  }

  async deleteProduct(prodId: string): Promise<Product> {
    if (!prodId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException();
    }
    const product = await this.productModel.findByIdAndDelete(prodId);
    if (!product) {
      throw new NotFoundException("Product doesn't exist!");
    }
    return product;
  }
}
