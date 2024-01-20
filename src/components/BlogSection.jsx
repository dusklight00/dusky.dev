import React from "react";
import ArticleLink from "./ArticleLink";
import { Button } from "@chakra-ui/react";

function BlogSection() {
  return (
    <div className="flex flex-col gap-8 items-center pb-10">
      <div className="flex items-center gap-10 w-[700px] mx-auto">
        <div className="h-0 flex-1 border border-white-color opacity-5"></div>
        {/* <div className="font-mono text-grey-color text-xl">03.</div> */}
        <div className="font-sans text-white-color h-[50px] text-[40px] font-black flex-2">
          Blog
        </div>
        <div className="h-0 flex-1 border border-white-color opacity-5"></div>
      </div>
      <ArticleLink />
      <ArticleLink />
      <ArticleLink />
      <Button variant="ghost" colorScheme="white" size="md" className="w-auto">
        Show More
      </Button>
    </div>
  );
}

export default BlogSection;
