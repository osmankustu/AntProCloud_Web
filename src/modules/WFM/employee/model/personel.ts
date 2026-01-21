import { BaseModel } from "@/core/models/base-model";

export interface PersonelModel extends BaseModel {
  code: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  hireDate: string;
  position: string;
  department: string;
  departmentId: number;
  isActive: boolean;
}

export interface PersonelSelectModel {
  id: string;
  firstName: string;
  lastName: string;
  code: string;
  fullName: string;
}

export interface PersonelAddModel {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string | undefined;
  hireDate: string | undefined;
  isActive: boolean;
  position: string;
  departmentId: number;
}

export interface PersonelUpdateModel {
  id: string;
  code: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  hireDate: string;
  position: string;
  departmentId: number;
  isActive: boolean;
  createdDate: string;
}
