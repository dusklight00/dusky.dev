import Image from "../assets/at-makeathon/1.jpg";

function CertificateCard() {
  return (
    <div className="border border-[#ffffff15] shadow-xl rounded-3xl bg-background-light-dark-color">
      <div className="px-3 pt-3 rounded-sm">
        <img src={Image} className="rounded-2xl" />
      </div>
      <div className="flex">
        <div className="flex-1">
          <div className="px-7 pt-4 font-medium text-md">
            Second place in Makeathon
          </div>
          <div className="px-7 pb-4 font-light text-white-dark-color text-md">
            Second place in Makeathon
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

function CertificateSection() {
  return (
    <div className="h-[100vh] flex flex-col gap-20 px-48">
      <div className="font-sans text-white-color h-[50px] text-6xl font-black flex-2 pl-16">
        Certificates
      </div>
      <div className="grid grid-cols-3 gap-7">
        <CertificateCard />
        <CertificateCard />
        <CertificateCard />
        <CertificateCard />
      </div>
    </div>
  );
}

export default CertificateSection;
