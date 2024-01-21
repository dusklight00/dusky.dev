import React from "react";
import NoteProjectCard from "./NoteProjectCard";
import Link from "./Link";
import { Button } from "@chakra-ui/react";

function NoteProjectSection() {
  return (
    <div className="mt-32">
      <div className="flex items-center flex-col gap-5 mb-10">
        <div className="font-sans text-white-color h-[50px] text-[40px] font-black mx-auto">
          Other Projects
        </div>
        <Link>View the Archive</Link>
      </div>
      <div className="grid grid-cols-3 gap-7 w-4/6 mx-auto">
        <NoteProjectCard
          title="Webscapy"
          description="Webscapy is a Python package that extends the capabilities of the Selenium framework, originally designed for web testing, to perform web scraping tasks"
          tags={["Python", "Selenium", "Web Automation"]}
        />
        <NoteProjectCard
          title="ScrapeGPT"
          description="ScrapGPT is a simple yet powerful library that allows developers to easily interact with the ChatGPT by scraping the website, making it easy to integrate it"
          tags={["Python", "Web Automation", "ChatGPT"]}
        />
        <NoteProjectCard
          title="Kannada Checker"
          description="A OpenCV based tool to check the amount of Kannada text in a given image and see if the amount of text in the image is more than 60% or not"
          tags={["OpenCV", "Python", "Kannada", "OCR"]}
        />
        <NoteProjectCard
          title="Focus Meter"
          description="A tool made using OpenCV, Deep Learning and Python to track the focus of a person during a meeting"
          tags={["OpenCV", "Deep Learning", "Python"]}
        />
        <NoteProjectCard
          title="AI Evaluator"
          description="A tool to evaluate the marks of students in an exam using AI and NLP and give customized remark for each student"
          tags={["Python", "NLP", "Llama", "TrOCR"]}
        />
        <NoteProjectCard
          title="Packet Checker"
          description="A Web App designed on React and Chakra to monitor packets in your network using Scapy in the backend"
          tags={["React", "Chakra", "Python", "Flask", "Scapy"]}
        />
      </div>
      <div className="flex justify-center p-10">
        <Button variant="ghost" colorScheme="white" size="md">
          Link to Github
        </Button>
      </div>
    </div>
  );
}

export default NoteProjectSection;
