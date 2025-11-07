export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface NewProductInput {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
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