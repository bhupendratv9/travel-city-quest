import {axiosPublic} from "@/config/axiosConfig";
import {useQuery} from "@tanstack/react-query";

export const getAvatars = async () => {
  const res = await axiosPublic.get("/profile/avatars");
  return res.data;
};

export const useGetAvatarsQuery = () => useQuery({
  queryKey: ["avatars"],
  queryFn: () => getAvatars(),
});

