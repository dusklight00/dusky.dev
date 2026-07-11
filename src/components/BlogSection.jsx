import React from "react";
import ArticleLink from "./ArticleLink";
import { Button } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

function BlogSection() {
  const headingColor = useColorModeValue("#1A202C", "#ECEEF3");
  const buttonColor = useColorModeValue("#1A202C", "#ECEEF3");
  const buttonBorderColor = useColorModeValue("#CBD5E0", "#4A5568");

  return (
    <div className="flex flex-col gap-8 items-center pb-10">
      <div className="flex items-center justify-center w-[700px] mx-auto p-5">
        {/* <div className="h-0 flex-1 border border-white-color opacity-5"></div> */}
        {/* <div className="font-mono text-grey-color text-xl">03.</div> */}
        <div
          className="font-sans h-[50px] text-5xl font-black flex-2"
          style={{ color: headingColor }}
        >
          Blog
        </div>
        {/* <div className="h-0 flex-1 border border-white-color opacity-5"></div> */}
      </div>
      <ArticleLink />
      <ArticleLink />
      <ArticleLink />
      <Button
        variant="outline"
        size="lg"
        className="w-auto"
        style={{ color: buttonColor, borderColor: buttonBorderColor }}
      >
        Show More
      </Button>
    </div>
  );
}

export default BlogSection;
