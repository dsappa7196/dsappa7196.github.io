// Image Imports
import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.jpg";
import project5 from "../assets/projects/project-5.png";

// ------------------------------------------------------
// HERO CONTENT
// ------------------------------------------------------
export const HERO_CONTENT = `I am a Business Intelligence Engineer with 6.5+ years of experience building analytics systems, dashboards, and automation solutions that drive operational decision-making — including impactful work at Amazon. I specialize in SQL, Power BI, Python, and Excel to create scalable reporting pipelines, improve KPI visibility, and reduce manual effort. Currently pursuing a Master’s in Business Analytics at San Francisco State University, I bring a strong delivery mindset supported by CSM, CSPO, and PMP (in progress).`;

// ------------------------------------------------------
// ABOUT SECTION
// ------------------------------------------------------
export const ABOUT_TEXT = [
  "I’m a Business Intelligence Engineer with over 6.5 years of experience across Amazon and data-driven organizations, transforming complex operational data into clear, actionable insights.",
  "I specialize in building SQL data models, Power BI and Tableau dashboards, and automation pipelines that help leadership teams track KPIs, identify risks, and make faster, better decisions.",
  "Beyond analytics, I bring a strong delivery mindset — collaborating with stakeholders, prioritizing high-impact work, and ensuring data solutions are adopted and trusted by the business.",
  "My technical toolkit spans SQL, Python, Excel (Power Query & VBA), data modeling, forecasting, and visualization, allowing me to bridge business needs with scalable analytics solutions.",
  "With CSM, CSPO, and PMP (in progress), I focus on turning analytics into real operational impact — not just dashboards, but measurable business outcomes."
];

// Experience Section
export const EXPERIENCES = [
  {
    year: "Aug-2025 – Dec-2025",
    role: "Graduate Data Analyst - Agile Jira Analytics & Forecasting",
    company: "CGI — MSBA Capstone (San Francisco, CA)",
    description:
      "Delivered enterprise-grade agile analytics solutions by building scalable Jira data pipelines, KPI models, and Power BI dashboards supporting forecasting, risk detection, and program execution across multiple SAFe teams.",
    technologies: ["Python", "SQL", "Power BI", "Dimensional Modeling", "Jira API", "Agile Analytics"],
    details: [
      "Reduced data preparation effort by 60% by building scalable Python pipelines ingesting ~240K Jira issues across 5–10 SAFe teams, establishing reusable analytics datasets and AI-ready pipelines.",
      "Improved reporting performance by 35% and reuse by 40% by defining 15+ standardized delivery KPIs and modeling curated Jira data into a dimensional Power BI semantic layer.",
      "Enabled early risk detection across 20%+ cycle-time variance by developing dashboards for sprint health, bottlenecks, release readiness, and workflow throughput used by cross-functional leaders.",
      "Reduced sprint planning variance by 30% by automating reporting and what‑if capacity scenarios, improving forecast accuracy across 3+ program increments."
    ]
  },
  {
    year: "Jul-2019 – Dec-2023",
    role: "Business Analyst — Brand Protection Analytics",
    company: "Amazon (India)",
    description:
      "Owned analytics and automation initiatives supporting Amazon’s Brand Protection organization, improving fraud detection accuracy, SLA performance, and leadership decision velocity.",
    technologies: ["SQL", "Python", "ETL", "Power BI", "Tableau", "Automation", "AWS", "Excel"],
    details: [
      "Protected ~$1M in annual cost savings by improving fraud‑signal prioritization accuracy (+28%) and SLA compliance (+15%) through SQL and Python‑driven analytics pipelines.",
      "Accelerated leadership decision-making by 70% by automating BI dashboards and reporting pipelines, significantly reducing data latency and manual effort.",
      "Eliminated ~1,200 manual hours per year by implementing automated data validation and reconciliation workflows, improving reporting accuracy and consistency.",
      "Led and coordinated 12–15 business operations specialists across workload planning, reporting cadence, training, and vendor coordination; recognized with 8 consecutive quarterly Spotlight Awards."
    ]
  },
  {
    year: "Jun-2017 – Jul-2019",
    role: "Business Operations Analyst — Data & Process Optimization",
    company: "Algae Bio-Tech India Pvt Ltd",
    description:
      "Led analytics initiatives to improve operational efficiency, automate reporting pipelines, and enable data-driven production and inventory planning.",
    technologies: ["SQL", "Python", "ETL", "Process Optimization", "Team Leadership"],
    details: [
      "Improved operational efficiency by 20% through SQL and Python-driven data models and ETL workflows supporting production and inventory planning decisions.",
      "Reduced reporting cycle time by 35% by leading a 5-member analytics team and implementing standardized automated reporting processes."
    ]
  },
  {
    year: "Jan-2024 – Dec-2025",
    role: "MS in Business Analytics",
    company: "San Francisco State University",
    description:
      "Graduate coursework focused on business intelligence, machine learning, optimization, data engineering, and analytics strategy.",
    technologies: ["Python", "SQL", "Tableau", "Optimization", "Data Modeling"],
    details: [
      "Built a Tableau dashboard analyzing YouTube metrics across 200+ videos, improving monetization strategy decisions by 25%.",
      "Developed regression and predictive models achieving 92% accuracy on healthcare cost datasets.",
      "Designed a 14-table SQL schema supporting Amazon counterfeit investigations and KPI reporting.",
      "Built optimization models in Excel using Solver and VBA to minimize delivery times under real-world constraints."
    ]
  },
  {
    year: "Aug-2013 – May-2017",
    role: "B.Tech in Electrical & Electronics",
    company: "JNTU Kakinada",
    description:
      "Bachelor’s degree with strong foundations in engineering mathematics, programming, systems analysis, and quantitative problem solving.",
    technologies: ["C Programming", "Linear Algebra", "Control Systems"]
  }
];

