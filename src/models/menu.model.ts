export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Category {
  name: string;
  items: MenuItem[];
}

export interface CartItem extends MenuItem {  
  quantity:number;
}

export interface Order {
  id: number;
  date: string;
  items: CartItem[];
  total: number;
}

export interface PastOrder {
  id: number;
  date: string;
  items: CartItem[];
  total: number;
}
