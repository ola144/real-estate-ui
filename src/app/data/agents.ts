export interface IAgent {
  id: string;
  name: string;
  role: string;
  age: number;
  city: string;
  location: string;
  properties: number;
  state: string;
  country: string;
  postcode: string;
  agentId: string;
  phone: string;
  email: string;
  image: string;
  coverImage: string;
  dateOfBirth: string;
}

export const agentLists: IAgent[] = [
  {
    id: '1',
    name: 'Hussain Ahmed',
    role: 'Agent',
    age: 26,
    dateOfBirth: '2000-03-15',
    city: 'New York City',
    state: 'New York',
    country: 'USA',
    location: 'New York City, New York, USA',
    postcode: '10001',
    agentId: '+1841 867 6845',
    phone: '+1201 524 356 480',
    email: 'hussain456@gmail.com',
    properties: 10,
    coverImage:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },

  {
    id: '2',
    name: 'Karen Eilla Boyette',
    role: 'Real-Estate Agent',
    age: 31,
    dateOfBirth: '1995-06-22',
    city: 'Manchester',
    state: 'New Hampshire',
    country: 'USA',
    location: 'Manchester, New Hampshire, USA',
    postcode: '03101',
    agentId: '+1617 428 9214',
    phone: '+1617 324 781 250',
    email: 'karen.boyette@gmail.com',
    properties: 15,
    coverImage:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },

  {
    id: '3',
    name: 'Walter David Moye',
    role: 'Real-Estate Agent',
    age: 29,
    dateOfBirth: '1997-01-18',
    city: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    location: 'Chicago, Illinois, USA',
    postcode: '60601',
    agentId: '+1312 657 4398',
    phone: '+1312 845 621 390',
    email: 'walter.moye@gmail.com',
    properties: 10,
    coverImage:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },

  {
    id: '4',
    name: 'David Smith Raddy',
    role: 'Real-Estate Agent',
    age: 34,
    dateOfBirth: '1992-04-10',
    city: 'Manchester',
    state: 'England',
    country: 'UK',
    location: 'Manchester, England, UK',
    postcode: 'M1 1AE',
    agentId: '+44161 584 2397',
    phone: '+44161 728 493 210',
    email: 'david.raddy@gmail.com',
    properties: 15,
    coverImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },

  {
    id: '5',
    name: 'Jhon Haron Babby',
    role: 'Real-Estate Agent',
    age: 38,
    dateOfBirth: '1988-08-05',
    city: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    location: 'Chicago, Illinois, USA',
    postcode: '60614',
    agentId: '+1312 594 7621',
    phone: '+1312 516 438 920',
    email: 'jhon.babby@gmail.com',
    properties: 15,
    coverImage:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
  },

  {
    id: '6',
    name: 'Sophia Williams',
    role: 'Senior Agent',
    age: 30,
    dateOfBirth: '1996-11-12',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    location: 'Los Angeles, California, USA',
    postcode: '90001',
    agentId: '+1323 748 5612',
    phone: '+1323 617 284 590',
    email: 'sophia.williams@gmail.com',
    properties: 24,
    coverImage:
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },

  {
    id: '7',
    name: 'Michael Anderson',
    role: 'Real-Estate Agent',
    age: 42,
    dateOfBirth: '1984-02-27',
    city: 'Toronto',
    state: 'Ontario',
    country: 'Canada',
    location: 'Toronto, Ontario, Canada',
    postcode: 'M5V 2T6',
    agentId: '+1416 783 4291',
    phone: '+1416 594 728 360',
    email: 'michael.anderson@gmail.com',
    properties: 18,
    coverImage:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/men/71.jpg',
  },

  {
    id: '8',
    name: 'Emily Johnson',
    role: 'Property Consultant',
    age: 28,
    dateOfBirth: '1998-05-19',
    city: 'Miami',
    state: 'Florida',
    country: 'USA',
    location: 'Miami, Florida, USA',
    postcode: '33101',
    agentId: '+1305 641 2875',
    phone: '+1305 728 415 690',
    email: 'emily.johnson@gmail.com',
    properties: 21,
    coverImage:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/women/48.jpg',
  },

  {
    id: '9',
    name: 'Daniel Thompson',
    role: 'Real-Estate Agent',
    age: 36,
    dateOfBirth: '1990-09-08',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    location: 'Austin, Texas, USA',
    postcode: '73301',
    agentId: '+1512 837 4296',
    phone: '+1512 648 372 510',
    email: 'daniel.thompson@gmail.com',
    properties: 13,
    coverImage:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
  },

  {
    id: '10',
    name: 'Olivia Martinez',
    role: 'Property Consultant',
    age: 33,
    dateOfBirth: '1993-07-14',
    city: 'Boston',
    state: 'Massachusetts',
    country: 'USA',
    location: 'Boston, Massachusetts, USA',
    postcode: '02108',
    agentId: '+1617 492 6381',
    phone: '+1617 835 294 710',
    email: 'olivia.martinez@gmail.com',
    properties: 20,
    coverImage:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    image: 'https://randomuser.me/api/portraits/women/56.jpg',
  },
];
