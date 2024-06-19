"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  const handleMove = () => {
    router.back();
  };
  return (
    <div>
      <Button onClick={handleMove} variant={"primary"}>
        Back
      </Button>
    </div>
  );
};

export default page;
