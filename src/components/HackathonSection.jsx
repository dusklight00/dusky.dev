import { Gallery } from "react-grid-gallery";
import useEmblaCarousel from "embla-carousel-react";
import SimpleImageSlider from "react-simple-image-slider";
import ShowMoreText from "react-show-more-text";

const images = [
  {
    src: "https://media.licdn.com/dms/image/D5622AQEJNPDEX9EFsw/feedshare-shrink_800/0/1705959325302?e=1710979200&v=beta&t=OvNMgzFM_H7k-tmcrp_tiEHhUqYHtsP2EK_s2ZFMSUk",
  },
  {
    src: "https://media.licdn.com/dms/image/D5622AQH6WKZcTGaKCQ/feedshare-shrink_800/0/1705959322828?e=1710979200&v=beta&t=NfEYc2XMFNRFI0T9f4VlayzOcgwPmJUs_K0Ar42M7Gs",
  },
  {
    src: "https://media.licdn.com/dms/image/D5622AQG8-WwbH2tYbA/feedshare-shrink_800/0/1705959303384?e=1710979200&v=beta&t=jZH-UrUwmhqAfTcatBTjwwr2ltlsl3mRMt2hFFxWoEQ",
  },
];

const Slider = ({ children, options }) => {
  // 2. initialize EmblaCarousel using the custom hook
  const [emblaRef] = useEmblaCarousel({
    slidesToScroll: 1,
    align: "start",
    ...options,
  });

  return (
    // 3. set ref as emblaRef.
    // make sure we have overflow-hidden and flex so that it displays properly
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-10">{children}</div>
    </div>
  );
};

function HoverLink({ children }) {
  return <span className="font-bold hover:underline">{children}</span>;
}

