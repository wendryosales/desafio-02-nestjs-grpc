import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

const clientConfig: ClientsModuleAsyncOptions = [
  {
    name: 'PRODUCT_PACKAGE',
    useFactory: (configService: ConfigService) => ({
      transport: Transport.GRPC,
      options: {
        url: configService.get('GRPC_URL'),
        package: 'github.com.codeedu.codepix',
        protoPath: [join(__dirname, 'grpc/product.proto')],
      },
    }),
    inject: [ConfigService],
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.registerAsync(clientConfig),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
