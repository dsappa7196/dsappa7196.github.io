import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const timelineItems = [
  {
    date: "Aug 2013 - June 2017",
    title: "B.Tech – JNTU Kakinada",
    type: "education",
  },
  {
    date: "June 2017 - July 2019",
    title: "Business Analyst – Algae Bio-Tech",
    type: "career",
  },
  {
    date: "July 2019 - Oct 2021",
    title: "Data Ops Associate – Amazon",
    type: "career",
  },
  {
    date: "Oct 2021 – Dec 2023",
    title: "Business Ops Specialist – Amazon",
    type: "career",
  },
  {
    date: "Jan 2024 - Dec 2025",
    title: "MSBA – San Francisco State University",
    type: "education",
  },
];

const Timeline = () => {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-semibold text-center text-white mb-14">
        My Education & Career Timeline
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto px-4">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center relative"
          >
            {/* Connecting Line (skip last item) */}
            {index !== timelineItems.length - 1 && (
              <div className="absolute top-6 left-1/2 w-full h-1 bg-purple-600 z-0 sm:block hidden"></div>
            )}

            {/* Icon Circle */}
            <div className="z-10 w-12 h-12 flex items-center justify-center rounded-full bg-purple-700 text-white text-xl mb-4 shadow-md">
              {item.type === "education" ? <FaGraduationCap /> : <FaBriefcase />}
            </div>

            {/* Role Text */}
            <div className="text-white font-medium mb-1 whitespace-normal max-w-[180px]">
              {item.title}
            </div>

            {/* Date */}
            <div className="text-sm text-purple-400 font-semibold">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
