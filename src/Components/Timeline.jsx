import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const events = [
  {
    date: "Aug 2025 – Dec 2025",
    title: "Data Analyst — CGI (MSBA Capstone)",
    icon: <FaBriefcase />,
    order: 10,
  },
  {
    date: "Aug 2025 – Dec 2025",
    title: "Teaching Assistant — Data Mining — SFSU",
    icon: <FaBriefcase />,
    order: 9,
  },
  {
    date: "May 2025 – Aug 2025",
    title: "INFORMS Data Analytics Competition",
    icon: <FaBriefcase />,
    order: 8,
  },
  {
    date: "Aug 2024 – May 2025",
    title: "Teaching Assistant — Operations — SFSU",
    icon: <FaBriefcase />,
    order: 7,
  },
  {
    date: "May 2024 – Aug 2024",
    title: "Intern — UCSF Catalyst",
    icon: <FaBriefcase />,
    order: 6,
  },
  {
    date: "Jan 2024 – Dec 2025",
    title: "MSBA — San Francisco State University",
    icon: <FaGraduationCap />,
    order: 5,
  },
  {
    date: "Oct 2021 – Dec 2023",
    title: "Business Analyst — Amazon",
    icon: <FaBriefcase />,
    order: 4,
  },
  {
    date: "Jul 2019 – Oct 2021",
    title: "Data Operations Analyst — Amazon",
    icon: <FaBriefcase />,
    order: 3,
  },
  {
    date: "Jun 2017 – Jul 2019",
    title: "Business Operations Analyst — Algae Bio-Tech",
    icon: <FaBriefcase />,
    order: 2,
  },
  {
    date: "Aug 2013 – Jun 2017",
    title: "B.Tech — JNTU Kakinada",
    icon: <FaGraduationCap />,
    order: 1,
  },
];

const Timeline = () => {
  return (
    <div className="bg-transparent py-16 border-t border-neutral-800">
      
      <h2 className="text-2xl font-semibold text-center text-white mb-10">
        Career Journey
      </h2>

      <VerticalTimeline lineColor="#7e22ce">
        {events
          .sort((a, b) => b.order - a.order) // ✅ FIXED ORDER
          .map((item, index) => (
            <VerticalTimelineElement
              key={index}
              date={item.date}
              icon={item.icon}
              iconStyle={{ background: "#7e22ce", color: "#fff" }}
              contentStyle={{
                background: "#0F0F1A",
                color: "#fff",
                border: "1px solid #7e22ce",
                padding: "12px",
              }}
              contentArrowStyle={{ borderRight: "7px solid #7e22ce" }}
            >
              {/* ✅ Slightly bigger (perfect balance) */}
              <h3 className="text-base font-medium">
                {item.title}
              </h3>

              <p className="text-xs text-neutral-400 mt-1">
                {item.date}
              </p>
            </VerticalTimelineElement>
          ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;