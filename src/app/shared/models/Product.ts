import { Tag } from "./Tag";

export class Product{
    id!:number;
    name!:string;
    price!:number;
    imageUrl!:string;
    newArrival?:boolean;
    tags?: Tag[];
    description?:string;
}