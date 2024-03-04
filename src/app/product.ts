export interface cartProduct{
    price:string;
    _id:string;
    count:string;
    product:Product;
}

export interface Product {
    sold?:            number;
    images?:          string[];
    subcategory?:     Brand[];
    ratingsQuantity?: number;
    _id?:             string;
    title?:           string;
    slug?:            string;
    description?:     string;
    quantity?:        number;
    price?:           number;
    imageCover?:      string;
    category?:        Brand;
    brand?:           Brand;
    ratingsAverage?:  number;
    createdAt?:       Date;
    updatedAt?:       Date;
    id?:              string;
    name?:            string;
    image?:            string;
}

export interface Brand {
    _id?:       string;
    name?:      string;
    slug?:      string;
    image?:    string;
    category?: string;
}
