import { axiosPublic } from "@/config/axiosConfig";
import { ApiResponse } from "@/types/common-types";
import {useQuery} from "@tanstack/react-query";
import useLanguageStore from "@/store/language-store";

export const getPageData = async <T>(page: string): Promise<ApiResponse<T>> => {
  const {language} = useLanguageStore.getState();
  const res = await axiosPublic.post("/upload/get-page-content", {
    page_name: page,
    lang: language,
  });
  return res.data;
};


export const useGetPageDataQuery = <T>(page: string) => {
  const language = useLanguageStore((state) => state.language);
  return useQuery({
    queryKey: ["page-data", page, language],
    queryFn: () => getPageData<T>(page),
  });
};
