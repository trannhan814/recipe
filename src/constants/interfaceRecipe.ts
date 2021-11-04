export interface Ingredient {
  name: string;
  quantity: string;
  [key: string]: string | number;
}

export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: Ingredient[];
}
