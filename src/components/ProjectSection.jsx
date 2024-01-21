import React from "react";
import ProjectItem from "./ProjectItem";

function ProjectSection() {
  return (
    <div>
      <div className="flex items-center gap-10 mt-10 ml-60 w-[700px] my-20">
        {/* <div className="font-mono text-grey-color text-xl">02.</div> */}
        <div className="font-sans text-white-color h-[50px] text-[50px] font-black flex-2 pl-3">
          Projects
        </div>
        <div className="h-0 flex-1 border border-white-color opacity-5"></div>
      </div>
      <ProjectItem alignment="right" />
      <ProjectItem alignment="left" />
      <ProjectItem alignment="right" />
    </div>
  );
}

export default ProjectSection;
