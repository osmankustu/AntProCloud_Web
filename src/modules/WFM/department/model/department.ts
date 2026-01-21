import { BaseModel } from "@/core/models/base-model";

export interface DepartmentModel {
  id: number;
  name: string;
  employeeCount: number;
  createdDate: string
  updatedDate: string
}

export interface DepartmentSelectModel {
  id: number;
  name: string;
}

export interface DepartmentAddModel {
  name: string;
}

export interface DepartmentUpdateModel {
  id: string;
  name: string;
}
