import { SignUrlsRequest } from "@/core/models/requests/signUrlsRequest";
import axiosInstance from "@/core/network/axiosInstance";

export async function SignUrls(request: SignUrlsRequest) {
  if (!request.duration) request.duration = 60;
  try {
    const res = await axiosInstance.post("/serviceDocuments/signedUrl", request);
    return res;
  } catch (error) {
    throw error;
  }
}
