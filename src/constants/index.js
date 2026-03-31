// Image Imports
import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.jpg";
import project5 from "../assets/projects/project-5.png";
import HubView_Image from "../assets/projects/HubView_Image.png";

// ------------------------------------------------------
// HERO CONTENT
// ------------------------------------------------------
export const HERO_CONTENT = "I help organizations turn complex data into actionable business decisions. With 6.5+ years of experience across Amazon and enterprise analytics, I design scalable dashboards, automate reporting pipelines, and build trusted data models using SQL, Python, Power BI, Tableau, and cloud platforms. Currently completing my MS in Business Analytics, I bridge analytics, operations, and strategy to deliver measurable impact.";

// ------------------------------------------------------
// ABOUT SECTION
// ------------------------------------------------------
export const ABOUT_TEXT = [
  "I’m a Business Intelligence Engineer with over 6.5 years of experience across Amazon and data-driven organizations, transforming complex operational data into clear, actionable insights.",

  "I specialize in building SQL data models, Power BI and Tableau dashboards, and automation pipelines that help leadership teams track KPIs, identify risks, and make faster, more informed decisions.",

  "Beyond analytics, I bring a strong delivery mindset — working closely with stakeholders to prioritize high-impact initiatives and ensure data solutions are adopted and trusted by the business.",

  "My technical toolkit spans SQL, Python, Excel (Power Query & VBA), data modeling, forecasting, and visualization — allowing me to effectively bridge business needs with scalable analytics solutions.",

  "With certifications in CSM and CSPO, and PMP in progress, I focus on turning analytics into real operational impact — not just dashboards, but measurable outcomes."
];

// ------------------------------------------------------
// EXPERIENCE SECTION
// ------------------------------------------------------
export const EXPERIENCES = [
  {
    year: "Aug-2025 – Dec-2025",
    role: "Graduate Data Analyst - Agile Jira Analytics & Forecasting",
    company: "CGI — MSBA Capstone (San Francisco, CA)",
    description:
      "Built scalable Jira analytics pipelines, KPI models, and Power BI dashboards to support forecasting, risk detection, and program execution across multiple SAFe teams.",
    technologies: ["Python", "SQL", "Power BI", "Dimensional Modeling", "Jira API", "Agile Analytics"],
    details: [
      "Reduced data preparation effort by 60% by building Python pipelines ingesting ~240K Jira issues across 5–10 SAFe teams.",
      "Improved reporting performance by 35% by defining 15+ standardized KPIs and designing a dimensional Power BI semantic model.",
      "Enabled early risk detection across 20%+ cycle-time variance using dashboards for sprint health, bottlenecks, and throughput.",
      "Reduced sprint planning variance by 30% through automated reporting and what-if capacity scenarios."
    ]
  },
  {
    year: "Jul-2019 – Dec-2023",
    role: "Business Analyst — Brand Protection Analytics",
    company: "Amazon (India)",
    description:
      "Led analytics and automation initiatives supporting Amazon’s Brand Protection organization, improving fraud detection accuracy, SLA performance, and decision-making speed.",
    technologies: ["SQL", "Python", "ETL", "Power BI", "Tableau", "Automation", "AWS", "Excel"],
    details: [
      "Delivered ~$1M in annual cost savings by improving fraud prioritization accuracy (+28%) and SLA compliance (+15%).",
      "Accelerated decision-making by 70% by automating dashboards and reporting pipelines, reducing data latency and manual effort.",
      "Eliminated ~1,200 manual hours annually by implementing automated data validation and reconciliation workflows.",
      "Led 12–15 operations specialists across reporting, workload planning, and stakeholder coordination; received 8 consecutive Spotlight Awards."
    ]
  },
  {
    year: "Jun-2017 – Jul-2019",
    role: "Business Operations Analyst — Data & Process Optimization",
    company: "Algae Bio-Tech India Pvt Ltd",
    description:
      "Improved operational efficiency and reporting by building data models, automating workflows, and enabling data-driven planning decisions.",
    technologies: ["SQL", "Python", "ETL", "Process Optimization", "Team Leadership"],
    details: [
      "Improved operational efficiency by 20% through SQL and Python-based data models.",
      "Reduced reporting cycle time by 35% by leading a 5-member team and standardizing reporting workflows."
    ]
  },
  {
    year: "Jan-2024 – Dec-2025",
    role: "MS in Business Analytics",
    company: "San Francisco State University",
    description:
      "Focused on business intelligence, machine learning, optimization, and analytics strategy.",
    technologies: ["Python", "SQL", "Tableau", "Optimization", "Data Modeling"],
    details: [
      "Built a Tableau dashboard analyzing 200+ videos, improving monetization decisions by 25%.",
      "Developed predictive models achieving 92% accuracy on healthcare datasets.",
      "Designed a 14-table SQL schema for counterfeit investigation analytics.",
      "Built optimization models using Excel Solver and VBA for delivery efficiency."
    ]
  },
  {
    year: "Aug-2013 – May-2017",
    role: "B.Tech in Electrical & Electronics",
    company: "JNTU Kakinada",
    description:
      "Built strong foundations in engineering mathematics, programming, and analytical problem solving.",
    technologies: ["C Programming", "Linear Algebra", "Control Systems"]
  }
];

