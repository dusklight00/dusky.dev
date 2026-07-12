import { useState } from "react";
import { Box, Heading, Text, VStack, HStack, useColorModeValue } from "@chakra-ui/react";

const jobs = [
  {
    title: "Creative Technologist Co-op",
    company: "MullenLowe",
    url: "https://us.mullenlowe.com/",
    range: "July - December 2015",
    location: "Boston, MA",
    bullets: [
      "Developed, maintained, and shipped production code for client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery",
      "Performed quality assurance tests on various sites to ensure cross-browser compatibility and mobile responsiveness",
      "Clients included JetBlue, Lovesac, U.S. Cellular, U.S. Department of Defense, and more",
    ],
    tech: ["HTML", "CSS", "Sass", "JavaScript", "jQuery"],
  },
  {
    title: "Frontend Engineer",
    company: "Apple",
    url: "https://www.apple.com/",
    range: "2016 - 2018",
    location: "Cupertino, CA",
    bullets: [
      "Built polished consumer-facing web experiences with a focus on interaction quality and accessibility",
      "Partnered with design and product teams to ship detail-oriented interface updates",
      "Helped maintain consistency across multiple feature surfaces and internal tooling",
    ],
    tech: ["JavaScript", "UI Motion", "Accessibility", "Design Systems"],
  },
  {
    title: "Design Technologist",
    company: "Scout Studio",
    url: "https://scout.camd.northeastern.edu/",
    range: "2014 - 2015",
    location: "Boston, MA",
    bullets: [
      "Translated concepts into fast prototypes for student-led client projects",
      "Kept iterations moving while preserving responsive behavior and usability basics",
      "Worked across visual design and implementation to close the gap between the two",
    ],
    tech: ["HTML", "CSS", "Prototyping", "Interaction Design"],
  },
  {
    title: "Developer",
    company: "Starry",
    url: "https://starry.com/",
    range: "2013 - 2014",
    location: "Boston, MA",
    bullets: [
      "Helped build consumer-facing web experiences for an early-stage product",
      "Worked closely with the product team to ship quick iterations and refine UI details",
      "Balanced speed with maintainable code and predictable patterns",
    ],
    tech: ["React", "CSS Modules", "Iteration", "Web Apps"],
  },
  {
    title: "Creative Technologist",
    company: "Upstatement",
    url: "https://upstatement.com/",
    range: "2012 - 2013",
    location: "Remote",
    bullets: [
      "Built accessible marketing and product experiences for a variety of client teams",
      "Collaborated with designers to ship responsive interfaces and design-system work",
      "Focused on performance, accessibility, and maintainable component architecture",
    ],
    tech: ["React", "TypeScript", "Accessibility", "Design Systems"],
  },
];

function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const headingColor = useColorModeValue("#1A202C", "#ECEEF3");
  const accentColor = useColorModeValue("#718096", "#ACB2C9");
  const bodyColor = useColorModeValue("#4A5568", "#ACB2C9");
  const mutedColor = useColorModeValue("#718096", "#6e7ba0");
  const chipBg = useColorModeValue("rgba(113, 128, 150, 0.12)", "rgba(172, 178, 201, 0.12)");
  const chipColor = useColorModeValue("#4A5568", "#ACB2C9");

  const activeJob = jobs[activeIndex];
  const tabHeight = 58;

  return (
    <section id="jobs" className="mx-auto h-screen w-full max-w-5xl px-6 py-20 md:px-10 lg:px-0">
      <div className="mb-14 flex items-center gap-4">
        <Text className="font-mono text-grey-color text-xl leading-none self-center">
          02.
        </Text>
        <Heading as="h2" size="2xl" color={headingColor} whiteSpace="nowrap" lineHeight="1.1">
          Where I’ve Worked
        </Heading>
        <Box flex="1" h="1px" bg={accentColor} opacity={0.18} ml={4} alignSelf="center" />
      </div>

      <Box className="grid gap-8 md:grid-cols-[180px_1fr]" alignItems="start">
        <Box position="relative" role="tablist" aria-label="Experience tabs" pt={1}>
          <Box
            position="absolute"
            left="15px"
            top="0"
            bottom="0"
            w="2px"
            bg="rgba(113, 128, 150, 0.18)"
            display={{ base: "none", md: "block" }}
          />
          <Box
            position="absolute"
            left="15px"
            top={`${activeIndex * tabHeight}px`}
            w="2px"
            h={`${tabHeight}px`}
            bg={accentColor}
            display={{ base: "none", md: "block" }}
          />

          <Box
            display={{ base: "flex", md: "block" }}
            alignItems={{ base: "stretch", md: "initial" }}
            gap={{ base: 2, md: 0 }}
            overflowX={{ base: "auto", md: "visible" }}
            pb={{ base: 2, md: 0 }}
            pl={{ base: 0, md: 7 }}
            flexDirection={{ base: "row", md: "column" }}
            sx={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
          >
            {jobs.map((job, index) => {
              const isActive = index === activeIndex;

              return (
                <Box
                  key={job.company}
                  className="link"
                  id={`tab-${index}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${index}`}
                  tabIndex={0}
                  minH={{ base: "44px", md: `${tabHeight}px` }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px={{ base: 3, md: 4 }}
                  whiteSpace="nowrap"
                  borderBottom={{ base: isActive ? `2px solid ${accentColor}` : "2px solid transparent", md: "none" }}
                  fontFamily="mono"
                  fontSize="sm"
                  color={isActive ? accentColor : mutedColor}
                  transition="color 0.2s ease"
                  _hover={{ color: accentColor }}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                >
                  {job.company}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box id={`panel-${activeIndex}`} role="tabpanel" aria-labelledby={`tab-${activeIndex}`} pt={1}>
          <Heading
            as="h3"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="700"
            color={headingColor}
            lineHeight="1.2"
          >
            {activeJob.title} <Text as="span" color={accentColor}>@ {activeJob.company}</Text>
          </Heading>

          <Text fontFamily="mono" fontSize="sm" color={mutedColor} mt={3} mb={6}>
            {activeJob.range}
          </Text>

          <VStack align="stretch" spacing={4}>
            {activeJob.bullets.map((bullet) => (
              <HStack key={bullet} align="start" spacing={3} color={bodyColor}>
                <Text as="span" color={accentColor} fontSize="lg" lineHeight="1.4">
                  ▹
                </Text>
                <Text lineHeight="1.6">{bullet}</Text>
              </HStack>
            ))}
          </VStack>

          <Box display="flex" flexWrap="wrap" gap={2} mt={6}>
            {activeJob.tech.map((item) => (
              <Box
                key={item}
                px={3}
                py={1}
                rounded="full"
                bg={chipBg}
                color={chipColor}
                fontFamily="mono"
                fontSize="xs"
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </section>
  );
}

export default ExperienceSection;
