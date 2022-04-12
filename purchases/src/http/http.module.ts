import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '../database/database.module';
import { CustomerService } from '../services/customers.service';
import { ProductService } from '../services/product.service';
import { PurchaseService } from '../services/purchase.service';
import { CustomerResolver } from './graphql/resolvers/customers.resolver';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchaseResolver } from './graphql/resolvers/purchases.resolver';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
        })
    ],
    providers: [
        //Resolvers
        ProductsResolver,
        CustomerResolver,
        PurchaseResolver,

        //Services
        ProductService,
        CustomerService,
        PurchaseService,
    ]
})
export class HttpModule { }
