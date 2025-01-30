import { Injectable } from '@angular/core';
import { OrderItems } from 'src/app/shared/models/OrderItems';
import { Product } from 'src/app/shared/models/Product';
import { Order } from 'src/app/shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrlOrderItems ='http://localhost:8080/api/orderitems/1';
  private apiUrlOrders = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient){ }


  addToCart(orderId: number, product: Product, quantity: number): Observable<OrderItems> {
    const orderItem: Partial<OrderItems> = {
      order: { id: orderId }, 
      product: product,
      quantity: quantity
    };
    return this.http.post<OrderItems>(`${this.apiUrlOrderItems}`, orderItem);
  }

  removeFromCart(orderItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlOrderItems}/${orderItemId}`);
  }
  
  changeQuantity(orderItemId: number, quantity: number): Observable<OrderItems> {
    return this.http.put<OrderItems>(`${this.apiUrlOrderItems}/${orderItemId}`, { quantity });
  }

  getCartItems(orderId: number): Observable<OrderItems[]> {
    return this.http.get<OrderItems[]>(`${this.apiUrlOrderItems}/order/${orderId}`);
  }
  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrlOrders}/${orderId}`);
  }

  getUserOrder(userId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrlOrders}/user/${userId}`);
  }


}