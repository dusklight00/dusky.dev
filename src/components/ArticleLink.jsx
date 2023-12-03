import React from "react";
import { RoughNotation } from "react-rough-notation";
import { useState } from "react";

function ArticleLink() {
  const [isHighlight, setIsHighlight] = useState(false);

  const handleHover = () => {
    setIsHighlight(!isHighlight);
  };

  return (
    <div
      className="border rounded-lg border-background-light-dark-color w-[800px] mx-auto z-20"
      onMouseOver={() => setIsHighlight(true)}
      onMouseLeave={() => setIsHighlight(false)}
    >
      <div className="text-xl font-bold font-sans pt-5 px-5">
        <RoughNotation
          type="underline"
          show={isHighlight}
          color="#ACB2C9"
          strokeWidth={2}
        >
          Living in Turkey and Working at an American Company
        </RoughNotation>
      </div>
      <div className="font-sans text-lg px-5 text-white-dark-color">
        A small walkthrough of what it's like to work remote
      </div>
      <div className="font-sans text-sm px-5 text-white-dark-color pb-3">
        Posted 5 months ago
      </div>
      <hr className="border-background-light-dark-color" />
      <div className="px-5 py-2 text-sm flex gap-5 font-sans text-white-dark-color">
        <div>13 min read</div>
        <div>Life</div>
        <div>Guide</div>
      </div>
    </div>
  );
}

export default ArticleLink;
