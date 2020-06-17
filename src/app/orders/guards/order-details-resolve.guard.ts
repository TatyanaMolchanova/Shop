import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, take, finalize, tap, delay } from 'rxjs/operators';

import { IOrder } from '../models';
import { OrdersService } from '../services';
import { OrdersPath } from '../orders.constants';
import { AppPath } from '../../shared';

@Injectable({
    providedIn: 'any',
})
export class OrderDetailsResolveGuard implements Resolve<IOrder | null> {
    constructor(private router: Router, private ordersService: OrdersService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IOrder | null> {
        if (!route.paramMap.has(OrdersPath.OrderId)) {
            return of(null);
        }

        const orderId = route.paramMap.get(OrdersPath.OrderId);

        return this.ordersService.getOrder(orderId).pipe(
            take(1),
            catchError(() => {
                this.router.navigate([AppPath.Orders]);
                return of(null);
            }),
        );
    }
}
