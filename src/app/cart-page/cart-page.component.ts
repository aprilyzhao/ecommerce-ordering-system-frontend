import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Order } from '../shared/models/Order';
import { OrderItems } from '../shared/models/OrderItems';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  order?: Order;
  orderItems: OrderItems[] = [];
  isVisible: boolean = true;
  constructor(private orderService:OrderService, private productService:ProductService) { 
    
    
  }
  ngOnInit(): void {
    this.setCart(); 
    //console.log('Cart items:', this.order);
  }

  removeFromCart(orderItems: OrderItems){
    this.orderService.removeFromCart(orderItems.product.id);
    this.setCart();
  }

  changeQuantity(orderItems: OrderItems, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.orderService.changeQuantity(orderItems.product.id, quantity);
    this.setCart();
  }

  setCart() {
    const userId = 1; 
    this.orderService.getUserOrder(userId).subscribe(order => {
      this.order = order;
      this.loadCartItems(order.id);
      this.isVisible = (this.order?.items?.length??0) === 0;
    });
  }
  //comment
  //comment2
  loadCartItems(orderId: number) {
    this.orderService.getCartItems(orderId).subscribe(items => {
      this.orderItems = items;
    });
  }

}
