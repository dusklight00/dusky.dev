import React from "react";
import NoteProjectCard from "./NoteProjectCard";
import Link from "./Link";
import { Button } from "@chakra-ui/react";

function NoteProjectSection() {
  return (
    <div className="mt-32">
      <div className="flex items-center flex-col gap-5 mb-10">
        <div className="font-sans text-white-color h-[50px] text-[40px] font-black mx-auto">
          Other Noteworthy Projects
        </div>
        <Link>view the archieve</Link>
      </div>
      <div className="grid grid-cols-3 gap-7 w-4/6 mx-auto">
        <NoteProjectCard />
        <NoteProjectCard />
        <NoteProjectCard />
        <NoteProjectCard />
        <NoteProjectCard />
        <NoteProjectCard />
      </div>
      <div className="flex justify-center p-10">
        <Button variant="ghost" colorScheme="white" size="md">
          Show More
        </Button>
      </div>
    </div>
  );
}

export default NoteProjectSection;