function LinkedInCard({ imgURL, children, likes, comments }) {
  return (
    <div className="border rounded-lg p-5 flex flex-col w-[550px] gap-3">
      <div className="flex gap-4 items-center">
        <div>
          <img
            src="https://media.licdn.com/dms/image/D5603AQHXOvO8lcPg1Q/profile-displayphoto-shrink_100_100/0/1704030237462?e=1713398400&v=beta&t=gfB_BCDf4d2n6qoLJqNWQIfQNiH1hoiexr7jdlGSAKg"
            alt="profile-picture"
            className="rounded-full w-14 object-cover"
          />
        </div>
        <div>
          <div className="font-bold flex gap-2">
            Rahul Raj
            <span className="text-white-dark-color font-normal">(He/Him)</span>
          </div>
          <div className="text-white-dark-color">Learner</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ShowMoreText>
          <div className="flex flex-col gap-3">{children}</div>
        </ShowMoreText>
        <img src={imgURL} alt="" />
      </div>
      <hr />
      <div>
        <div className="flex items-center gap-1">
          <div className="flex">
            <div className="border w-5 h-5 flex items-center rounded-full bg-background-color border-background-color">
              <img
                src="https://static.licdn.com/aero-v1/sc/h/9sun4diznbhgyelaeryxy75ur"
                alt="like-icon"
                className="w-full h-full"
              />
            </div>
            <div className="border w-5 h-5 flex items-center rounded-full bg-background-color border-background-color ml-[-5px]">
              <img
                src="https://static.licdn.com/aero-v1/sc/h/cjrxeu0ese8oxe32kiom8kzoh"
                alt="clap-icon"
                className="w-full h-full"
              />
            </div>
            <div className="border w-5 h-5 flex items-center rounded-full bg-background-color border-background-color ml-[-5px]">
              <img
                src="https://static.licdn.com/aero-v1/sc/h/37hg81qnm85dsy5mbqfifg9qs"
                alt="love-icon"
                className="w-5 h-5"
              />
            </div>
          </div>
          <div className="text-xs text-white-dark-color flex-1">{likes}</div>
          <div className="text-sm text-white-dark-color">
            {comments} Comments
          </div>
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
}

function HackathonSection() {
  return (
    <div className="flex flex-col gap-20 p-20 pr-[150px] px-56">
      <div className="font-sans text-white-color h-[50px] text-6xl font-black flex-2 pl-8">
        Events & Hackathons
      </div>
      <div className="relative">
        <Slider>
          <div className="flex-[0_0_90%] md:flex-[0_0_40%]">
            <LinkedInCard
              likes="Syad Mohammad and 22 others"
              comments="22"
              imgURL="https://media.licdn.com/dms/image/D5622AQH6WKZcTGaKCQ/feedshare-shrink_800/0/1705959322828?e=1710979200&v=beta&t=NfEYc2XMFNRFI0T9f4VlayzOcgwPmJUs_K0Ar42M7Gs"
            >
              <p>
                I'm excited to announce our success at the AT Makeathon 2024
                conducted by <HoverLink>Shaastra, IIT Madras!</HoverLink> 🚀🔧
              </p>
              <p>
                From the initial idea presentation to showcasing a fully-fledged
                prototype in front of esteemed judges, the journey was nothing
                short of exhilarating. I'm grateful to have shared this
                incredible experience with my fantastic teammates,{" "}
                <HoverLink>Sairaj Todkar</HoverLink> and{" "}
                <HoverLink>Srijani M.</HoverLink> 🙌🏼👥
              </p>
              <p>
                <HoverLink>Srijani M</HoverLink> opening speech at the project
                presentation instantly grabbed the audience's attention with her
                articulate storytelling and passion, setting a strong
                foundation.
              </p>
              <p>
                <HoverLink>Sairaj Todkar</HoverLink> creative additions took the
                project to another level, seamlessly blending visuals and
                innovation.
              </p>
              <p>
                Together, their synergy created a compelling and memorable
                presentation that resonated intellectually and emotionally,
                leaving a lasting impression on the audience. Together, we not
                only participated but secured the 2nd place! 🥈 The synergy
                within our team was the driving force behind this achievement,
                and I'm truly fortunate to have found such an awesome and
                talented group. The journey was not just about winning but also
                about the camaraderie, learning, and, of course, a lot of fun!
                🎉💡
              </p>
              <p>
                A big thank you to <HoverLink>Shaastra, IIT Madras</HoverLink>{" "}
                for organizing this fantastic event that provided a platform for
                innovation and collaboration. The memories created and lessons
                learned will be cherished forever. 🌐🏆
              </p>
              <p>
                Looking forward to more opportunities to collaborate, innovate,
                and have fun in the future! Onwards and upwards! 💪🏼🚀
              </p>
              <p>
                <HoverLink>#ATMakeathon2024</HoverLink>{" "}
                <HoverLink>#Shaastra2024</HoverLink>{" "}
                <HoverLink>#Innovation</HoverLink>{" "}
                <HoverLink>#Winners</HoverLink> <HoverLink>#Teamwork</HoverLink>
                <HoverLink>#Grateful</HoverLink>{" "}
                <HoverLink>#IITMadras</HoverLink>{" "}
                <HoverLink>#Prototype</HoverLink>{" "}
                <HoverLink>#TechInnovation</HoverLink>{" "}
                <HoverLink>#FunTimes</HoverLink>
              </p>
            </LinkedInCard>
          </div>
          <div className="flex-[0_0_90%] md:flex-[0_0_40%]">
            <LinkedInCard />
          </div>
          <div className="flex-[0_0_90%] md:flex-[0_0_40%]">
            <LinkedInCard />
          </div>
        </Slider>
        {/* <div className="absolute top-0 right-0 h-full w-[400px] bg-gradient-to-l from-[#1a202c] to-transparent"></div> */}
      </div>
    </div>
  );
}

export default HackathonSection;

// HACKATHON COMPONENT
// <div className="flex border border-[#eceef31c] rounded-xl p-10 w-full">
//         <div className="flex w-max">
//           {/* <div className="bg-white-color opacity-[0.1] w-[0.1px]"></div> */}
//           <div className="font-mono text-sm w-max">
//             <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
//               Upstatement
//             </div>
//             <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
//               Apple
//             </div>
//             <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
//               Scout Studio
//             </div>
//             <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
//               Starry
//             </div>
//             <div className="px-8 py-3 rounded-md hover:bg-background-light-dark-color">
//               MullenLowe
//             </div>
//           </div>
//         </div>
//         <div className="px-10">
//           {/* <SimpleImageSlider
//             width={396}
//             height={204}
//             images={images}
//             showBullets={false}
//             showNavs={true}
//           /> */}
//           <div className="text-2xl font-bold py-1">
//             Developer
//             <span className="mx-2 text-white-dark-color">@ Upstatement</span>
//           </div>
//           <div className="font-mono text-white-dark-color text-sm py-1">
//             Spring 2016 & 2017
//           </div>
//           <ul className="text-white-dark-color text-md list-disc p-3 flex flex-col gap-3">
//             <li>
//               Collaborated with other student designers and engineers on
//               pro-bono projects to create new brands, design systems, and
//               websites for organizations in the community
//             </li>
//             <li>
//               Built and delivered technical solutions according to stakeholder
//               business requirements
//             </li>
//           </ul>
//           {/* <Gallery images={images} style="rounded-lg" /> */}
//         </div>
//       </div>
