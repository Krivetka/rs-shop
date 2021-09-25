export interface UserInfo {
  cart: string[];
  favorites: string[];
  orders: Order[];
}
export interface UserFormInfo {
  comment?: string;
  deliveryAddress: string;
  deliveryDate: Date;
  deliveryTime: string;
  fullName: string;
  phoneNumber: string;
}
export interface Order {
  items: [
    {
      id: string;
      amount: number;
    },
  ];
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
  id: string;
}
