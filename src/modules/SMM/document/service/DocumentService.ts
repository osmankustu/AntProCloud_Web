/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/core/network/axiosInstance";

export async function AddDocument(model: any) {
  try {
    const res = await axiosInstance.post("/serviceDocuments", model, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function UpdateDocument(model: any) {
  try {
    const res = await axiosInstance.put("/serviceDocuments", model, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function DeleteDocument(documentId: string) {
  try {
    const res = await axiosInstance.delete("serviceDocuments/" + documentId);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function GetListByActivityIdDocument(activityId: string) {
  try {
    const res = await axiosInstance.get("serviceDocuments/get-list/by-activity-id/" + activityId);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListByRecordIdDocument(recordId: string) {
  try {
    const res = await axiosInstance.get("serviceDocuments/get-list/by-record-id/" + recordId);
    return res.data;
  } catch (error) {
    throw error;
  }
}
