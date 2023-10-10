export interface Message {
  type?: string;
  _id?: string;
  content?: string;
  timeStamp?: Date;
  isRead?: boolean;
  isDelivered?: boolean;
  author?: string | null;
}
