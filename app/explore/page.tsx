"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Loader, PostCard } from "@/components/common";
import { postList } from "@/data";
import { useGetPosts } from "@/lib/react-query/postQueries";
import { Skeleton } from "@/components/ui/skeleton";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

// const SearchResults = ({
//   isSearchFetching,
//   searchedPosts,
// }: SearchResultProps) => {
//   if (isSearchFetching) {
//     return <Loader />;
//   } else if (searchedPosts && searchedPosts.documents.length > 0) {
//     return <GridPostList posts={searchedPosts.documents} />;
//   } else {
//     return (
//       <p className="text-light-4 mt-10 text-center w-full">No results found</p>
//     );
//   }
// };

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const { data: posts, isPending, error } = useGetPosts();

  console.log("data.............", posts);
  console.log("erorr.............", error);
  console.log("isPending.............", isPending);

  const debouncedSearch = useDebounce(searchValue, 500);
  //   const { data: searchedPosts, isFetching: isSearchFetching } =
  //     useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      //   fetchNextPage();
    }
  }, [inView, searchValue]);

  // if (isPending)
  //   return (
  //     <div className="flex-center w-full h-full">
  //       <p className="text-4xl text-white text-bold">
  //         Loading........................
  //       </p>
  //       <Loader width={100} height={100} />
  //     </div>
  //   );

  //   const shouldShowSearchResults = searchValue !== "";
  //   const shouldShowPosts =
  //     !shouldShowSearchResults &&
  //     posts.pages.every((item) => item.documents.length === 0);

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
        <div className="home-posts">
          <ul className="flex flex-col flex-1 gap-9 w-full ">
            {isPending
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="bg-[#1F1F22] h-[325px] w-[600px] rounded-xl mr-4"
                  />
                ))
              : posts?.map((post: any) => (
                  <li key={post._id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))}
          </ul>
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {posts.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item} />
        ))}
      </div> */}

      {/* {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )} */}
    </div>
  );
};

export default Explore;