// ------------------------------------------------------
// PROJECTS SECTION
// ------------------------------------------------------
export const PROJECTS = [
  {
    title: "Seoul Bike Demand Prediction",
    image: project1,
    description:
      "Built a Gradient Boosting regression model to predict hourly bike rental demand using weather and calendar features. Achieved 92% R² accuracy with feature engineering, cross-validation, and residual analysis.",
    technologies: ["Python", "Scikit-learn", "EDA", "Gradient Boosting", "Feature Engineering"],
    github: "https://github.com/dsappa7196/seoul-bike-demand-prediction"
  },
  {
    title: "Amazon Counterfeit Product Database",
    image: project2,
    description:
      "Designed a normalized 14-table SQL database supporting brand protection workflows. Enabled fraud insights, resolution tracking, and investigation analytics.",
    technologies: ["SQL", "MySQL", "Schema Design", "Query Optimization"],
    github: "https://github.com/dsappa7196/Amazon-Counterfeit-Product-Management"
  },
  {
    title: "Health Insurance Premium Prediction",
    image: project3,
    description:
      "Analyzed health insurance data to identify cost drivers and built predictive models achieving 90%+ accuracy to support risk-based pricing strategies.",
    technologies: ["Python", "Regression", "XGBoost", "Risk Modeling"],
    github: "https://github.com/dsappa7196/US-Health-Insurance-Premium-Prediction"
  },
  {
    title: "YouTube Metrics Dashboard",
    image: project4,
    description:
      "Built an interactive Tableau dashboard tracking engagement and monetization KPIs across 200+ videos, improving content strategy decisions by 25%.",
    technologies: ["Tableau", "Data Visualization", "KPI Dashboards"],
    github: "https://github.com/dsappa7196/youtube-metrics-dashboard"
  },
  {
    title: "Meal Delivery Optimization",
    image: project5,
    description:
      "Built an Excel-based optimization model using linear programming to dynamically assign couriers, reducing delivery time by 15%.",
    technologies: ["Excel Solver", "Linear Programming", "VBA", "Operations Research"],
    github: "https://github.com/dsappa7196/meal-delivery-optimization"
  }
];

// ------------------------------------------------------
// SKILLS SECTION (REBUILT FOR BI ENGINEER POSITIONING)
// ------------------------------------------------------
export const skillsByGroup = {
  "📊 Business Intelligence & Data Modeling": [
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
  "📈 Visualization & Reporting": [
    "Power BI",
    "Tableau",
    "Looker",
    "Dashboard Development",
    "Executive Reporting",
    "Self-Service Analytics",
    "Data Storytelling",
    "Visualization Best Practices"
  ],
  "⚙️ Analytics & Automation": [
    "Python",
    "Excel (Power Query, VBA)",
    "Forecasting",
    "Predictive Analytics",
    "Optimization Modeling",
    "Automation Workflows",
    "Data Pipeline Development"
  ],
  "🧭 Program & Delivery": [
    "Agile Methodologies",
    "Stakeholder Management",
    "Requirements Gathering",
    "Process Improvement",
    "KPI Tracking",
    "Cross-Functional Collaboration",
    "Documentation & SOP Development"
  ]
};

// ------------------------------------------------------
// CERTIFICATIONS
// ------------------------------------------------------
export const CERTIFICATIONS = [
  {
    name: "Certified ScrumMaster (CSM)",
    link: "https://bcert.me/sscndgkym"
  },
  {
    name: "Certified Scrum Product Owner (CSPO)",
    link: "https://bcert.me/snnhsakbl"
  },
  {
    name: "Graduate Certificate in Decision Sciences",
    link: "https://www.parchment.com/u/award/8b21fd2a28744e07692d6972e3027f82"
  },
  {
    name: "McKinsey Forward Program Certification",
    link: "https://www.credly.com/badges/a0a111e0-9130-4d1f-9035-46bc0fcab55a/public_url"
  },
  {
    name: "Generative AI Essentials for Data Science",
    link: "https://www.credly.com/earner/earned/badge/b6c1046b-f7ea-47b2-879b-19e5060a1f76"
  },
  {
    name: "Data Science Orientation",
    link: "https://www.credly.com/earner/earned/badge/9e1b3e3c-2506-4372-9477-2df745ec8588"
  },
  {
    name: "Statistics with Python (Coursera)",
    link: "https://coursera.org/share/d76f9eb992dcec1571b5306fca1fbe35"
  },
  {
    name: "Information Systems Specialization",
    link: "https://coursera.org/share/98cf8924339d15851d1e1b6775485262"
  }
];

// ------------------------------------------------------
// CONTACT INFO
// ------------------------------------------------------
export const CONTACT = {
  address: "San Francisco, CA",
  phoneNo: "+1 (628)208-3271",
  email: "sdnps7196@gmail.com"
};
