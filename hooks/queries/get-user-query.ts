import {axiosPrivate} from "@/config/axiosConfig";
import {ApiResponse} from "@/types/common-types";
import {UserResponse} from "@/types/user-types";
import {useQuery} from "@tanstack/react-query";

export const getUserData = async ():Promise<ApiResponse<UserResponse>> => {
  const response = await axiosPrivate.get("/auth/me",{
    validateStatus: (status) => status < 500,
  });
  return response.data;
}

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn:() =>  getUserData(),
  });
};