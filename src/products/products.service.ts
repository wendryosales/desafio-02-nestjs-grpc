import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { ProductClientGrpc } from './grpc/products.grpc';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);
  private productGrpcService: ProductClientGrpc;

  @InjectRepository(Product)
  private productsRepository: Repository<Product>;

  @Inject('PRODUCT_PACKAGE')
  private productGrpcPackage: ClientGrpc;

  onModuleInit() {
    this.productGrpcService =
      this.productGrpcPackage.getService('ProductService');
  }

  async create(createProductDto: CreateProductDto) {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;

    let response: Product;

    try {
      response = await lastValueFrom(
        this.productGrpcService.createProduct({
          price: product.price,
          name: product.name,
          description: product.description,
        }),
      ).then((data) => data.product);
      this.productsRepository.save(product);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }

    return response;
  }

  async findAll() {
    return lastValueFrom(this.productGrpcService.findProducts({})).then(
      (data) => data.products,
    );
  }
}
