import { BaseModel } from "@/core/models/base-model";
import { PersonelModel } from "@/modules/WFM/employee/model/personel";

export interface TeamModel extends BaseModel {
  code: string;
  name: string;
  employeeCount: string;
  isActive: boolean;
  personels: PersonelModel[];
}

export interface TeamSelectModel {
  id: string;
  fullName: string;
  code: string;
}

export interface TeamAddModel {
  name: string;
  personelIds: string[];
}

export interface TeamUpdateModel {
  id: string;
  name: string;
  personelIds: string[];
  createdDate: string;
  isActive: boolean;
  code: string;
}
