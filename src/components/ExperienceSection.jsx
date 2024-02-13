import { Gallery } from "react-grid-gallery";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "./src/assets/at-makeathon/1.jpg" },
  { url: "./src/assets/at-makeathon/2.jpg" },
  { url: "./src/assets/at-makeathon/3.jpg" },
  { url: "./src/assets/at-makeathon/4.jpg" },
  { url: "./src/assets/at-makeathon/5.jpg" },
  { url: "./src/assets/at-makeathon/6.jpg" },
  { url: "./src/assets/at-makeathon/7.jpg" },
];

function ExperienceSection() {
  return (
    <div className="h-[100vh] flex flex-col gap-20 pt-10 px-56">
      <div className="font-sans text-white-color h-[50px] text-6xl font-black flex-2 pl-8">
        Events & Hackathons
      </div>
      <div className="flex border border-[#eceef31c] rounded-xl p-10 w-full">
        <div className="flex w-max">
          {/* <div className="bg-white-color opacity-[0.1] w-[0.1px]"></div> */}
          <div className="font-mono text-sm w-max">
            <div className="px-8 py-3 rounded-md hover:bg-navy-color">
              Upstatement
            </div>
            <div className="px-8 py-3 rounded-md hover:bg-navy-color">
              Apple
            </div>
            <div className="px-8 py-3 rounded-md hover:bg-navy-color">
              Scout Studio
            </div>
            <div className="px-8 py-3 rounded-md hover:bg-navy-color">
              Starry
            </div>
            <div className="px-8 py-3 rounded-md hover:bg-navy-color">
              MullenLowe
            </div>
          </div>
        </div>
        <div className="px-10">
          {/* <SimpleImageSlider
            width={396}
            height={204}
            images={images}
            showBullets={false}
            showNavs={true}
          /> */}
          <div className="text-2xl font-bold py-1">
            Developer
            <span className="mx-2 text-white-dark-color">@ Upstatement</span>
          </div>
          <div className="font-mono text-white-dark-color text-sm py-1">
            Spring 2016 & 2017
          </div>
          <ul className="text-white-dark-color text-md list-disc p-3 flex flex-col gap-3">
            <li>
              Collaborated with other student designers and engineers on
              pro-bono projects to create new brands, design systems, and
              websites for organizations in the community
            </li>
            <li>
              Built and delivered technical solutions according to stakeholder
              business requirements
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
