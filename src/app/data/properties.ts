export interface IProperty {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  pricePeriod: string;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  status: 'For Sale' | 'For Rent';
  country: string;
  state: string;

  facilities: {
    beds: number;
    baths: number;
    area: string;
    smoking: boolean;
    kitchen: boolean;
    balcony: boolean;
    wifi: boolean;
    parking: boolean;
  };

  agent: {
    name: string;
    role: string;
    image: string;
    location: string;
    properties: number;
  };

  coordinates: {
    lat: number;
    lng: number;
  };
}

export const properties: IProperty[] = [
  {
    id: '1',
    title: 'Star Sun Hotel & Apartment',
    type: 'Apartment',
    location: 'Charlotte, North Carolina, USA',
    country: 'USA',
    state: 'North Carolina',
    status: 'For Rent',
    price: 80,
    pricePeriod: 'Per One Day',
    rating: 4.8,
    reviews: 120,
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Modern apartment located in a peaceful neighborhood with spacious rooms, contemporary interiors, and convenient access to restaurants, shopping centers, and transportation.',
    facilities: {
      beds: 4,
      baths: 2,
      area: '28M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Hussain Ahmed',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      location: 'North Carolina, USA',
      properties: 10,
    },
    coordinates: {
      lat: 35.2271,
      lng: -80.8431,
    },
  },

  {
    id: '2',
    title: 'Luxury Downtown Villa',
    type: 'Villa',
    location: 'Los Angeles, California, USA',
    country: 'USA',
    state: 'California',
    status: 'For Sale',
    price: 850000,
    pricePeriod: 'Total Price',
    rating: 4.9,
    reviews: 86,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Beautiful luxury villa featuring elegant architecture, spacious living areas, a private pool, and stunning city views.',
    facilities: {
      beds: 5,
      baths: 4,
      area: '320M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Sarah Williams',
      role: 'Senior Agent',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      location: 'California, USA',
      properties: 24,
    },
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },

  {
    id: '3',
    title: 'Modern Manhattan Residence',
    type: 'Apartment',
    location: 'New York, New York, USA',
    country: 'USA',
    state: 'New York',
    status: 'For Rent',
    price: 240,
    pricePeriod: 'Per One Day',
    rating: 4.7,
    reviews: 214,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      "Stylish Manhattan apartment with modern furnishings, large windows, and excellent access to the city's major attractions and business districts.",
    facilities: {
      beds: 3,
      baths: 2,
      area: '95M',
      smoking: false,
      kitchen: true,
      balcony: false,
      wifi: true,
      parking: false,
    },
    agent: {
      name: 'Michael Brown',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/41.jpg',
      location: 'New York, USA',
      properties: 18,
    },
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },

  {
    id: '4',
    title: 'Riverside Family House',
    type: 'House',
    location: 'Austin, Texas, USA',
    country: 'USA',
    state: 'Texas',
    status: 'For Sale',
    price: 540000,
    pricePeriod: 'Total Price',
    rating: 4.6,
    reviews: 73,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Spacious family home in a quiet residential area featuring a large backyard, modern kitchen, and comfortable bedrooms.',
    facilities: {
      beds: 4,
      baths: 3,
      area: '240M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'David Wilson',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      location: 'Texas, USA',
      properties: 15,
    },
    coordinates: {
      lat: 30.2672,
      lng: -97.7431,
    },
  },

  {
    id: '5',
    title: 'Ocean View Beach House',
    type: 'House',
    location: 'Miami, Florida, USA',
    country: 'USA',
    state: 'Florida',
    status: 'For Rent',
    price: 320,
    pricePeriod: 'Per One Day',
    rating: 4.9,
    reviews: 189,
    images: [
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Stunning beachfront property offering panoramic ocean views, spacious rooms, private outdoor areas, and easy beach access.',
    facilities: {
      beds: 5,
      baths: 4,
      area: '280M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Emily Johnson',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      location: 'Florida, USA',
      properties: 21,
    },
    coordinates: {
      lat: 25.7617,
      lng: -80.1918,
    },
  },

  {
    id: '6',
    title: 'Green Valley Cottage',
    type: 'Cottage',
    location: 'Denver, Colorado, USA',
    country: 'USA',
    state: 'Colorado',
    status: 'For Sale',
    price: 420000,
    pricePeriod: 'Total Price',
    rating: 4.5,
    reviews: 64,
    images: [
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Charming cottage surrounded by greenery and mountain scenery, perfect for families looking for a peaceful retreat.',
    facilities: {
      beds: 3,
      baths: 2,
      area: '145M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Daniel Miller',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/35.jpg',
      location: 'Colorado, USA',
      properties: 12,
    },
    coordinates: {
      lat: 39.7392,
      lng: -104.9903,
    },
  },

  {
    id: '7',
    title: 'Skyline Luxury Penthouse',
    type: 'Penthouse',
    location: 'Chicago, Illinois, USA',
    country: 'USA',
    state: 'Illinois',
    status: 'For Rent',
    price: 450,
    pricePeriod: 'Per One Day',
    rating: 5.0,
    reviews: 95,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Premium penthouse with breathtaking skyline views, designer interiors, private balcony, and luxurious amenities.',
    facilities: {
      beds: 4,
      baths: 3,
      area: '210M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Sophia Davis',
      role: 'Senior Agent',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      location: 'Illinois, USA',
      properties: 29,
    },
    coordinates: {
      lat: 41.8781,
      lng: -87.6298,
    },
  },

  {
    id: '8',
    title: 'Maplewood Family Home',
    type: 'House',
    location: 'Seattle, Washington, USA',
    country: 'USA',
    state: 'Washington',
    status: 'For Sale',
    price: 690000,
    pricePeriod: 'Total Price',
    rating: 4.7,
    reviews: 108,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Beautiful family residence in a quiet Seattle neighborhood with modern interiors and a spacious garden.',
    facilities: {
      beds: 4,
      baths: 3,
      area: '260M',
      smoking: false,
      kitchen: true,
      balcony: false,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'James Anderson',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/48.jpg',
      location: 'Washington, USA',
      properties: 17,
    },
    coordinates: {
      lat: 47.6062,
      lng: -122.3321,
    },
  },

  {
    id: '9',
    title: 'Modern Brooklyn Loft',
    type: 'Loft',
    location: 'Brooklyn, New York, USA',
    country: 'USA',
    state: 'New York',
    status: 'For Rent',
    price: 180,
    pricePeriod: 'Per One Day',
    rating: 4.6,
    reviews: 132,
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Contemporary loft with an open-plan design, stylish furniture, high ceilings, and excellent city access.',
    facilities: {
      beds: 2,
      baths: 2,
      area: '110M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: false,
    },
    agent: {
      name: 'Olivia Martinez',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/women/36.jpg',
      location: 'New York, USA',
      properties: 14,
    },
    coordinates: {
      lat: 40.6782,
      lng: -73.9442,
    },
  },

  {
    id: '10',
    title: 'Lakeside Luxury Condo',
    type: 'Condo',
    location: 'Boston, Massachusetts, USA',
    country: 'USA',
    state: 'Massachusetts',
    status: 'For Sale',
    price: 730000,
    pricePeriod: 'Total Price',
    rating: 4.8,
    reviews: 91,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Elegant lakeside condominium featuring premium finishes, large windows, and relaxing waterfront views.',
    facilities: {
      beds: 3,
      baths: 2,
      area: '165M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'William Taylor',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/57.jpg',
      location: 'Massachusetts, USA',
      properties: 19,
    },
    coordinates: {
      lat: 42.3601,
      lng: -71.0589,
    },
  },

  {
    id: '11',
    title: 'Palm Garden Residence',
    type: 'Villa',
    location: 'Orlando, Florida, USA',
    country: 'USA',
    state: 'Florida',
    status: 'For Rent',
    price: 210,
    pricePeriod: 'Per One Day',
    rating: 4.7,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Spacious villa surrounded by tropical gardens with a private pool, modern kitchen, and comfortable living spaces.',
    facilities: {
      beds: 4,
      baths: 3,
      area: '220M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Ava Thompson',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/women/29.jpg',
      location: 'Florida, USA',
      properties: 22,
    },
    coordinates: {
      lat: 28.5383,
      lng: -81.3792,
    },
  },

  {
    id: '12',
    title: 'Urban Heights Apartment',
    type: 'Apartment',
    location: 'Atlanta, Georgia, USA',
    country: 'USA',
    state: 'Georgia',
    status: 'For Sale',
    price: 390000,
    pricePeriod: 'Total Price',
    rating: 4.5,
    reviews: 67,
    images: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      "Modern city apartment with spacious bedrooms, contemporary finishes, and convenient access to Atlanta's business district.",
    facilities: {
      beds: 3,
      baths: 2,
      area: '125M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Benjamin Moore',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/61.jpg',
      location: 'Georgia, USA',
      properties: 13,
    },
    coordinates: {
      lat: 33.749,
      lng: -84.388,
    },
  },

  {
    id: '13',
    title: 'Sunset Hills Mansion',
    type: 'Mansion',
    location: 'Nashville, Tennessee, USA',
    country: 'USA',
    state: 'Tennessee',
    status: 'For Sale',
    price: 1250000,
    pricePeriod: 'Total Price',
    rating: 4.9,
    reviews: 48,
    images: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Exclusive mansion featuring luxurious interiors, multiple living areas, a private pool, landscaped gardens, and premium finishes.',
    facilities: {
      beds: 7,
      baths: 6,
      area: '520M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Isabella Thomas',
      role: 'Senior Agent',
      image: 'https://randomuser.me/api/portraits/women/53.jpg',
      location: 'Tennessee, USA',
      properties: 31,
    },
    coordinates: {
      lat: 36.1627,
      lng: -86.7816,
    },
  },

  {
    id: '14',
    title: 'Central City Studio',
    type: 'Studio',
    location: 'San Diego, California, USA',
    country: 'USA',
    state: 'California',
    status: 'For Rent',
    price: 95,
    pricePeriod: 'Per One Day',
    rating: 4.4,
    reviews: 88,
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Comfortable city studio designed for modern living, featuring an efficient kitchen, cozy sleeping area, and high-speed internet.',
    facilities: {
      beds: 1,
      baths: 1,
      area: '55M',
      smoking: false,
      kitchen: true,
      balcony: false,
      wifi: true,
      parking: false,
    },
    agent: {
      name: 'Ethan Jackson',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/24.jpg',
      location: 'California, USA',
      properties: 9,
    },
    coordinates: {
      lat: 32.7157,
      lng: -117.1611,
    },
  },

  {
    id: '15',
    title: 'Mountain View Chalet',
    type: 'Chalet',
    location: 'Salt Lake City, Utah, USA',
    country: 'USA',
    state: 'Utah',
    status: 'For Rent',
    price: 275,
    pricePeriod: 'Per One Day',
    rating: 4.8,
    reviews: 114,
    images: [
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Cozy mountain chalet offering spectacular views, warm interiors, modern facilities, and a peaceful atmosphere.',
    facilities: {
      beds: 4,
      baths: 3,
      area: '190M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Mia White',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/women/41.jpg',
      location: 'Utah, USA',
      properties: 16,
    },
    coordinates: {
      lat: 40.7608,
      lng: -111.891,
    },
  },

  {
    id: '16',
    title: 'Garden View Townhouse',
    type: 'Townhouse',
    location: 'Portland, Oregon, USA',
    country: 'USA',
    state: 'Oregon',
    status: 'For Sale',
    price: 480000,
    pricePeriod: 'Total Price',
    rating: 4.6,
    reviews: 76,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Well-maintained townhouse featuring a private garden, spacious living room, modern kitchen, and dedicated parking.',
    facilities: {
      beds: 3,
      baths: 2,
      area: '175M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Alexander Harris',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      location: 'Oregon, USA',
      properties: 11,
    },
    coordinates: {
      lat: 45.5152,
      lng: -122.6784,
    },
  },

  {
    id: '17',
    title: 'Harbor Front Condo',
    type: 'Condo',
    location: 'San Francisco, California, USA',
    country: 'USA',
    state: 'California',
    status: 'For Rent',
    price: 290,
    pricePeriod: 'Per One Day',
    rating: 4.8,
    reviews: 143,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Stylish waterfront condo with beautiful harbor views, premium furnishings, and easy access to restaurants and entertainment.',
    facilities: {
      beds: 2,
      baths: 2,
      area: '120M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Charlotte Martin',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      location: 'California, USA',
      properties: 26,
    },
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },

  {
    id: '18',
    title: 'Oakwood Residential Home',
    type: 'House',
    location: 'Philadelphia, Pennsylvania, USA',
    country: 'USA',
    state: 'Pennsylvania',
    status: 'For Sale',
    price: 365000,
    pricePeriod: 'Total Price',
    rating: 4.5,
    reviews: 58,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Classic residential home with renovated interiors, spacious bedrooms, a modern kitchen, and a private outdoor area.',
    facilities: {
      beds: 4,
      baths: 2,
      area: '205M',
      smoking: false,
      kitchen: true,
      balcony: false,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Henry Thompson',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/men/73.jpg',
      location: 'Pennsylvania, USA',
      properties: 14,
    },
    coordinates: {
      lat: 39.9526,
      lng: -75.1652,
    },
  },

  {
    id: '19',
    title: 'Royal Park Apartment',
    type: 'Apartment',
    location: 'Washington, District of Columbia, USA',
    country: 'USA',
    state: 'District of Columbia',
    status: 'For Rent',
    price: 155,
    pricePeriod: 'Per One Day',
    rating: 4.7,
    reviews: 102,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Elegant apartment located near parks, restaurants, and major landmarks, offering comfortable rooms and modern amenities.',
    facilities: {
      beds: 2,
      baths: 2,
      area: '100M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: false,
    },
    agent: {
      name: 'Amelia Garcia',
      role: 'Agent',
      image: 'https://randomuser.me/api/portraits/women/74.jpg',
      location: 'Washington, USA',
      properties: 20,
    },
    coordinates: {
      lat: 38.9072,
      lng: -77.0369,
    },
  },

  {
    id: '20',
    title: 'Grand Oak Luxury Estate',
    type: 'Estate',
    location: 'Houston, Texas, USA',
    country: 'USA',
    state: 'Texas',
    status: 'For Sale',
    price: 980000,
    pricePeriod: 'Total Price',
    rating: 4.9,
    reviews: 81,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Exceptional luxury estate with expansive living areas, elegant bedrooms, landscaped grounds, private parking, and premium amenities.',
    facilities: {
      beds: 6,
      baths: 5,
      area: '450M',
      smoking: false,
      kitchen: true,
      balcony: true,
      wifi: true,
      parking: true,
    },
    agent: {
      name: 'Lucas Robinson',
      role: 'Senior Agent',
      image: 'https://randomuser.me/api/portraits/men/81.jpg',
      location: 'Texas, USA',
      properties: 27,
    },
    coordinates: {
      lat: 29.7604,
      lng: -95.3698,
    },
  },
];
