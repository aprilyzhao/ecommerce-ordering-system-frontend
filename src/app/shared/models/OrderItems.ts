import { Product } from "./Product"
import { Order } from "./Order"

export class OrderItems{
    constructor(product:Product, order:Order){
        this.product = product;
        this.order = order;
    }
    id!:number;
    order!: { id: number };
    product:Product;
    quantity:number = 1;

    get price():number{
        return this.product.price * this.quantity;
    }
}