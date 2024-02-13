import Image from "../assets/at-makeathon/1.jpg";

import ATMakeathonCertificate from "../assets/certificates/at-makeathon.jpg";
import ChossCertificate from "../assets/certificates/choss.jpg";
import CodeDebugCertificate from "../assets/certificates/code-to-debug.jpg";
import CySecCertificate from "../assets/certificates/cysec-masterclass.png";
import EyHackathonCertificate from "../assets/certificates/ey-hackathon.png";
import OxyIgniteCodingCertificate from "../assets/certificates/code-debug-competition.jpg";
import OxyIgniteIdeaPresentationCertificate from "../assets/certificates/oxyignite-idea-presentation.jpg";
import RLJITIdeaPresentationCertificate from "../assets/certificates/rljit-idea-presentation.jpg";
import StartAThonCertificate from "../assets/certificates/start-a-thon.jpg";
import TIFACCertificate from "../assets/certificates/tifac.jpg";

function CertificateCard({ image, shortTitle, title, description }) {
  return (
    <div className="border border-[#ffffff15] shadow-xl rounded-3xl bg-background-light-dark-color h-min">
      <div className="px-3 pt-3 rounded-sm">
        <img src={image} className="rounded-2xl" />
      </div>
      <div className="flex">
        <div className="flex-1">
          <div className="px-7 pt-4 text-sm font-mono text-white-dark-color uppercase">
            {shortTitle}
          </div>
          <div className="px-7 font-medium text-lg">{title}</div>
          <div className="px-7 pb-5 text-white-dark-color text-sm">
            {description}
          </div>
        </div>
        <div className="flex items-center justify-center px-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 24 24"
            height="22px"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-external-link hover:text-white-color transition-colors text-white-dark-color"
          >
            <title>External Link</title>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gridAutoRows: "10px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    justifyContent: "center",
    backgroundColor: "black",
  },
};

function CertificateSection() {
  return (
    <div className="flex flex-col gap-20 px-48 pb-36">
      <div className="font-sans text-white-color h-[50px] text-6xl font-black flex-2 pl-16">
        Certificates
      </div>
      <div className="grid grid-cols-3 gap-7">
        <CertificateCard
          image={ATMakeathonCertificate}
          shortTitle="AT Makeathon"
          title="Recieved 2nd Position"
          description="Conducted by IIT Madras as a part of shaastra on 7th January 2024"
        />
        <CertificateCard
          image={ChossCertificate}
          shortTitle="Seedbrain 2.0"
          title="Technology Information, Forcasting and Assessment Council"
          description="Held on 27th and 28th April 2023 At IISc (Indian Institute of Science)"
        />
        <CertificateCard
          image={CodeDebugCertificate}
          shortTitle="Code-To-Debug"
          title="1st Position in Code-To-Debug Competition"
          description="Organised by our college on 4th February 2023"
        />
        <CertificateCard
          image={CySecCertificate}
          shortTitle="CySecK"
          title="Digital Defenders CTF 2023 Masterclass"
          description="Held on 6th June 2023, on Network Analysis and Tools"
        />
        <CertificateCard
          image={EyHackathonCertificate}
          shortTitle="EY Techathon 4.0"
          title="Executive Summary Submission of the EY Techathon 4.0"
          description="Organised by EY(Ernest & young) in collaboration with unstop"
        />
        <CertificateCard
          image={OxyIgniteCodingCertificate}
          shortTitle="OXYIGNITE-2K23"
          title="Top 10 in Code to Debug Competition held during OXYIGNITE-2K23"
          description="Organised by The Oxford college of Engineering on 21nd December 2023"
        />
        <CertificateCard
          image={OxyIgniteIdeaPresentationCertificate}
          shortTitle="OXYIGNITE-2K23"
          title="2nd Position in Project Presentation held during OXYIGNITE-2K23"
          description="Organised by The Oxford college of Engineering on 22nd December 2023"
        />
        <CertificateCard
          image={RLJITIdeaPresentationCertificate}
          shortTitle="RLJIT Idea Presentation"
          title="2nd Position in IEEE Idea Presentation at RLJIT"
          description="Organised by IEEE Student Branch, RLJIT on 9th August 2023"
        />
        <CertificateCard
          image={StartAThonCertificate}
          shortTitle="Start-A-Thon"
          title="India's first-of-its-kind Hackathon and SharkTank Fusion"
          description="Organised by The Unstop during August-September'23"
        />
        <CertificateCard
          image={TIFACCertificate}
          shortTitle="Technology Vision 2047"
          title="Technology Information, Forcasting and Assessment Council"
          description="Held on 27th and 28th April 2023 At IISc (Indian Institute of Science)"
        />
      </div>
    </div>
  );
}

export default CertificateSection;
