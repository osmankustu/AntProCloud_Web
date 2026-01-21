import { Paginated } from "@/core/network/api-results/Paginated";
import { create } from "zustand";
import { DepartmentModel, DepartmentSelectModel } from "../model/department";
import { Listed } from "@/core/network/api-results/Listed";
import {
  GetAllDepartment,
  GetByIdDepartment,
  GetListDepartment,
} from "../service/departmentService";

interface DepartmentState {
  departments: Paginated<DepartmentModel> | null;
  fetchDepartments: (pageIndex: number, pageSize: number) => Promise<void>;

  department: DepartmentModel | null;
  fetchDepartment: (id: string) => Promise<void>;

  departmentOptions: Listed<DepartmentSelectModel> | null;
  fetchDepartmentOptions: () => Promise<void>;

  isLoading: boolean;
}

export const useDepartmentStore = create<DepartmentState>((set, get) => ({
  isLoading: false,
  department: null,
  departmentOptions: null,
  departments: null,

  fetchDepartment: async (id: string) => {
    set({ isLoading: true });
    try {
      const data = await GetByIdDepartment(id);
      set({ department: data.data });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDepartments: async (pageIndex: number, pageSize: number) => {
    set({ isLoading: true });
    try {
      const data = await GetListDepartment(pageIndex, pageSize);
      set({ departments: data.data });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDepartmentOptions: async () => {
    set({ isLoading: true });
    try {
      const data = await GetAllDepartment();
      set({ departmentOptions: data.data });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
}));
