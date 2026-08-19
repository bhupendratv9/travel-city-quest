import {axiosPublic} from "@/config/axiosConfig";
import {useQuery} from "@tanstack/react-query";
import {ApiResponse, LanguagesResponse} from "@/types/common-types";

export const getLanguageData = async ():Promise<ApiResponse<LanguagesResponse>> => {
  const response = await axiosPublic.get("/common/language");
  return response.data;
}

export const useGetLanguageQuery = () => {
  return useQuery({
    queryKey: ["language"],
    queryFn:() => getLanguageData(),
  })
};