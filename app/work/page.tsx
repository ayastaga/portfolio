import { BentoGrid1 } from "@/components/pro-blocks/landing-page/bento-grids/bento-grid-1";

export default function WorkComponent() {
  return (
    <div className="w-full">
      <div className="text-center justify-center mt-10 text-9xl font-instrumentserif">
        Work & Projects
      </div>
      <div className="grid border grid-cols-2 mt-15 flex font-ppmontreal justify-center items-center">
        <div className="text-3xl grid-cols-1  text-center">Work Experience</div>
        <div className="border-l p-3 pl-5 flex flex-col grid-cols-1 gap-2 lg:gap-[2px] ">
          <div className="flex gap-2 ">
            <h4 className="w-26 min-w-26">2025</h4>
            <div className="flex flex-col lg:flex-row gap-0.5">
              <div className="w-56 min-w-56">
                <a
                  href="https://sylphiaconsulting.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sylphia Consulting Inc.
                </a>
              </div>
              <p className="">Software Engineering Intern</p>
            </div>
          </div>
          <div className="flex gap-2">
            <h4 className="w-26 min-w-26">2024</h4>
            <div className="flex flex-col lg:flex-row gap-0.5">
              <div className="w-56 min-w-56">
                <a
                  href="https://www.steelcitycodes.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Steel City Codes Ontario
                </a>
              </div>
              <p className="">Founder</p>
            </div>
          </div>
        </div>
      </div>
      <BentoGrid1 />
    </div>
  );
}
