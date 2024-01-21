import React from "react";
import { RoughNotation } from "react-rough-notation";
import { useState } from "react";
import WebCrawlerImage from "./../assets/web-crawler.png";

function ArticleLink() {
  const [isHighlight, setIsHighlight] = useState(false);

  const handleHover = () => {
    setIsHighlight(!isHighlight);
  };

  return (
    <div
      className="border rounded-lg border-background-light-dark-color w-[900px] mx-auto z-20"
      onMouseOver={() => setIsHighlight(true)}
      onMouseLeave={() => setIsHighlight(false)}
    >
      <div className="flex">
        <div className="flex-1">
          <div className="text-2xl font-bold font-sans pt-6 px-6 py-1">
            <RoughNotation
              type="underline"
              show={isHighlight}
              color="#ACB2C9"
              strokeWidth={2}
            >
              Building a Scalable Scraper
            </RoughNotation>
          </div>
          <div className="font-sans text-xl px-6 text-white-dark-color">
            A small walkthrough of what it's like to work remote
          </div>
          <div className="font-sans text-lg px-6 text-white-dark-color py-4">
            Posted 6 months ago
          </div>
        </div>
        <div className="w-40 rounded-tr overflow-hidden rounded-bl-[100%]">
          <img src={WebCrawlerImage} alt="Web Crawler" />
        </div>
      </div>
      <hr className="border-background-light-dark-color" />
      <div className="px-6 py-2 text-base flex gap-5 font-sans text-white-dark-color">
        <div>13 min read</div>
        <div>Life</div>
        <div>Guide</div>
      </div>
    </div>
  );
}

export default ArticleLink;
