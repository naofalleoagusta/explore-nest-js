import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';
import { PutProductDto } from './../dto/products/put.product.dto';
import { CreateProductDto } from './../dto/products/create.product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  async getAllProduct(): Promise<Product[]> {
    return await this.productService.getAllProduct();
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string): Promise<Product> {
    const product = await this.productService.getProduct(prodId);
    return product;
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body() putProductDto: PutProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(prodId, putProductDto);
  }
  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string): Promise<Product> {
    return await this.productService.deleteProduct(prodId);
  }
}
