import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';

import { CustomerService } from '../../../services/customers.service';
import { PurchaseService } from '../../../services/purchase.service';

import { Customer } from '../models/customer';
import { Purchase } from '../models/purchase';

@Resolver(() => Customer)
export class CustomerResolver {
    constructor(
        private customersService: CustomerService,
        private purchasesService: PurchaseService,
    ) { }

    @UseGuards(AuthorizationGuard)
    @Query(() => Customer)
    me(
        @CurrentUser() user: AuthUser
    ) {
        return this.customersService.getCustomerByAuthUserId(user.sub);
    }

    @ResolveField(() => Purchase)
    purchases(@Parent() customer: Customer
    ) {
        return this.purchasesService.listAllFromCustomer(customer.id);
    }

    @ResolveReference()
    resolveReference(reference: { authUserId: string }) {
        return this.customersService.getCustomerByAuthUserId(reference.authUserId);
    }
}
