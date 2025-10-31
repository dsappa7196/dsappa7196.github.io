// Image Imports
import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.jpg";
import project5 from "../assets/projects/project-5.png";

// Hero Content
export const HERO_CONTENT = `I am a Business Analytics professional with 6.5+ years of experience in operational analytics, process automation, and data storytelling — including impactful work at Amazon. I specialize in SQL, Excel, and Tableau to drive business insights, reduce inefficiencies, and guide decision-making. Currently pursuing a Master’s in Business Analytics at San Francisco State University, I am eager to apply my skills in data modeling, visualization, and optimization to real-world business challenges.`;

// About Section
export const ABOUT_TEXT = [
  "Curious by nature and driven by data, I bring over 6 years of experience transforming business problems into clear, actionable insights. My journey has taken me from building operational automations at Amazon to uncovering growth opportunities through dashboards and predictive models.",
  "Now, as a graduate student in Business Analytics at San Francisco State University, I’m deepening my expertise in machine learning, optimization, and decision science. I thrive at the intersection of analytics and strategy—where the numbers meet nuance.",
  "I’ve led analytics initiatives that cut delivery times, saved thousands of hours through automation, and helped global teams make faster, better decisions. But for me, it’s never just about data—it’s about the stories the data tells and the impact it creates.",
  "Whether I’m building a regression model or crafting a stakeholder report, I’m driven by clarity, creativity, and a desire to simplify the complex. My toolkit includes SQL, Python, Tableau, and Excel VBA—but it’s curiosity and structure that really guide my work.",
  "I’m excited to contribute to data-forward teams that value both rigor and imagination—whether in product strategy, decision intelligence, or business analytics."
];

// Experience Section
export const EXPERIENCES = [
  {
    year: "Jan-2024 – Dec-2025",
    role: "MS in Business Analytics",
    company: "San Francisco State University",
    description:
      "Graduate coursework in Business Intelligence, Machine Learning, Data Warehousing, and Optimization. Focused on building scalable analytics pipelines and actionable dashboards for decision-making.",
    technologies: ["Python", "SQL", "Tableau", "Optimization", "Data Modeling"],
    details: [
      "Built a Tableau dashboard to analyze YouTube metrics like impressions, click-through rates, monetized playbacks, and audience retention — boosted creator revenue strategies by 25%.",
      "Analyzed US health insurance data to uncover cost drivers such as BMI and smoking; built regression models with 92% accuracy and stratified user risk segments.",
      "Developed a 14-table SQL schema for Amazon counterfeit product tracking; reduced resolution times by 30% and improved brand protection workflows.",
      "Created an optimization model in Excel using Solver and VBA macros to minimize delivery times for meal logistics based on weather, traffic, and route constraints.",
      "Designed a SQL database and dashboard for Amazon complaints and investigations; delivered fraud insights on high-risk product categories and reduced SLA violations."
    ]
  },
  {
    year: "Oct-2021 – Dec-2023",
    role: "Business Operations Specialist",
    company: "Amazon",
    description:
      "Led automation and analytics within Amazon’s Transparency Program to streamline brand protection.",
    technologies: ["SQL", "VBA", "AWS", "Excel", "Operational Automation", "Redshift", "Tableau", "Power BI"],
    details: [
      "Authored 60%+ of SOPs for Brand Protection, improving clarity and execution.",
      "Built automated SQL + BI tools to increase seller approval by 25% and reduce AHT by 40%.",
      "Reduced report latency 70% by optimizing Redshift SQL for QBR processes.",
      "Implemented VBA automation to cut ASIN validation manual workload by 40%.",
      "Streamlined Easy Ship workflows, saving 0.07 FTEs and cutting task time from 300 to 120 mins.",
      "Facilitated bi-weekly Kaizen meetings to drive cross-team process improvements."
    ]
  },
  {
    year: "July-2019 – Oct-2021",
    role: "Data Operations Associate",
    company: "Amazon",
    description:
      "Created predictive models to enhance SLA compliance and reduce stow defect variance by 20%. Introduced resource automation tools that saved ~1,800 hours/year. Led robotics pilot (SCOUT) that cut last-mile human intervention by 25%.",
    technologies: ["SQL", "Python", "Forecasting", "AI Planning", "ETL"],
    details: [
      "Enhanced SLA compliance by 15% using predictive models.",
      "Reduced defects 20% and saved 1,800 work hours annually through AI automation.",
      "Reduced manual intervention 40% via VBA tools and improved task turnaround by 25%.",
      "Led a data-mining initiative cutting robotic ops costs by 20%.",
      "Piloted Amazon Robotics SCOUT, cutting human intervention by 25%.",
      "Analyzed 1M+ data points to drive 25% performance uplift via predictive modeling."
    ]
  },
  {
    year: "June-2017 – July-2019",
    role: "Business Analyst",
    company: "Algae Bio-Tech India",
    description:
      "Managed a team of analysts to streamline operations using SQL and Excel. Designed reporting pipelines and mentored junior analysts. Improved data quality and process visibility through operational dashboards.",
    technologies: ["Team Management", "Process Optimization", "SQL", "Python"],
    details: [
      "Extracted insights from 1M+ rows with SQL + Python to cut inefficiencies 20%.",
      "Managed 5 analysts; boosted team productivity by 15%.",
      "Mentored junior analysts and improved data quality and processes by 20%."
    ]
  },
  {
    year: "Aug-2013 – May-2017",
    role: "B.Tech in Electrical & Electronics",
    company: "JNTU Kakinada",
    description:
      "Bachelor’s program with foundational courses in engineering math, programming, economics, and core electrical systems.",
    technologies: ["C Programming", "Linear Algebra", "Control Systems"],
  },
];

