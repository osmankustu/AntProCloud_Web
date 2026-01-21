import { BaseCustomer } from "@/core/models/base-customer";
import { BaseModel } from "@/core/models/base-model";

export interface CorporateCustomerModel extends BaseModel, BaseCustomer {
  customerNo: string;
  companyName: string;
  taxNumber: string;
  sector: string;
  authorizedPerson: string;
  authorizedPersonPhone: string;
  authorizedPersonEmail: string;
}

export interface CorporateCustomerSelectModel {
  id: string;
  customerNo: string;
  companyName: string;
}

export interface CorporateCustomerAddModel {
  companyName: string;
  taxNumber: string;
  sector: string;
  phoneNumber: string;
  email: string;
  authorizedPerson: string;
  authorizedPersonPhone: string;
  authorizedPersonEmail: string;
}

export interface CorporateCustomerUpdateModel {
  id: string;
  customerNo: string;
  companyName: string;
  taxNumber: string;
  sector: string;
  phoneNumber: string;
  email: string;
  authorizedPerson: string;
  authorizedPersonPhone: string;
  authorizedPersonEmail: string;
  createdDate: string;
}
