"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PostStats } from "@/components/common";
import { DeleteIcon, Trash2, Trash2Icon } from "lucide-react";
import GeneralAlert from "../modal/GeneralAlert";
import { useDeletePost } from "@/lib/react-query/postQueries";

const PostCard = ({ post }: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  //QUERY
  const { mutateAsync: deletePost, isPending: isLoadingDelete } =
    useDeletePost();

  const handleClose = () => {
    setOpen(false);
  };
  const handleContinue = async () => {
    await deletePost("6672ba70587c333ccdcd13cs");
  };

  return (
    <>
      <div className="post-card">
        <div className="flex-between">
          <div className="flex items-center gap-3">
            <Link href={`#`}>
              <img
                src={
                  "https://github.com/shadcn.png" || "/profile-placeholder.svg"
                }
                alt="creator"
                className="w-12 lg:h-12 rounded-full"
              />
            </Link>

            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1">
                {"Alex Carey"}
              </p>
              <div className="flex-center gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular ">8 hours ago</p>
                •
                <p className="subtle-semibold lg:small-regular">
                  {post?.location}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link href={`#`}>
              <img src={"/edit.svg"} alt="edit" width={20} height={20} />
            </Link>
            <Trash2
              onClick={() => {
                setId(post?._id);
                setOpen(true);
              }}
              className="cursor-pointer text-red-500"
              stroke="#877EFF"
            />
          </div>
        </div>

        <Link href={`#`}>
          <div className="small-medium lg:base-medium py-5">
            <p>{post?.caption}</p>
            <ul className="flex gap-1 mt-2">
              {post?.tags?.map((tag: string, index: string) => (
                <li
                  key={`${tag}${index}`}
                  className="text-light-3 small-regular"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>

          <img
            src={post?.imageUrl || "/profile-placeholder.svg"}
            alt="post image"
            className="post-card_img"
          />
        </Link>

        <PostStats />
      </div>

      <GeneralAlert
        title={"Are you absolutely sure?"}
        desc={
          "This action cannot be undone. This will permanently delete the record."
        }
        loading={isLoadingDelete}
        onContinue={handleContinue}
        onCancel={handleClose}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default PostCard;
