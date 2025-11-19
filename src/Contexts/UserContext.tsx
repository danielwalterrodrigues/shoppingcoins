import { createContext, Dispatch, SetStateAction } from 'react';

export interface UserData {
  userId: number;
  logged: boolean;
  name: string;
  username: string;
  photoUrl?: string;
  balance: number;
  signupDate: Date;
}

export type UserContextType = [
  UserData | null, 
  Dispatch<SetStateAction<UserData | null>>
];


const initialValue: UserContextType = [
    null, () => {}
];

const UserProfile = createContext<UserContextType>(initialValue);

export default UserProfile;