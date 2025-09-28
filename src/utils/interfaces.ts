export interface itemsInterface {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export interface itemsState {
  items: itemsInterface[];
  fetchJson: (apiUrl: string) => Promise<void>;
}

export interface sortTypes {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  open: boolean;
  setOpen: (state: boolean) => void;
  selected: number;
  setSelected: (index: number) => void;
}

export interface cartItem {
  id: number;
  pizzaImageUrl: string;
  pizzaTitle: string;
  pizzaType: number;
  pizzaSize: number;
  count: number;
  price: number;
}

export interface cartInterface {
  cartItems: cartItem[];
  setCount: (item: cartItem, count: number) => void;
  addItem: (item: cartItem) => void;
  removeItem: (item: cartItem) => void;
  clearItems: () => void;
}
