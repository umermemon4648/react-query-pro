import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "./queryKey";
import axios from "axios";
import { errorMessage, successMessage } from "@/utils/toast";

const BASE_URL = "http://localhost:8001";
// ============================================================
// POST QUERIES
// ============================================================

export const getPosts = async () => {
  try {
    const res = await axios.get(BASE_URL + "/posts");
    if (res?.data?.success) {
      successMessage(res?.data?.data?.message);
    }
    return res?.data?.data?.data;
  } catch (error: any) {
    console.log("eroror", error);

    errorMessage(error?.response?.data?.message);
  }
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: getPosts,
  });
};
