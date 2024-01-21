import React from "react";
import ProjectItem from "./ProjectItem";

import LiveDigitRecognizerImage from "./../assets/live-digit-recognizer.gif";
import HamiltonianPathFinderImage from "./../assets/hamiltonian-path-finder.gif";
import ChessAI from "./../assets/chess-ai.gif";

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
      <ProjectItem
        alignment="right"
        title="Live Digit Recognizer"
        description="A project, that use MNIST dataset along with keras merged with web
            technologies to make a interface that recognize and classifies
            handritten digits live"
        tags={["React", "Chakra", "Python", "Flask", "Keras", "MNIST"]}
        image={LiveDigitRecognizerImage}
      />
      <ProjectItem
        alignment="left"
        title="Chess AI"
        description="A chess AI that uses minimax algorithm with alpha beta pruning to play chess against human"
        tags={["Python", "Minimax", "Alpha Beta Pruning"]}
        image={ChessAI}
      />
      <ProjectItem
        alignment="right"
        title="Hamiltonian Path Finder"
        description="An interactive interface to find Hamiltoninan Path of any type of grid using concepts of Backtracking"
        tags={["React", "Chakra", "Python", "Flask", "Backtracking"]}
        image={HamiltonianPathFinderImage}
      />
    </div>
  );
}

export default ProjectSection;
