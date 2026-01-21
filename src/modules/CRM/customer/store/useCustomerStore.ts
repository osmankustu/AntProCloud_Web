import { Listed } from "@/core/network/api-results/Listed";
import { CustomerModel } from "../model/Customer";
import { create } from "zustand";
import { GetAllCustomer } from "../service/customerService";

interface CustomerState {
  customerOptions: Listed<CustomerModel> | null;
  fetchCustomerOptions: () => Promise<void>;

  isLoading: boolean;
}

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customerOptions: null,
  isLoading: false,

  fetchCustomerOptions: async () => {
    set({ isLoading: true });
    try {
      const data = await GetAllCustomer();
      set({ customerOptions: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
