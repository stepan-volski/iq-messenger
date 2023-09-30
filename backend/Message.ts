export interface Message {
  type?:string;
  id?: string;
  content: string;
  timeStamp?: Date;
  isRead?: boolean;
  isDelivered?: boolean;
  author?: string;
}
