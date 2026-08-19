import { axiosPrivate } from "@/config/axiosConfig";
import { ApiResponse } from "@/types/common-types";
import { ProfileResponse } from "@/types/profile-types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const getProfileQuery = async (): Promise<
  ApiResponse<ProfileResponse>
> => {
  const res = await axiosPrivate.get("/profile/details", {
    validateStatus: (status) => status < 500,
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });
  return res.data;
};

export const useGetProfileQuery = (
  options?: Omit<
    UseQueryOptions<ApiResponse<ProfileResponse>>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileQuery(),
    ...options,
  });
};
