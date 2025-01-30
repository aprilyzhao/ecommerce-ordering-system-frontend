import { OrderItems } from "./OrderItems";

export class Order{

    id!:number;
    userId!:string
    items:OrderItems[]=[];

    get totalPrice():number{
        let totalPrice = 0;
        this.items.forEach(items =>{
            totalPrice += items.price;
        });
        
        return totalPrice;
    }
}