// Projects Section (Fixed image imports)
export const PROJECTS = [
  {
    title: "Seoul Bike Demand Prediction",
    image: project1,
    description:
      "Developed a regression model using Gradient Boosting to predict hourly rental demand using weather and calendar data. Achieved 92% R² accuracy. Engineered cyclical features and validated performance with cross-validation, learning curves, and residual analysis.",
    technologies: ["Python", "Scikit-learn", "EDA", "Gradient Boosting", "Feature Engineering"],
    github: "https://github.com/dsappa7196/seoul-bike-demand-prediction"
  },
  {
    title: "Amazon Counterfeit Product Database",
    image: project2,
    description:
      "Designed a 14-table SQL database to support Amazon’s brand protection workflows. Captured complaints, investigations, and enforcement actions in 3NF. Delivered fraud insights like high-risk product rates, resolution times, and investigation efficiency using SQL analytics.",
    technologies: ["SQL", "MySQL", "EER Diagrams", "Schema Design", "Query Optimization"],
    github: "https://github.com/dsappa7196/Amazon-Counterfeit-Product-Management"
  },
  {
    title: "Health Insurance Premium Prediction",
    image: project3,
    description:
      "Analyzed a public health insurance dataset to identify key cost drivers (e.g., smoking, BMI, age). Built models using Linear Regression, Random Forest, and Gradient Boosting. Final GBM model achieved 90% R². Delivered actionable insights to inform risk-based pricing strategy.",
    technologies: ["Python", "Pandas", "Regression", "XGBoost", "Risk Scoring"],
    github: "https://github.com/dsappa7196/US-Health-Insurance-Premium-Prediction"
  },
  {
    title: "YouTube Metrics Dashboard",
    image: project4,
    description:
      "Built an interactive Tableau dashboard that visualized CTR, watch time, ad revenue, and engagement across 200+ videos. Uncovered viewer behavior patterns and upload timing insights, resulting in a 25% improvement in monetization decisions for creators.",
    technologies: ["Tableau", "Data Visualization", "Excel", "KPI Dashboards"],
    github: "https://github.com/dsappa7196/youtube-metrics-dashboard"
  },
  {
    title: "Meal Delivery Optimization",
    image: project5,
    description:
      "Built an Excel Solver-based optimization engine that dynamically assigned couriers to orders based on distance, traffic, and weather. Reduced delivery time by 15% and automated route planning with one-click macros. Modeled real-world constraints using linear programming.",
    technologies: ["Excel Solver", "Linear Programming", "VBA Macros", "Operations Research"],
    github: "https://github.com/dsappa7196/meal-delivery-optimization"
  }
];

export const skillsByGroup = {
  "📊 Analytics & Data Modeling": [
    "SQL", "Data Modeling", "Predictive Analytics", "Regression", "Forecasting",
    "Data Warehousing", "ETL Processes", "Data Profiling", "Data Analysis",
    "Data Normalization", "Redshift", "Snowflake"
  ],
  "📈 Visualization & Reporting Tools": [
    "Tableau", "Power BI", "Looker", "Excel (Advanced Functions, PivotTables, Power Query)",
    "Data Visualization", "Dashboard Development", "Report Automation", "Executive Reporting", "KPI Tracking"
  ],
  "⚙️ Automation & Scripting": [
    "Python", "JavaScript", "HTML", "VBA (Macros)", "Task Automation", "Process Optimization",
    "Workflow Automation", "Data Pipeline Development"
  ],
  "🧠 Business & Strategy": [
    "Business Analysis", "Operational Efficiency", "Strategic Planning", "Process Improvement",
    "Market Research", "Competitive Benchmarking", "Stakeholder Management", "Cross-Functional Collaboration",
    "Agile Methodologies", "Project Coordination", "Data Storytelling"
  ],
  "📁 Documentation & Governance": [
    "SOP Development", "Data Governance", "Data Quality Assurance",
    "Documentation & Reporting Standards", "Compliance Monitoring"
  ]
};

// Certifications
export const CERTIFICATIONS = [
  {
    name: "Graduate Certificate in Decision Sciences",
    link: "https://www.parchment.com/u/award/8b21fd2a28744e07692d6972e3027f82",
  },
  {
    name: "McKinsey Forward Program Certification",
    link: "https://www.credly.com/badges/a0a111e0-9130-4d1f-9035-46bc0fcab55a/public_url",
  },
  {
    name: "HelloPM Product Management Certification",
    link: "https://hellopm.co/certificate/?certificate_id=N6BXTX",
  },
  {
    name: "Generative AI Essentials for Data Science",
    link: "https://www.credly.com/earner/earned/badge/b6c1046b-f7ea-47b2-879b-19e5060a1f76",
  },
  {
    name: "Data Science Orientation",
    link: "https://www.credly.com/earner/earned/badge/9e1b3e3c-2506-4372-9477-2df745ec8588",
  },
  {
    name: "Statistics with Python (Coursera)",
    link: "https://coursera.org/share/d76f9eb992dcec1571b5306fca1fbe35",
  },
  {
    name: "Information Systems Specialization",
    link: "https://coursera.org/share/98cf8924339d15851d1e1b6775485262",
  },
];

// Contact Info
export const CONTACT = {
  address: "San Francisco, CA",
  phoneNo: "+1 (628)208-3271",
  email: "sdnps7196@gmail.com",
};