// ------------------------------------------------------
// PROJECTS SECTION
// ------------------------------------------------------
export const PROJECTS = [
  {
  title: "Operations Analytics Hub",
  image: HubView_Image,
  description: "Built an end-to-end operations analytics system integrating SQL, Power BI, and structured communication layers. Designed to enable executive decision-making through KPI monitoring, risk identification, and actionable insights.",
  technologies: ["SQL", "Power BI", "DAX", "Data Modeling", "Analytics Design"],
  },
  {
    title: "Seoul Bike Demand Prediction",
    image: project1,
    description:
      "Developed a Gradient Boosting model to predict hourly bike demand using weather and temporal features, achieving 92% R² and enabling better resource planning.",
    technologies: ["Python", "Scikit-learn", "EDA", "Gradient Boosting"],
    github: "https://github.com/dsappa7196/seoul-bike-demand-prediction"
  },
  {
    title: "Amazon Counterfeit Product Database",
    image: project2,
    description:
      "Designed a normalized 14-table SQL database to support brand protection workflows, enabling fraud tracking, investigation analytics, and reporting.",
    technologies: ["SQL", "MySQL", "Schema Design"],
    github: "https://github.com/dsappa7196/Amazon-Counterfeit-Product-Management"
  },
  {
    title: "Health Insurance Premium Prediction",
    image: project3,
    description:
      "Built predictive models to identify key cost drivers in health insurance data, achieving 90%+ accuracy for risk-based pricing insights.",
    technologies: ["Python", "Regression", "XGBoost"],
    github: "https://github.com/dsappa7196/US-Health-Insurance-Premium-Prediction"
  },
  {
    title: "YouTube Metrics Dashboard",
    image: project4,
    description:
      "Developed a Tableau dashboard analyzing engagement and monetization KPIs across 200+ videos, improving content strategy decisions by 25%.",
    technologies: ["Tableau", "Data Visualization"],
    github: "https://github.com/dsappa7196/youtube-metrics-dashboard"
  },
  {
    title: "Meal Delivery Optimization",
    image: project5,
    description:
      "Built a linear programming model in Excel to optimize courier allocation, reducing delivery time by 15%.",
    technologies: ["Excel Solver", "VBA", "Optimization"],
    github: "https://github.com/dsappa7196/meal-delivery-optimization"
  }
];

// ------------------------------------------------------
// SKILLS SECTION
// ------------------------------------------------------
export const skillsByGroup = {
  "Business Intelligence & Data Modeling": [
    "SQL",
    "Data Modeling",
    "Dimensional Modeling",
    "KPI Design",
    "Data Warehousing",
    "ETL Pipelines",
    "Data Quality & Validation",
    "Query Optimization",
    "Redshift",
    "Snowflake"
  ],
  "Visualization & Reporting": [
    "Power BI",
    "Tableau",
    "Looker",
    "Dashboard Development",
    "Executive Reporting",
    "Self-Service Analytics",
    "Data Storytelling"
  ],
  "Analytics & Automation": [
    "Python",
    "Excel (Power Query, VBA)",
    "Forecasting",
    "Predictive Analytics",
    "Optimization Modeling",
    "Automation Workflows"
  ],
  "Program & Delivery": [
    "Agile",
    "Stakeholder Management",
    "Requirements Gathering",
    "Process Improvement",
    "KPI Tracking",
    "Cross-Functional Collaboration"
  ]
};

// ------------------------------------------------------
// CERTIFICATIONS
// ------------------------------------------------------
export const CERTIFICATIONS = [
  { name: "Certified ScrumMaster (CSM)", link: "https://bcert.me/sscndgkym" },
  { name: "Certified Scrum Product Owner (CSPO)", link: "https://bcert.me/snnhsakbl" },
  { name: "Graduate Certificate in Decision Sciences", link: "https://www.parchment.com/u/award/8b21fd2a28744e07692d6972e3027f82" },
  { name: "McKinsey Forward Program", link: "https://www.credly.com/badges/a0a111e0-9130-4d1f-9035-46bc0fcab55a/public_url" },
  { name: "Generative AI Essentials", link: "https://www.credly.com/earner/earned/badge/b6c1046b-f7ea-47b2-879b-19e5060a1f76" },
  { name: "Statistics with Python", link: "https://coursera.org/share/d76f9eb992dcec1571b5306fca1fbe35" }
];

// ------------------------------------------------------
// CONTACT
// ------------------------------------------------------
export const CONTACT = {
  address: "San Francisco, CA",
  phoneNo: "+1 (628)208-3271",
  email: "sdnps7196@gmail.com"
};