import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const events = [
  {
    date: "Aug 2013 - June 2017",
    title: "B.Tech – JNTU Kakinada",
    icon: <FaGraduationCap />,
    type: "education",
  },
  {
    date: "June 2017 - July 2019",
    title: "Business Analyst – Algae Bio-Tech",
    icon: <FaBriefcase />,
    type: "career",
  },
  {
    date: "July 2019 - Oct 2021",
    title: "Data Ops Associate – Amazon",
    icon: <FaBriefcase />,
    type: "career",
  },
  {
    date: "Oct 2021 – Dec 2023",
    title: "Business Ops Specialist – Amazon",
    icon: <FaBriefcase />,
    type: "career",
  },
  {
    date: "May 2024 - Aug 2024",
    title: "Intern – UCSF Catalyst Program",
    icon: <FaBriefcase />,
    type: "career",
  },
  {
    date: "Jan 2024 - Dec 2025",
    title: "MSBA – San Francisco State University",
    icon: <FaGraduationCap />,
    type: "education",
  },
  {
    date: "Aug 2024 - May 2025",
    title: "Teaching Assistant – Operations Management",
    icon: <FaBriefcase />,
    type: "career",
  },
  {
    date: "May 15, 2025 – Aug 15, 2025",
    title: "Participant – INFORMS Data Analytics Competition",
    icon: <FaBriefcase />,
    type: "career",
  },
  {
    date: "Aug 2025 – Present",
    title: "Teaching Assistant – Data Mining with Business Applications",
    icon: <FaBriefcase />,
    type: "career",
  },
  {
  date: "Aug 2025 – Present",
  title: "Business Analyst – Graduate Researcher, CGI",
  icon: <FaBriefcase />,
  type: "career",
  },
];

const Timeline = () => {
  return (
    <div className="bg-gradient-to-b from-[#0F0F1A] to-black py-20">
      <h2 className="text-3xl font-semibold text-center text-white mb-14">
        My Education & Career Timeline
      </h2>

      <VerticalTimeline lineColor="#7e22ce">
        {events.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            icon={item.icon}
            iconStyle={{
              background: "#7e22ce",
              color: "#fff",
            }}
            contentStyle={{
              background: "#0F0F1A", // original dark background
              color: "#fff",
              border: "1px solid #7e22ce",
            }}
            contentArrowStyle={{ borderRight: "7px solid #7e22ce" }}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
