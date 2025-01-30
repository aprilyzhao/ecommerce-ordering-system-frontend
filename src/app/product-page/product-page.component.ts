import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.productService.getProductById(params.id).subscribe(
          (product: Product) => {
            this.product = product;
          },
          (error) => {
            console.error("Error fetching product:", error);
            this.router.navigateByUrl('/not-found'); 
          }
        );
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.orderService.addToCart(1, this.product,1);
      this.router.navigateByUrl('/cart-page');
    }
  }
}