"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Loader, PostCard } from "@/components/common";
import { postList } from "@/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PostModal } from "@/components/modal/PostModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKey";
import { getPosts } from "@/lib/react-query/postQueries";
import { Loader2 } from "lucide-react";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const Explore = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { ref, inView, entry } = useInView({
    threshold: 0.8,
  });

  const {
    data: posts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages) => {
      return pages.length < lastPage.pagesCount ? pages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  const debouncedSearch = useDebounce(searchValue, 500);

  const handleMove = () => {
    router.push("/new");
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [entry, inView]);

  const flatArray = posts?.pages.map((val) => val.data);
  console.log("flatArray", flatArray);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/search.svg" width={24} height={24} alt="search" />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e: any) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="home-container">
        <div className="flex items-center justify-between">
          <Button onClick={handleMove} variant={"primary"}>
            Move
          </Button>
          <PostModal>
            <Button variant={"primary"}>Add</Button>
          </PostModal>
        </div>
        <div className="home-posts">
          <ul className="flex flex-col flex-1 gap-9 w-full ">
            {isPending
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="bg-[rgb(31,31,34)] h-[325px] w-[600px] rounded-xl mr-4"
                  />
                ))
              : posts?.pages?.map((page: any, index: number) => (
                  <React.Fragment key={index}>
                    {page?.data?.map((post: any, index1: number) => {
                      return (
                        <li
                          key={post?._id}
                          className="flex justify-center w-full"
                        >
                          <PostCard post={post} />
                        </li>
                      );
                    })}
                  </React.Fragment>
                ))}

            {hasNextPage && (
              <div ref={ref} className="mt-10">
                <Loader2 />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Explore;
