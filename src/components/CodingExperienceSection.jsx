import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";

function CodingCard({ platform, description, children, link }) {
  return (
    <Card maxW="sm" className="p-5">
      <VStack>
        <div className="flex w-full items-center px-4 pt-4">
          <div>{children}</div>
          <CardHeader className="flex-1">
            <Heading size="md">{platform}</Heading>
          </CardHeader>
          <div>
            <a href={link} target="_blank">
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
            </a>
          </div>
        </div>
        <CardBody>
          <p className="text-white-dark-color text-justify">{description}</p>
        </CardBody>
      </VStack>
    </Card>
  );
}

function CodingExperienceSection() {
  return (
    <div className="flex flex-col gap-20 p-20 pr-[150px] px-56">
      <div className="font-sans text-white-color h-[50px] text-6xl font-black flex-2 pl-8">
        Coding Experience
      </div>
      <div className="grid grid-cols-3 gap-7">
        <CodingCard
          platform="Leetcode"
          description="LeetCode is a leading online platform for mastering coding and algorithmic problem-solving. Renowned for its effectiveness, it's a go-to resource for job seekers and coding enthusiasts. The platform offers a dynamic space for technical interview preparation and competitive coding, featuring a diverse range of challenges in various languages"
          link="https://leetcode.com/dusklight00/"
        >
          <svg
            height="50px"
            viewBox="0 0 32 32"
            width="50px"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m21.469 23.907-3.595 3.473c-.624.625-1.484.885-2.432.885s-1.807-.26-2.432-.885l-5.776-5.812c-.62-.625-.937-1.537-.937-2.485 0-.952.317-1.812.937-2.432l5.76-5.844c.62-.619 1.5-.859 2.448-.859s1.808.26 2.432.885l3.595 3.473c.687.688 1.823.663 2.536-.052.708-.713.735-1.848.047-2.536l-3.473-3.511c-.901-.891-2.032-1.505-3.261-1.787l3.287-3.333c.688-.687.667-1.823-.047-2.536s-1.849-.735-2.536-.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-.683 5.109-1.989l3.479-3.521c.688-.683.661-1.817-.052-2.531s-1.849-.74-2.531-.052zm6.28-6.558h-13.531c-.932 0-1.692.801-1.692 1.791 0 .991.76 1.797 1.692 1.797h13.531c.933 0 1.693-.807 1.693-1.797 0-.989-.76-1.791-1.693-1.791z" />
          </svg>
        </CodingCard>
        <CodingCard
          platform="Hackerrank"
          description="HackerRank is a technology company that focuses on competitive programming challenges for both consumers and businesses. Developers compete by writing programs according to provided specifications. HackerRank's programming challenges can be solved in a variety of programming languages (including Java, C++, PHP, Python, SQL, and JavaScript)"
          link="https://www.hackerrank.com/profile/Ranon_S"
        >
          <svg
            height="60px"
            width="60px"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 -1 582 486.999"
          >
            <path d="M-1-1h582v402H-1z" fill="none" />
            <path
              d="M454.843 141.001c-13.019-22.417-172.832-115-198.859-115-26.019 0-185.895 92.351-198.84 115-12.947 22.649-13.019 207.358 0 230.009 13.018 22.639 172.839 114.989 198.84 114.989 26 0 185.841-92.466 198.851-114.999 13.007-22.533 13.016-207.583.008-229.999zM309.862 398.15c-3.559 0-36.756-32.137-34.141-34.762.781-.78 5.625-1.328 15.768-1.644 0-23.564.53-61.622.844-77.553.038-1.814-.395-3.081-.395-5.256h-71.812c0 6.379-.412 32.523 1.232 65.479.205 4.078-1.42 5.353-5.158 5.335-9.102-.025-18.211-.099-27.321-.071-3.683.009-5.274-1.374-5.157-5.488.826-30.043 2.66-75.488-.134-191.07v-2.849c-8.688-.314-14.717-.862-15.508-1.652-2.624-2.624 31.032-34.76 34.581-34.76 3.558 0 36.989 32.145 34.383 34.76-.782.781-7.098 1.338-15.067 1.652v2.84c-2.174 23.135-1.823 71.506-2.362 94.686h72.107c0-4.089.351-31.212-1.077-75.145-.091-3.047.853-4.646 3.781-4.672 9.945-.072 19.9-.117 29.855-.055 3.108.019 4.105 1.546 4.043 4.834-3.28 171.861-.594 159.867-.594 188.975 7.97.315 15.112.864 15.895 1.655 2.588 2.615-30.205 34.761-33.763 34.761z"
              fill="#fff"
            />
          </svg>
        </CodingCard>
        <CodingCard
          platform="HackerEarth"
          description="HackerEarth Assessments is an ISO certified coding assessment platform that helps organizations hire developers using automated technical coding tests. The proprietary tech assessment platform vets technical talent through skill-based evaluation and analytics.A proctored assessment ensures that candidates taking a test do not cheat"
          link="https://www.hackerearth.com/@r.rahul.developer"
        >
          <svg
            fill="#fff"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>HackerEarth icon</title>
            <path d="M20.983.002H9.508v6.494h.11a3.629 3.629 0 0 1 3.557-1.332l-.023-.004c1.966.144 3.91 1.336 4.02 5.158v7.554a.299.299 0 0 1-.287.287h-2.11a.287.287 0 0 1-.287-.287V10.55c0-1.778-.585-3.114-2.341-3.114h-.038a2.606 2.606 0 0 0-2.6 2.78v-.008 7.665a.287.287 0 0 1-.287.287H7.124a.287.287 0 0 1-.287-.287V.004H3.193L3.126.003c-.823 0-1.493.652-1.523 1.468V22.458c.03.857.73 1.541 1.59 1.546h17.792a1.458 1.458 0 0 0 1.413-1.55v.004V1.474A1.38 1.38 0 0 0 21.021.005l-.038.001h.002zm-2.54 20.983H5.555V19.66h12.888z" />
          </svg>
        </CodingCard>
        <CodingCard
          platform="Coding Ninja"
          description="Code Ninjas is a for-profit educational organization specializing in
                    teaching coding to kids, and is the largest kids coding franchise in
                    the world with over 400 locations open and operating in three
                    countries.It does so much more than just teach your child to code-it
                    helps develop key skills such as problem-solving, critical thinking,
                    and logical reasoning skills"
          link="https://profile.codingninjas.com/a1ab93b6-89e2-4a25-97bc-b7c1289380ac"
        >
          <svg
            fill="#fff"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.198 0c-.499.264-1.209.675-1.79.984a542.82 542.82 0 0 0 0 6.242c.995-.526 1.761-.834 1.79-2.066V0zM8.743.181C7.298.144 5.613.65 4.47 1.414c-1.17.8-1.987 1.869-2.572 3.179A16.787 16.787 0 0 0 .9 8.87c-.15 1.483-.128 3.079.025 4.677.27 1.855.601 3.724 1.616 5.456 1.57 2.62 4.313 4.109 7.262 4.19 3.41.246 7.233.53 11.411.807.022-2.005.01-5.418 0-6.25-3.206-.21-7.398-.524-11.047-.782-.443-.043-.896-.056-1.324-.172-1.086-.295-1.806-.802-2.374-1.757-.643-1.107-.875-2.832-.797-4.294.11-1.27.287-2.41 1.244-3.44.669-.56 1.307-.758 2.161-.84 5.17.345 7.609.53 12.137.858.032-1.133.01-3.46 0-6.229C16.561.752 12.776.474 8.743.181zm-.281 9.7c.174.675.338 1.305.729 1.903.537.832 1.375 1.127 2.388.877.76-.196 1.581-.645 2.35-1.282zm12.974 1.04-5.447.689c.799.739 1.552 1.368 2.548 1.703.988.319 1.78.01 2.308-.777.209-.329.56-1.148.591-1.614zm.842 6.461c-.388.01-.665.198-.87.355.002 1.798 0 4.127 0 6.223.586-.297 1.135-.644 1.793-.998-.005-1.454.002-3.137-.005-4.707a.904.904 0 0 0-.917-.873z" />
          </svg>
        </CodingCard>
        <CodingCard
          platform="GeeksForGeeks"
          description="GeeksforGeeks is a leading platform that provides computer science resources and coding challenges for programmers and technology enthusiasts, along with interview and exam preparations for upcoming aspirants. With a strong emphasis on enhancing coding skills and knowledge, it has become a trusted destination for over 12 million plus"
        >
          <svg
            fill="#000000"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            role="img"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z" />
          </svg>
        </CodingCard>
        <CodingCard
          platform="Github"
          description="It lets developers collaborate on a project more effectively by providing tools for managing possibly conflicting changes from multiple developers. GitHub allows developers to change, adapt and improve software from its public repositories for free, but it charges for private repositories, offering various paid plans"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="55px"
            width="55px"
            className="p-2"
            whileHover={{ stroke: "#fff" }}
          >
            <title>GitHub</title>
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </CodingCard>
      </div>
    </div>
  );
}

export default CodingExperienceSection;
