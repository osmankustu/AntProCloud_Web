import { create } from "zustand";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import { Listed } from "@/core/network/api-results/Listed";
import { Paginated } from "@/core/network/api-results/Paginated";

import { ServiceModel, ServiceUpdateModel } from "../model/Service";
import { GetByIdService, GetListByDynamicService, GetListService } from "../service/ServiceService";

interface ServiceState {
  services: Paginated<ServiceModel> | null;
  fetchServices: (pageIndex: number, pageSize: number) => Promise<void>;
  service: ServiceModel | null;
  fetchService: (id: string) => Promise<void>;
  serviceOptions?: Listed<ServiceModel> | null;
  fetchServiceOptions?: () => Promise<void>;
  updateFormData: ServiceUpdateModel;
  setUpdateField: (
    field: keyof ServiceUpdateModel,
    value: string | string[] | number | null,
  ) => void;
  setUpdateFormData: (data: ServiceUpdateModel) => void;

  isLoading: boolean;
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;

  setIsDynamic: (value: boolean) => void;
  setDynamicQuery: (query: DynamicQuery | null) => void;
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: null,
  service: null,
  serviceOptions: null,
  isLoading: false,
  isDynamic: false,
  dynamicQuery: null,

  fetchServices: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const { isDynamic, dynamicQuery } = get();

      const data =
        isDynamic && dynamicQuery
          ? await GetListByDynamicService(pageIndex, pageSize, dynamicQuery)
          : await GetListService(pageIndex, pageSize);

      set({ services: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchService: async id => {
    set({ isLoading: true });
    try {
      const data = await GetByIdService(id);

      set({ service: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateFormData: {
    id: "",
    title: "",
    subject: "",
    description: "",
    priority: "",
    url: "",
    createdDate: "",
    customerType: "",
    customerId: "",
    employeeId: "",
    teamId: "",
    latitude: 0,
    longitude: 0,
    cityId: 0,
    districtId: 0,
    city: "",
    district: "",
    code: "",
  },

  setUpdateField: (field, value) => {
    set(state => ({
      updateFormData: {
        ...state.updateFormData,
        [field]: value,
      },
    }));
  },

  setUpdateFormData: data => set({ updateFormData: data }),
  setIsDynamic: val => set({ isDynamic: val }),
  setDynamicQuery: query => set({ dynamicQuery: query }),
}));
