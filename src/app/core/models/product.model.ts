export interface ProductSummary {
  id: string;
  brand: string;
  model: string;
  price: string | number;
  imgUrl: string;
}

export interface ProductOption {
  code: number;
  name: string;
}

// La API tiene erratas en algunos campos (secondaryCmera, dimentions); se respetan tal cual.
export interface ProductDetail extends ProductSummary {
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string | string[];
  secondaryCmera: string | string[];
  dimentions: string;
  weight: string;
  options: {
    colors: ProductOption[];
    storages: ProductOption[];
  };
}

export interface AddToCartBody {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface Crumb {
  label: string;
  url?: string;
}
