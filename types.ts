export interface Product 
{
    id: string,
    name: string,
    description: string,
    price: number
}

export interface ProductUpdate 
{
    name? : string,
    description? : string,
    price? : number
}