export interface StatCard {
  title: string;
  value: string;
  percentage: number;
  color: string;
  icon: string;
}

export interface IAgent {
  id: number;
  name: string;
  role: string;
  image: string;
  properties: number;
  rating: number;
}

export interface Sale {
  property: string;
  location: string;
  price: string;
  image: string;
}

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
}

export const stats: StatCard[] = [
  {
    title: 'Properties for Sale',
    value: '684',
    percentage: 72,
    color: '#4f5bea',
    icon: 'sale',
  },
  {
    title: 'Properties for Rent',
    value: '546',
    percentage: 65,
    color: '#ff7a32',
    icon: 'rent',
  },
  {
    title: 'Total Customer',
    value: '5,732',
    percentage: 78,
    color: '#21c884',
    icon: 'customer',
  },
  {
    title: 'Total City',
    value: '90',
    percentage: 61,
    color: '#ff5c86',
    icon: 'city',
  },
];

export const revenueData = [
  { month: 'Jan', lastMonth: 32, runningMonth: 22 },
  { month: 'Feb', lastMonth: 48, runningMonth: 30 },
  { month: 'Mar', lastMonth: 42, runningMonth: 28 },
  { month: 'Apr', lastMonth: 36, runningMonth: 25 },
  { month: 'May', lastMonth: 58, runningMonth: 42 },
  { month: 'Jun', lastMonth: 54, runningMonth: 38 },
  { month: 'Jul', lastMonth: 44, runningMonth: 27 },
];

export const referrals = [
  {
    name: 'Social Media',
    percentage: 64,
    color: '#6757e8',
  },
  {
    name: 'Marketplaces',
    percentage: 40,
    color: '#6cc76c',
  },
  {
    name: 'Websites',
    percentage: 50,
    color: '#ffc24b',
  },
  {
    name: 'Digital Ads',
    percentage: 80,
    color: '#ff8db2',
  },
  {
    name: 'Others',
    percentage: 15,
    color: '#ff4d4d',
  },
];

export const agents: IAgent[] = [
  {
    id: 1,
    name: 'John Anderson',
    role: 'Senior Agent',
    image: 'https://i.pravatar.cc/150?img=11',
    properties: 42,
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Property Agent',
    image: 'https://i.pravatar.cc/150?img=12',
    properties: 35,
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Senior Agent',
    image: 'https://i.pravatar.cc/150?img=13',
    properties: 29,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Property Agent',
    image: 'https://i.pravatar.cc/150?img=44',
    properties: 24,
    rating: 4.9,
  },
  {
    id: 5,
    name: 'David Wilson',
    role: 'Real Estate Agent',
    image: 'https://i.pravatar.cc/150?img=15',
    properties: 21,
    rating: 4.6,
  },
];

export const latestSales: Sale[] = [
  {
    property: 'Metro Jayakar Apartment',
    location: 'North Carolina, USA',
    price: '+$55',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
  },
  {
    property: 'Letdo Ji Hotel & Apartment',
    location: 'Carolina North, UK',
    price: '+$40',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=81',
  },
  {
    property: 'Star Sun Hotel & Apartment',
    location: 'North Carolina, USA',
    price: '+$50',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=83',
  },
  {
    property: 'Metro Jayakar Apartment',
    location: 'North Carolina, USA',
    price: '+$45',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=84',
  },
];

export const properties: Property[] = [
  {
    id: 1,
    title: 'Modern Luxury Villa',
    location: 'Lekki, Lagos',
    price: 85000000,
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 4,
  },
  {
    id: 2,
    title: 'Contemporary Family House',
    location: 'Ikoyi, Lagos',
    price: 120000000,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    id: 3,
    title: 'Modern Apartment',
    location: 'Victoria Island, Lagos',
    price: 65000000,
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 4,
    title: 'Elegant Duplex',
    location: 'Ajah, Lagos',
    price: 95000000,
    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80',
    type: 'Duplex',
    bedrooms: 4,
    bathrooms: 4,
  },
  {
    id: 5,
    title: 'Minimalist Residence',
    location: 'Yaba, Lagos',
    price: 45000000,
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    type: 'House',
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 6,
    title: 'Luxury Waterfront Home',
    location: 'Banana Island, Lagos',
    price: 250000000,
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    type: 'Villa',
    bedrooms: 6,
    bathrooms: 5,
  },
];
