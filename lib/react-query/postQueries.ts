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

export const getPosts = async (page: number) => {
  try {
    console.log("page...........", page);

    const pageSize = 2;
    let queryParams = {
      page,
      pageSize,
    };

    const res = await axios.get(BASE_URL + "/posts", { params: queryParams });
    console.log("res", res);
    if (res?.data?.success) {
      const pagesCount = Math.ceil(res?.data?.data?.docCount / pageSize);

      return {
        data: res?.data?.data?.data,
        pagesCount,
        docCount: res?.data?.data?.docCount,
      };
    }
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
export const deletePost = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/post/${id}`);
    if (res?.data?.success) {
      return true;
    }
  } catch (error) {
    throw error;
  }
};
// export const useGetPosts = () => {
//   // return useQuery({
//   //   queryKey: [QUERY_KEYS.GET_POSTS],
//   //   queryFn: getPosts,
//   //   staleTime: 1000 * 60 * 5,
//   // });
//   return useInfiniteQuery({
//     queryKey: [QUERY_KEYS.GET_POSTS],
//     queryFn: ({ page = 1 }) => getPosts(page),
//     getNextPageParam: (lastPage, allPages) => {
//       return lastPage.hasNextPage ? lastPage.hasNextPage : undefined;
//     },
//   });
// };

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

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      successMessage("Post deleted successfully!");
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
