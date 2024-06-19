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
    // if (res?.data?.success) {
    //   successMessage(res?.data?.data?.message);
    // }
    return res?.data?.data?.data;
  } catch (error: any) {
    console.log("eroror", error);

    errorMessage(error?.response?.data?.message);
  }
};

export const addPost = async (values: any) => {
  try {
    const res = await axios.post(BASE_URL + "/post", values);
    if (res?.data?.success) {
      return res.data.data.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: any) => addPost(post),
    onSuccess: () => {
      successMessage("Post created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
    },
    onError: (error: any) => {
      console.log("error", error);
      errorMessage(error?.response?.data?.message || "Error creating post");
    },
  });
};
