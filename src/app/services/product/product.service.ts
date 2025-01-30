import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { Tag } from 'src/app/shared/models/Tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrlProduct = 'http://localhost:8080/api/products';
  private apiUrlTag = 'http://localhost:8080/api/tags';
  constructor(private http: HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this. apiUrlProduct}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlProduct}/${id}`);
}
getAllProductsBySearchTerm(searchTerm: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
        map(products => 
            products.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    );
}
 

  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(`${this. apiUrlTag}`);
  }

  getAllProductByTag(tag: string): Observable<Product[]> {

    return this.getAllProducts().pipe(
      map((products: Product[]) =>
          tag === "All"
              ? products 
              : products.filter(product => 
                  product.tags?.some(t => t.name === tag) 
              )
      )
  );
}
    /**

  getAll():Product[]{
    return [
      {
        id: 1,
        name: 'MacBook Air',
        price: 999,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-macbook-air-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974970795',
        newArrival: true,
        tags: ["MacBook"],
        description: "Ultra-light and powerful laptop with Apple's M-series chip."
      },
      {
        id: 2,
        name: 'iMac',
        price: 1299,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-imac-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1731974953703',
        newArrival: false,
        tags: ["iMac"],
        description: "A sleek all-in-one desktop with a stunning Retina display."
      },
      {
        id: 3,
        name: 'iPad',
        price: 499,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-card-40-ipad-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1727714411651',
        newArrival: false,
        tags: ["iPad"],
        description: "Versatile tablet with powerful performance and Apple Pencil support."
      },
      {
        id: 4,
        name: 'iPhone 16 Pro Max',
        price: 1199,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1725567335931',
        newArrival: true,
        tags: ["iPhone"],
        description: "The most advanced iPhone with an A17 chip and ProMotion display."
      },
      {
        id: 5,
        name: 'Apple Watch',
        price: 399,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s10-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1724168059157',
        newArrival: false,
        tags: ["Apple Watch"],
        description: "A smart fitness and health companion with advanced tracking features."
      },
      {
        id: 6,
        name: 'iPhone SE',
        price: 429,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphonese-202203?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1646415838921',
        newArrival: false,
        tags: ["iPhone"],
        description: "A budget-friendly iPhone with powerful performance in a compact design."
      }
      
    ]
  }
   */
}
