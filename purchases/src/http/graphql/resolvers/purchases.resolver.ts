import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';

import { CustomerService } from '../../../services/customers.service';
import { ProductService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';

import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchaseResolver {
    constructor(
        private purchasesService: PurchaseService,
        private productsService: ProductService,
        private customerService: CustomerService,
    ) { }

    @Query(() => [Purchase])
    @UseGuards(AuthorizationGuard)
    purchases() {
        return this.purchasesService.listAllPurchases();
    }

    @ResolveField(() => Product)
    product(
        @Parent() purchase: Purchase
    ) {
        return this.productsService.getProductById(purchase.productId)
    }

    @Mutation(() => Purchase)
    @UseGuards(AuthorizationGuard)
    async createPurchase(
        @Args('data') data: CreatePurchaseInput,
        @CurrentUser() user: AuthUser
    ) {
        let customer = await this.customerService.getCustomerByAuthUserId(user.sub);

        if (!customer) {
            customer = await this.customerService.createCustomer({
                authUserId: user.sub
            });
        }

        return this.purchasesService.createPurchase({
            productId: data.productId,
            customerId: customer.id,
        });
    }
}
