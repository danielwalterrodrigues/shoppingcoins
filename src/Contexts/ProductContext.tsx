import {createContext, Dispatch, SetStateAction} from 'react';


export interface ProductData {
    Id: string,
    name: string,
    quickCescription: string,
    price: number,
    imageUri: string,
    category: string
}

export type ProductContextType = [
  ProductData | null, 
  Dispatch<SetStateAction<ProductData | null>>
];

const initialValue: ProductContextType = [
    null, () => {}
];

const ProductProfile = createContext<ProductContextType>(initialValue);

export default ProductProfile;
