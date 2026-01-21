import { BaseModel } from "@/core/models/base-model";

export interface ActivityModel extends BaseModel {
  poolId: string;
  description: string;
  status: string;
  employeeId: string;
}

export interface ActivityAddModel {
  poolId: string;
  description: string;
  status: string;
  employeeId: string;
}

export interface ActivityUpdateModel {
  id: string;
  poolId: string;
  description: string;
  status: string;
  employeeId: string;
  createdDate: string;
}
