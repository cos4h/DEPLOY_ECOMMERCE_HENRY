import { Controller } from "@nestjs/common";
import { ProductAppService } from "./product-app.service";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { UUID } from "crypto";

@Controller()
export class ProductAppController {
  constructor(private readonly productAppService: ProductAppService) {}

  @MessagePattern("MS-PRODUCTS-GET")
  async getProducts(): Promise<any> {
    const products = await this.productAppService.findAll();
    return products;
  }

  @MessagePattern("MS-PRODUCT-GET")
  async getProduct(id: UUID): Promise<any> {
    const product = await this.productAppService.findOne(id);
    return JSON.stringify(product);
  }

  @MessagePattern("MS-PRODUCT-POST")
  createProduct(product: any): Promise<any> {
    return this.productAppService.create(product);
  }

  @EventPattern("MS-PRODUCT-PUT")
  updateProduct(data: { id: string; product }): void {
    this.productAppService.update(data.id, data.product);
  }

  @MessagePattern("MS-PRODUCTS-DELETE")
  deleteProduct(id: string): Promise<void> {
    return this.productAppService.delete(id);
  }

  @EventPattern("MS-PRODUCT-STOCK-REDUCED")
  reduceStock(id: string): void {
    this.productAppService.reduceStock(id);
  }
}
