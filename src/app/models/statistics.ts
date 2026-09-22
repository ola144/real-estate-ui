export interface IAgentDashboardStatistics {
  overview: {
    totalProperties: number;
    availableProperties: number;
    soldProperties: number;
    rentedProperties: number;
  };

  properties: {
    byStatus: {
      available: number;
      sold: number;
      rented: number;
    };

    byType: Record<string, number>;
  };

  revenue: {
    totalRevenue: number;
    soldRevenue: number;
    rentalRevenue: number;
  };

  revenueChart: {
    categories: string[];
    data: any[] | undefined;
  };

  recentProperties: {
    id: string;
    photo: string;
    price: string;
    title: string;
    status: string;
    listingType: string;
    location: {
      address: string;
    };
  }[];
}

export interface IAdminDashboardStatistics {
  overview: {
    totalProperties: number;
    availableProperties: number;
    soldProperties: number;
    rentedProperties: number;
    totalAgents: number;
    activeAgents: number;
    inactiveAgents: number;
    totalCustomers: number;
  };

  revenue: {
    totalRevenue: number;
    soldRevenue: number;
    rentalRevenue: number;
  };

  properties: {
    byStatus: {
      available: number;
      sold: number;
      rented: number;
    };

    byType: Record<string, number>;
  };

  agents: {
    total: number;
    active: number;
    inactive: number;
    topAgents: {
      agentId: string;
      available: number;
      email: string;
      name: string;
      photo: string;
      rented: number;
      sold: number;
      totalProperties: number;
    }[];
  };

  customers: {
    total: number;
  };

  revenueChart: {
    categories: string[];
    data: number[];
  };

  recentProperties: {
    _id: string;
    photo: string;
    price: string;
    title: string;
    location: {
      address: string;
    };
  }[];
}
