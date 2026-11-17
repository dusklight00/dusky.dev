import { StickyAside } from "@/components/layout/sticky-aside";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { GithubActivity } from "@/components/sections/github-activity";
import { Community } from "@/components/sections/community";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

/**
 * Page frame: on lg+ a sticky identity column (Hero) sits left of the scrolling
 * content column; below lg everything stacks into one column.
 */
export default function Home() {
  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl px-5 pb-24 pt-24 sm:px-6 sm:pt-28 lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16 xl:gap-20"
    >
      <StickyAside>
        <Hero />
      </StickyAside>
      <div className="mt-16 flex min-w-0 flex-col gap-20 sm:gap-24 lg:mt-0">
        <About />
        <Experience />
        <Projects />
        <Skills />
        {/* Cached ("use cache"), so it is inlined into the static HTML rather than streamed. */}
        <GithubActivity />
        <Community />
        <Achievements />
        <Contact />
      </div>
    </main>
  );
}
