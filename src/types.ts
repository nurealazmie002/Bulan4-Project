export type RootStackParamList = {
  AppContent: undefined; 
  Home: undefined;
  Beranda: undefined;
  Produk: undefined;
  Cart: undefined; 
  Profile: { userId?: string };
  Checkout: undefined;
  ProductDetail: { productId: string | number };
};
export type RootDrawerParamList = {
  Main: undefined;      
  LoginAPI: undefined;  
  Favorite: undefined;
  Upload: undefined;
  StoreLocator: undefined;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string; 
}

export interface NewProductInput {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  category: string;
}

export interface ValidationErrors {
  name?: string;
  price?: string;
  imageUrl?: string;
  description?: string;
}

export type AddProductModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (p: Product) => void;
};