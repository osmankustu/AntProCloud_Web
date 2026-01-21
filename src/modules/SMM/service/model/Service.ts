import { BaseModel } from "@/core/models/base-model";

export interface ServiceModel extends BaseModel {
  code: string;
  title: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  url: string;
  customerId: string;
  customerName?: string;
  customerType: string;
  assignmentId: string;
  poolId: string;
  latitude: number | null;
  longitude: number | null;
  cityId: number;
  districtId: number;
  city: string;
  district: string;
  employeeId?: string;
  teamId?: string;
}

export interface ServiceAddModel {
  title: string;
  subject: string;
  description: string;
  priority: string;
  url: string;
  customerId: string;
  customerType?: string;
  employeeId: string;
  teamId: string;
  latitude: number;
  longitude: number;
  cityId: number;
  districtId: number;
  city: string;
  district: string;
}

export interface ServiceUpdateModel {
  id: string;
  code: string;
  title: string;
  subject: string;
  description: string;
  priority: string;
  url: string;
  createdDate: string;
  customerType: string;
  customerId: string;
  employeeId?: string;
  teamId?: string;
  latitude: number;
  longitude: number;
  cityId: number;
  districtId: number;
  city: string;
  district: string;
}
