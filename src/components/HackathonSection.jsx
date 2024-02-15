import { Gallery } from "react-grid-gallery";
import useEmblaCarousel from "embla-carousel-react";
import SimpleImageSlider from "react-simple-image-slider";
import ShowMoreText from "react-show-more-text";
import EYCertificate from "../assets/certificates/ey-hackathon.png";

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
    <div className="border rounded-lg p-5 flex flex-col w-full gap-3 h-min">
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
      <div className="relative flex gap-4">
        {/* <Slider> */}
        {/* <div className="flex-[0_0_90%] md:flex-[0_0_40%]"> */}
        <div className="flex flex-col gap-4 flex-1">
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
              short of exhilarating. I'm grateful to have shared this incredible
              experience with my fantastic teammates,{" "}
              <HoverLink>Sairaj Todkar</HoverLink> and{" "}
              <HoverLink>Srijani M.</HoverLink> 🙌🏼👥
            </p>
            <p>
              <HoverLink>Srijani M</HoverLink> opening speech at the project
              presentation instantly grabbed the audience's attention with her
              articulate storytelling and passion, setting a strong foundation.
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
              only participated but secured the 2nd place! 🥈 The synergy within
              our team was the driving force behind this achievement, and I'm
              truly fortunate to have found such an awesome and talented group.
              The journey was not just about winning but also about the
              camaraderie, learning, and, of course, a lot of fun! 🎉💡
            </p>
            <p>
              A big thank you to <HoverLink>Shaastra, IIT Madras</HoverLink> for
              organizing this fantastic event that provided a platform for
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
              <HoverLink>#Innovation</HoverLink> <HoverLink>#Winners</HoverLink>{" "}
              <HoverLink>#Teamwork</HoverLink>
              <HoverLink>#Grateful</HoverLink> <HoverLink>#IITMadras</HoverLink>{" "}
              <HoverLink>#Prototype</HoverLink>{" "}
              <HoverLink>#TechInnovation</HoverLink>{" "}
              <HoverLink>#FunTimes</HoverLink>
            </p>
          </LinkedInCard>
          <LinkedInCard
            likes="Kushal Nm and 18 others"
            comments="2"
            imgURL="https://media.licdn.com/dms/image/D5622AQEGGhDxVCXCGA/feedshare-shrink_800/0/1704041005991?e=1710979200&v=beta&t=DImUxTDFv5xVLJ7uTrk5ihwmscahUl34GQXpJVqOs1Y"
          >
            <p>🚀 Conquering Code Debug Competition Journey! 💻</p>
            <p>
              Reflecting on a pivotal moment this year, I'm thrilled to share
              our triumph at the Code Debug Competition alongside my coding
              partner in crime, <HoverLink>Sairaj Todkar</HoverLink>. Through
              three intense rounds against 100+ teams in Karnataka, we navigated
              the coding challenges with skill and determination. 🏆
            </p>
            <p>🔍 Round 1: MCQs & Coding Questions</p>
            <p>🐜 Round 2: Debugging Challenges</p>
            <p>🔄 Round 3: Find and Replace in C++, Java, and Python</p>
            <p>
              The final round pushed our limits as we executed intricate
              find-and-replace tasks across multiple programming languages.
            </p>
            <p>
              Against all odds, we secured a coveted spot in the top 15, a
              testament to our dedication and teamwork. This experience has been
              more than a competition; it's been a journey of growth, learning,
              and building confidence.
            </p>
            <p>
              A huge shoutout to <HoverLink>Sairaj Todkar</HoverLink>, my coding
              partner, for the shared enthusiasm and determination that
              propelled us forward. Here's to more coding adventures,
              challenges, and victories in the chapters yet to unfold! 💻🚀
            </p>
            <p>
              <HoverLink>#CodeDebugChampions</HoverLink>{" "}
              <HoverLink>#TeamCodingSpirit</HoverLink>{" "}
              <HoverLink>#NewYearReflections</HoverLink>
            </p>
          </LinkedInCard>
          <LinkedInCard
            likes="Amritangshu Dey and 18 others"
            comments="2"
            imgURL="https://media.licdn.com/dms/image/D5622AQEOA2Tz-XQdmg/feedshare-shrink_800/0/1704034177278?e=1710979200&v=beta&t=s_GisOWXa66IK6CakV8FpfU84I65Q0VDiQHFt0cbDeQ"
          >
            <p>🌟 Reflecting on a Year of Achievements and Gratitude 🌟</p>
            <p>
              As the year comes to a close, I can't help but feel immense
              gratitude for the incredible journey we've had. 🙌 Last January
              24th marked a milestone for our team – we were shortlisted for
              Event CHOSS 2023 at the Cambridge Institute of Technology.
            </p>
            <p>
              My teammates Sairaj Todkar, Srijani M and Rimi Jha, your
              unwavering dedication and contributions filled this journey with
              purpose and meaning. Each one of you guys played a vital role in
              securing our spot among the top 50 teams, and for that, I am truly
              grateful. 🚀
            </p>
            <p>
              As we bid farewell to this remarkable year, I want to express my
              heartfelt thanks to my amazing team. Your hard work and commitment
              have not only shaped our success but have created memories that
              will last a lifetime. 🌈
            </p>
            <p>
              Here's to more adventures, growth, and shared successes in the
              coming year! 🥂 Wishing everyone a Happy New Year filled with joy,
              fulfillment, and continued achievements. 🎉
            </p>
            <p>
              <HoverLink>#Gratitude</HoverLink>
              <HoverLink>#TeamSuccess</HoverLink>
              <HoverLink>#NewYearJourney</HoverLink>
            </p>
          </LinkedInCard>
          <LinkedInCard
            likes="Kushal Nm and 4 others"
            comments="1"
            imgURL="https://media.licdn.com/dms/image/D5622AQHCklo6IjK5HQ/feedshare-shrink_800/0/1704036274834?e=1710979200&v=beta&t=Qzu9iddfJaqWVZyRQw-GYp2hJ4E43AESHqLwc14HzIY"
          >
            <p>🌐 Embracing Open Source Success! 🚀</p>
            <p>
              As 2023 comes to a close, I'm fondly looking back on our
              incredible journey in the OSI (Open Source Idea) event. On October
              20th, we had the pleasure of connecting with{" "}
              <HoverLink>Suguru Kawashima</HoverLink> from
              <HoverLink>Findy Inc</HoverLink> and <HoverLink>Aayush</HoverLink>{" "}
              from <HoverLink>Datachecks</HoverLink>, both amazing open-source
              organizations!
            </p>
            <p>
              A big shoutout to my partner in crime and bestfriend,{" "}
              <HoverLink>Sairaj Todkar</HoverLink> – this adventure wouldn't
              have been the same without you. 🌟
            </p>
            <p>
              Exploring the world of open-source with these brilliant minds on
              that October day was nothing short of magical. From idea exchange
              to problem-solving, every moment was a celebration of
              collaboration and innovation. As we step into a new year, I carry
              the lessons and memories of this open-source journey with
              gratitude and excitement. Looking forward to more collaborative
              endeavors and the joy of building something meaningful together in
              the coming year! 🌐💻
            </p>
            <p>
              <HoverLink>#OpenSourceWin</HoverLink>{" "}
              <HoverLink>#CollaborationMagic</HoverLink>{" "}
              <HoverLink>#NewYearReflections</HoverLink>
            </p>
          </LinkedInCard>
          <LinkedInCard
            likes="Kushal Nm and 4 others"
            comments="1"
            imgURL="https://media.licdn.com/dms/image/D5622AQEjOli7LZxRGA/feedshare-shrink_1280/0/1705954947783?e=1710979200&v=beta&t=sRymqW9w9xtzgsdz8YoBLPJ3YkwcVDdTNcSixBmViOs"
          >
            <p>
              Exciting news to share – I had the privilege of joining
              Start-A-Thon, India's innovative Hackathon and SharkTank fusion by
              JITSIE, IITM, alongside the amazing{" "}
              <HoverLink>Srijani M</HoverLink> and{" "}
              <HoverLink>Sairaj Todkar</HoverLink>! 💡💻
            </p>
            <p>
              Though our journey didn't reach its intended destination, the
              experience was truly extraordinary, showcasing our entrepreneurial
              spirit while crafting an MVP for our idea. 🌐🦈
            </p>
            <p>
              A heartfelt shoutout to JITSIE,{" "}
              <HoverLink>Indian Institute of Technology, Madras</HoverLink>, for
              orchestrating this exceptional event. The lessons learned and
              connections made are treasures we deeply appreciate! 🙌🏼🚀
            </p>
            <p>
              Gratitude abounds, and I eagerly anticipate more entrepreneurial
              adventures on the horizon! 💪🏼🌟
            </p>
            <p>
              <HoverLink>#StartAThon</HoverLink>{" "}
              <HoverLink>#Hackathon</HoverLink>{" "}
              <HoverLink>#SharkTank</HoverLink>{" "}
              <HoverLink>#Entrepreneurship</HoverLink>{" "}
              <HoverLink>#JITSIE</HoverLink> <HoverLink>#IITM</HoverLink>{" "}
              <HoverLink>#Teamwork</HoverLink>{" "}
              <HoverLink>#Innovation</HoverLink> <HoverLink>#MVP</HoverLink>{" "}
              <HoverLink>#GratefulJourney</HoverLink>
            </p>
          </LinkedInCard>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <LinkedInCard
            likes="Amritangshu Dey and 11 others"
            comments="1"
            imgURL="https://media.licdn.com/dms/image/D5622AQF5TwNBA4Zwfg/feedshare-shrink_800/0/1704039381111?e=1710979200&v=beta&t=EXxVYab0IhttgdHO_IPYdOWvO9Gwjsa1OV_IZZ7fGbE"
          >
            <p>🚀 Reflecting on RLJIT Idea Presentation Adventure! 🌐</p>
            <p>
              As we navigate through the tapestry of this extraordinary year,
              one event that significantly colored our journey was the RLJIT
              Idea Presentation. Alongside my buddy{" "}
              <HoverLink>Sairaj Todkar</HoverLink> and our incredible partners{" "}
              <HoverLink>Srijani M</HoverLink> and{" "}
              <HoverLink>Rimi Jha</HoverLink>, we unveiled our innovative idea
              rooted in AI and Machine Learning in a spirited competition
              against 50+ talented teams and over 200 participants from across
              Bangalore. 🤖
            </p>
            <p>
              A special shoutout to <HoverLink>Sairaj Todkar</HoverLink>, whose
              shared enthusiasm and collaborative spirit were the driving forces
              behind our success. 🌟
            </p>
            <p>
              Surrounded by brilliant minds and creative solutions, we stood
              tall, presenting our idea with passion and conviction. The
              atmosphere was electric, and the exchange of ideas was nothing
              short of inspiring.
            </p>
            <p>
              As we step into a new chapter, I carry with me the lessons,
              memories, and a deep appreciation for the camaraderie that fueled
              our RLJIT journey. Here's to more innovation, collaboration, and
              shared successes in the events yet to unfold!
            </p>
            <p>
              🚀💡 <HoverLink>#RLJITInnovation</HoverLink>{" "}
              <HoverLink>#AIandML</HoverLink> <HoverLink>#TeamSpirit</HoverLink>
              <HoverLink>#NewYearReflections</HoverLink>
            </p>
          </LinkedInCard>
          <LinkedInCard
            likes="Amritangshu Dey and 11 others"
            comments="1"
            imgURL="https://media.licdn.com/dms/image/D5622AQFvJrts8nx3fQ/feedshare-shrink_800/0/1704035128475?e=1710979200&v=beta&t=PTCYdJqlhyYShBsnEjDI8z2tTINMnM4Em-NMV3JOXSA"
          >
            <p>🏆 Celebrating a Big Win in Coding! 🚀</p>
            <p>
              As we say goodbye to 2023, there's a special moment I can't forget
              – winning FIRST place at the Code to Decode event on February 4th
              in our college-level coding competition!
            </p>
            <p>
              Hats off to my awesome teammates, Srijani M and Yuvraj Singh –
              your coding skills and teamwork pushed us to the top. 🥇 Your hard
              work and love for coding made this victory super sweet.
            </p>
            <p>
              This year was full of ups and downs, but this win stands out. I'm
              grateful for such cool teammates. Here's to the many lines of
              code, late-night problem-solving, and all the teamwork that got us
              here.
            </p>
            <p>
              As we step into a new year, I'm carrying this win with a big smile
              and a thankful heart. Excited for more coding adventures,
              learning, and wins ahead! 🌐💻
            </p>
            <p>
              <HoverLink>#CodeWin</HoverLink>
              <HoverLink>#TeamAwesome</HoverLink>{" "}
              <HoverLink>#NewYearCheers</HoverLink>
            </p>
          </LinkedInCard>
          <LinkedInCard
            likes="Gunawanth Bollu and 12 others"
            comments="1"
            imgURL="https://media.licdn.com/dms/image/D5622AQENq6Qa3kPk-Q/feedshare-shrink_2048_1536/0/1704037875747?e=1710979200&v=beta&t=EsaeUbWcYjwknub7LhFsd9r0ucPn3V7dnOZRsFTFNNw"
          >
            <p>🚀 Celebrating TIFAC Achievements with Gratitude! 🌐</p>
            <p>
              As we bid farewell to 2023, my heart swells with pride when
              recalling the extraordinary journey at the TIFAC event, guided by
              our inspirational Dean, Mr. Anand Kumar. It was on a special day
              that our innovative ideas, "Smart Drone for Ambulance" and "Smart
              Drone for Agriculture," earned a spot among the top 30 teams at
              IISc Bangalore.
            </p>
            <p>
              A heartfelt shoutout to our dedicated team —{" "}
              <HoverLink>Sairaj Todkar</HoverLink>,{" "}
              <HoverLink>Srijani M</HoverLink> and Rimi Jha—whose collaborative
              brilliance and unwavering support enriched our success. 🌟
            </p>
            <p>
              One of the defining moments of this adventure was the privilege of
              meeting the esteemed Ex-Chairman of ISRO, Dr. Kiran Kumar. His
              insights and encouragement added a unique dimension to our
              experience, making TIFAC not just a competition but a
              transformative meeting ground for ideas and pioneers.
            </p>
            <p>
              As we embark on a new year, I carry the lessons, inspiration, and
              gratitude from our TIFAC journey. Here's to more innovation,
              collaboration, and shared dreams, with deep appreciation for the
              wonderful team that included me. 🚀🛰️{" "}
            </p>

            <p>
              <HoverLink>#TIFACJourney</HoverLink>{" "}
              <HoverLink>#InnovationTriumphs</HoverLink>{" "}
              <HoverLink>#Gratitude</HoverLink>{" "}
              <HoverLink>#NewYearReflections</HoverLink>
            </p>
          </LinkedInCard>
          <LinkedInCard
            likes="Amritangshu Dey and 11 others"
            comments="1"
            imgURL="https://media.licdn.com/dms/image/D5622AQHZo8BXZct8RA/feedshare-shrink_2048_1536/0/1704043331731?e=1710979200&v=beta&t=DMlfEQmpqSBV40NBOFxhouhdOxj85E9skXvSzSPU_VE"
          >
            <p>🚀 Illuminating Oxyignit2k23 Idea Presentation Journey! 💡</p>
            <p>
              Reflecting on the remarkable moments of 2023, a standout
              experience was our participation in the Idea Presentation at
              Oxyignit2k23, hosted by Oxford College of Engineering. Alongside
              my fantastic team – <HoverLink>Sairaj Todkar</HoverLink>,{" "}
              <HoverLink>Srijani M</HoverLink>, and Rimi Jha – we joined 60+
              teams from across Karnataka to showcase innovative projects, and
              our idea, "E-Waste Dukaan," emerged as the shining star, securing
              the 2nd position. 🏆
            </p>
            <p>
              My friends <HoverLink>Sairaj Todkar</HoverLink>,{" "}
              <HoverLink>Srijani M</HoverLink>, and Rimi Jha, dedication and
              brilliance were pivotal in achieving this recognition.
            </p>
            <p>
              This experience transcends a mere competition; it's a testament to
              our collective creativity, innovation, and teamwork. As we step
              into a new year, I carry with me the pride of our achievements and
              the excitement for the collaborative endeavors yet to unfold.
              Here's to more ideation, innovation, and shared successes in the
              chapters ahead! 💡🚀
            </p>
            <p>
              <HoverLink>#Oxyignit2k23</HoverLink>{" "}
              <HoverLink>#TeamInnovation</HoverLink>{" "}
              <HoverLink>#NewYearReflections</HoverLink>
            </p>
          </LinkedInCard>
          <LinkedInCard
            likes="Amritangshu Dey and 11 others"
            comments="1"
            imgURL="http://localhost:5173/src/assets/certificates/ey-hackathon.png"
          >
            <p>
              Grateful to have teamed up with{" "}
              <HoverLink>Sairaj Todkar</HoverLink>,{" "}
              <HoverLink>Paurush Kumar</HoverLink>,
              <HoverLink>Srijani M</HoverLink> and Rimi Jha for the EY
              Hackathon. Though we didn't reach the end, your passion,
              creativity, and expertise made the journey worthwhile. Looking
              forward to more collaborations and celebrating victories together.
              Onwards and upwards! 🚀
            </p>
            <p>
              <HoverLink>#TeamSpirit</HoverLink>{" "}
              <HoverLink>#InnovationJourney</HoverLink>{" "}
              <HoverLink>#Gratitude</HoverLink>
            </p>
          </LinkedInCard>
        </div>
        {/* </div> */}
        {/* <div className="flex-[0_0_90%] md:flex-[0_0_40%]"> */}
        {/* </div> */}
        {/* <div className="flex-[0_0_90%] md:flex-[0_0_40%]"> */}
        {/* </div> */}
        {/* <div className="flex-[0_0_90%] md:flex-[0_0_40%]"> */}
        {/* </div> */}
        {/* <div className="flex-[0_0_90%] md:flex-[0_0_40%]"> */}
        {/* </div> */}
        {/* <div className="flex-[0_0_90%] md:flex-[0_0_40%]"> */}
        {/* </div> */}
        {/* </Slider> */}
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
