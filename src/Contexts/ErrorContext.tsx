import {createContext, Dispatch, SetStateAction} from 'react';


export interface ErrorData {
    erro: string,
    typeError: 'error' | 'warning' | 'display' | 'success' | '',
}


export type ErrorContextType = [
  ErrorData | null, 
  Dispatch<SetStateAction<ErrorData | null>>
];

const initialValue: ErrorContextType = [
    null, () => {}
];

const ErrorProfile = createContext<ErrorContextType>(initialValue);

export default ErrorProfile;
