import React from "react";
import { RoughNotation } from "react-rough-notation";
import { useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import WebCrawlerImage from "./../assets/web-crawler.png";

function ArticleLink() {
  const [isHighlight, setIsHighlight] = useState(false);
  const cardBorderColor = useColorModeValue("#E2E8F0", "#2D3748");
  const headingColor = useColorModeValue("#1A202C", "#ECEEF3");
  const bodyColor = useColorModeValue("#718096", "#ACB2C9");
  const metaColor = useColorModeValue("#718096", "#ACB2C9");
  const highlightColor = useColorModeValue("#6e7ba0", "#ACB2C9");

  const handleHover = () => {
    setIsHighlight(!isHighlight);
  };

  return (
    <div
      className="border rounded-lg w-[900px] mx-auto z-20"
      style={{ borderColor: cardBorderColor }}
      onMouseOver={() => setIsHighlight(true)}
      onMouseLeave={() => setIsHighlight(false)}
    >
      <div className="flex">
        <div className="flex-1">
          <div className="text-2xl font-bold font-sans pt-6 px-6 py-1" style={{ color: headingColor }}>
            <RoughNotation
              type="underline"
              show={isHighlight}
              color={highlightColor}
              strokeWidth={2}
            >
              Building a Scalable Scraper
            </RoughNotation>
          </div>
          <div className="font-sans text-xl px-6" style={{ color: bodyColor }}>
            A small walkthrough of what it's like to work remote
          </div>
          <div className="font-sans text-lg px-6 py-4" style={{ color: metaColor }}>
            Posted 6 months ago
          </div>
        </div>
        <div className="w-40 rounded-tr overflow-hidden rounded-bl-[100%]">
          <img src={WebCrawlerImage} alt="Web Crawler" />
        </div>
      </div>
      <hr style={{ borderColor: cardBorderColor }} />
      <div className="px-6 py-2 text-base flex gap-5 font-sans" style={{ color: metaColor }}>
        <div>13 min read</div>
        <div>Life</div>
        <div>Guide</div>
      </div>
    </div>
  );
}

export default ArticleLink;
