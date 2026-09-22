import { IProperty } from '../../services/property/property';

export interface IAgent {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  role: 'agent';
  bio?: string;
  gender?: string;
  specialization?: string;
  experience?: number;
  licenseNumber?: string;
  location?: string;
  address?: string;
  isActive: boolean;
  propertyCount?: number;
  createdAt?: string;
  updatedAt?: string;
  hasPassword?: boolean;

  properties?: IProperty[];

  propertyStats?: {
    total: number;
    available: {
      count: number;
      percentage: number;
    };
    sold: {
      count: number;
      percentage: number;
    };
    rented: {
      count: number;
      percentage: number;
    };
  };
}

export interface IAgentsResponse {
  success: boolean;
  agents: IAgent[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IAgentResponse {
  success: boolean;
  agent: IAgent;
  message: string;
}
