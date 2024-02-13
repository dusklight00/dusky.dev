import { Gallery } from "react-grid-gallery";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 320,
    height: 174,
    // isSelected: true,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
    alt: "Boats (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
  },
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
            <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
              Upstatement
            </div>
            <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
              Apple
            </div>
            <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
              Scout Studio
            </div>
            <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
              Starry
            </div>
            <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
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
          {/* <Gallery images={images} style="rounded-lg" /> */}
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
