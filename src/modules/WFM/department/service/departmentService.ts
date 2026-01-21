import axiosInstance from "@/core/network/axiosInstance";
import { DepartmentAddModel, DepartmentUpdateModel } from "../model/department";

export async function AddDepartment(model: DepartmentAddModel) {
  try {
    const res = axiosInstance.post("/departments", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function UpdateDepartment(model: DepartmentUpdateModel) {
  try {
    const res = axiosInstance.put("/departments", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function DeleteDepartment(id: number) {
  try {
    const res = axiosInstance.delete("/departments/" + id);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function GetListDepartment(pageIndex: number, pageSize: number) {
  try {
    const res = axiosInstance.get(`/departments?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function GetAllDepartment() {
  try {
    const res = axiosInstance.get("/departments/get-list/for-select");
    return res;
  } catch (error) {
    throw error;
  }
}

export async function GetByIdDepartment(id: string) {
  try {
    const res = axiosInstance.get("/departments/" + id);
    return res;
  } catch (error) {
    throw error;
  }
}
