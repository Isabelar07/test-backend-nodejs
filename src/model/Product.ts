import { Category } from "./Category";

export class Product {
    constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly price: string,
        public readonly category?: Category[]
    ) {}
}

export interface ProductInputDTO {
    title: string,
    description: string,
    price: string,
    category: string[]
}