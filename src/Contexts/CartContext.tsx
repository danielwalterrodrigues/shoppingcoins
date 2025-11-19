import {createContext, Dispatch, SetStateAction} from 'react';


export interface CartData {
    userId: number;
    productId: number;
    productName: string,
    qty: number;
    amount: number;
    paymentDate: Date;
}


export type CartContextType = [
  CartData | null, 
  Dispatch<SetStateAction<CartData | null>>
];

const initialValue: CartContextType = [
    null, () => {}
];

const CartProfile = createContext<CartContextType>(initialValue);

export default CartProfile;
