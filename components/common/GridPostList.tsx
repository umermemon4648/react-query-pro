import React from "react";
import Link from "next/link";
import { PostStats } from "@/components/common";
import { postList } from "@/data";

const GridPostList = () => {
  return (
    <ul className="grid-container">
      {postList.map((post) => (
        <li key={post._id} className="relative min-w-80 h-80">
          <Link href={`/posts/${post._id}`} className="grid-post_link">
            <img
              src={post?.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            <div className="flex items-center justify-start gap-2 flex-1">
              <img
                src={
                  "https://github.com/shadcn.png" || "/profile-placeholder.svg"
                }
                alt="creator"
                className="w-8 h-8 rounded-full"
              />
              <p className="line-clamp-1">{"Alex Carey"}</p>
            </div>
            <PostStats />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
