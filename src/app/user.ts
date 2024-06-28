import { ProductApi } from "./product";

export interface User {
    id?: number;
    name: string;
    password: string;
    products: ProductApi[];
}