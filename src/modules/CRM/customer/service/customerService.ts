import axiosInstance from "@/core/network/axiosInstance";

export async function GetAllCustomer() {
  try {
    const res = await axiosInstance.get("customers");
    return res.data;
  } catch (error) {
    throw error;
  }
}
