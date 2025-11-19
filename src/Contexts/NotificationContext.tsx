import {createContext, Dispatch, SetStateAction} from 'react';


export interface NotificationData {
  notificationId: number;
  userId: number;
  message: string;
  sentDate: Date;
  expectedArrivalDate: Date;
}


export type NotificationContextType = [
  NotificationData | null, 
  Dispatch<SetStateAction<NotificationData | null>>
];

const initialValue: NotificationContextType = [
    null, () => {}
];

const NotificationProfile = createContext<NotificationContextType>(initialValue);

export default NotificationProfile;
