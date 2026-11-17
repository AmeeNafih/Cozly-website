export type MaterialType = 'wooden' | 'upholstered' | 'both';

export type SeatingCapacity =
  | '1-Seater'
  | '2-Seater'
  | '3-Seater'
  | 'L-Shape'
  | 'Sectional'
  | 'Sofa-Cum-Bed'
  | 'Recliner'
  | 'Chaise';

export type StockStatus = 'in_stock' | 'made_to_order';

export interface ProductDimensions {
  width: number;
  depth: number;
  height: number;
  seatingHeight?: number;
  unit: 'cm' | 'inches';
}

export interface MaterialsSpec {
  frameWood: string;
  foamType: string;
  springSystem: string;
  legMaterial: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isCover: boolean;
  order: number;
}

export interface FabricOption {
  id: string;
  name: string;
  type: string;
  colorName: string;
  colorHex: string;
  imageUrl?: string;
  priceModifier?: number;
}

export interface WoodFinishOption {
  id: string;
  name: string;
  colorHex: string;
  textureUrl?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  materialType: MaterialType;
  seatingCapacity: SeatingCapacity;
  style: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  fullDescription: string;
  dimensions: ProductDimensions;
  materialsSpec: MaterialsSpec;
  warrantyYears: number;
  deliveryTime: string;
  stockStatus: StockStatus;
  isFeatured: boolean;
  isPublished: boolean;
  images: ProductImage[];
  fabrics: FabricOption[];
  woodFinishes: WoodFinishOption[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  productCount?: number;
}

export interface SiteSettings {
  id?: string;
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  factoryAddress: string;
  city: string;
  state: string;
  pincode: string;
  workingHours: string;
  deliveryStates: string[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  heroContent: {
    slides: {
      id: string;
      title: string;
      subtitle: string;
      tag: string;
      ctaText: string;
      ctaLink: string;
      imageUrl: string;
    }[];
  };
  whyCozly: {
    title: string;
    description: string;
    icon: string;
  }[];
  announcementBar?: {
    enabled: boolean;
    text: string;
    link?: string;
  };
}

export interface CartItem {
  id: string;
  productId?: string;
  name: string;
  slug?: string;
  price: number;
  quantity: number;
  coverImage: string;
  selectedFabric?: string;
  selectedColor?: string;
  selectedFinish?: string;
  selectedFirmness?: string;
  selectedLegs?: string;
  customNotes?: string;
  isCustomDesign?: boolean;
  customDetails?: {
    type: string;
    size: string;
    wood: string;
    fabric: string;
    color: string;
    firmness: string;
    legs: string;
  };
}

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  city: string;
  pincode: string;
  state?: string;
  notes?: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  verified: boolean;
  date: string;
}
