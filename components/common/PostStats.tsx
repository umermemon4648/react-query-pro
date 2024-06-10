import React from "react";

const PostStats = () => {
  return (
    <div className={`flex justify-between items-center z-20 w-full`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${"/liked.svg"}`}
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{7}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={"/saved.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
