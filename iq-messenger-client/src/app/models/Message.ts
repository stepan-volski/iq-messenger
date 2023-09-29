export interface Message {
  id?: string;
  content: string;
  timeStamp?: Date;
  source: string;     //localhost or other
  isRead?: boolean;
  isDelivered?: boolean;
}
