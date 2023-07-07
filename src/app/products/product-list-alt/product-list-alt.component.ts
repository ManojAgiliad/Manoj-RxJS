import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EMPTY, Subject, Subscription, catchError } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  selectedProductId = 0;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.productsWithCategory$
            .pipe(
              catchError(err => {
                this.errorMessageSubject.next(err);
                return EMPTY;
              })
            );
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  selectedProduct$ = this.productService.selectedProduct$;

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
