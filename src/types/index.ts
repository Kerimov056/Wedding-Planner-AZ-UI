export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'vendor';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameAz: string;
  icon: string;
  description?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: Category;
  description: string;
  images: string[];
  priceRange: {
    min: number;
    max: number;
  };
  location: {
    city: string;
    district: string;
    address?: string;
  };
  rating: number;
  reviewCount: number;
  contact: {
    phone: string;
    email?: string;
    website?: string;
  };
  availability: string[];
  services: string[];
  isVerified: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  customerId: string;
  vendorId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  price?: number;
  createdAt: string;
}

export interface Review {
  id: string;
  customerId: string;
  vendorId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'booking';
  readAt?: string;
  createdAt: string;
}