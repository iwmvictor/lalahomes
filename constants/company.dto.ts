// constants/company.dto.ts

export interface CreateCompanyDto {
    company: {
      name: string;
      address?: string;
      email: string;
      phoneNumber?: string;
    };
    contactPerson: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber?: string;
      role?: string;
      userId?: number;
    };
  }
  