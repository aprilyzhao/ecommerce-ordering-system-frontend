import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../shared/models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.searchTerm) {
        this.productService.getAllProductsBySearchTerm(params.searchTerm).subscribe(
          (products: Product[]) => this.products = products
        );
      } 
      else if (params.tag) {
        this.productService.getAllProductByTag(params.tag).subscribe(
          (products: Product[]) => this.products = products
        );
      } 
      else {
        this.productService.getAllProducts().subscribe(
          (products: Product[]) => this.products = products
        );
      }
    });
  }
}