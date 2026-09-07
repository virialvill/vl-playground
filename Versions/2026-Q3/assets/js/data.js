/* ==========================================================================
   Datos de ejemplo — reproducen el contenido mostrado en el archivo de Figma.
   Todo es estático: no hay backend detrás de este prototipo.
   ========================================================================== */

window.VLTData = (function () {
  "use strict";

  const currentUser = {
    name: "Pauline Lenoir",
    initials: "PL",
    role: "Agent",
    account: "Phoenix Account Name",
    email: "phoenix@virtuallatinos.com",
  };

  const dealStages = [
    "Hiring Survey",
    "Quick Call",
    "Client Interview",
    "Contracts Sent",
    "Contracts Signed",
    "Details and Payment",
    "Job Posted",
    "Close Old Deal",
    "Lost",
  ];

  const primaryRoles = [
    "Software Engineer",
    "Graphic Designer",
    "Data Scientist",
    "Product Manager",
    "Customer Service",
    "HR Manager",
    "Executive Assistant",
  ];

  const dealOwners = [
    "No Owner",
    "Laura González",
    "Martin Vega",
    "Paula Castillo",
    "Juan Pérez",
  ];

  /* --- Deals -------------------------------------------------------------- */
  const deals = [
    { id: "35395634262", name: "Administrative Assistant",          stage: "Lost",               delivery: "2025-04-28", role: "Software Engineer", owner: "Laura González", published: false, jobPosted: true  },
    { id: "67238475692", name: "O'connor Law-Legaal Assistant",      stage: "Contracts Sent",     delivery: "2025-04-26", role: "Graphic Designer",  owner: "No Owner",        published: true,  jobPosted: true  },
    { id: "94571238465", name: "Black & Associates - Sales",         stage: "Contracts Sent",     delivery: "2025-04-23", role: "Data Scientist",    owner: "No Owner",        published: true,  jobPosted: false },
    { id: "58392367481", name: "Gian - Grasso",                      stage: "Quick Call",         delivery: "2025-04-18", role: "Product Manager",   owner: "Martin Vega",     published: false, jobPosted: false },
    { id: "76294581342", name: "Black & Associates - Sales",         stage: "Quick Call",         delivery: "2025-04-16", role: "Customer Service",  owner: "Paula Castillo",  published: true,  jobPosted: true  },
    { id: "98127365408", name: "Abacus Analytics",                   stage: "Hiring Survey",      delivery: "2025-04-14", role: "HR Manager",        owner: "No Owner",        published: false, jobPosted: false },
    { id: "94571238466", name: "Black & Associates - Sales",         stage: "Job Posted",         delivery: "2025-04-07", role: "Data Scientist",    owner: "No Owner",        published: true,  jobPosted: true  },
    { id: "98127365409", name: "Abacus Analytics",                   stage: "Lost",               delivery: "2025-04-01", role: "HR Manager",        owner: "No Owner",        published: true,  jobPosted: true  },
    { id: "12345678901", name: "Skyline Innovations - Sales Deal",   stage: "Lost",               delivery: "2025-03-28", role: "Graphic Designer",  owner: "No Owner",        published: false, jobPosted: false },
    { id: "23456789012", name: "Pinnacle Solutions - Sales Agreement", stage: "Close Old Deal",   delivery: "2025-03-24", role: "Software Engineer", owner: "No Owner",        published: false, jobPosted: true  },
    { id: "34567890123", name: "Nexus Group - Executive Support",    stage: "Client Interview",   delivery: "2025-03-20", role: "Executive Assistant", owner: "Juan Pérez",    published: true,  jobPosted: true  },
    { id: "45678901234", name: "Harbor Legal - Paralegal",           stage: "Details and Payment", delivery: "2025-03-17", role: "Customer Service", owner: "Laura González",  published: true,  jobPosted: false },
    { id: "56789012345", name: "Vertex Media - Content Team",        stage: "Contracts Signed",   delivery: "2025-03-12", role: "Graphic Designer",  owner: "Martin Vega",     published: false, jobPosted: false },
    { id: "67890123456", name: "Cobalt Health - Front Desk",         stage: "Hiring Survey",      delivery: "2025-03-08", role: "Customer Service",  owner: "No Owner",        published: true,  jobPosted: true  },
    { id: "78901234567", name: "Lumen Studios - Motion Designer",    stage: "Quick Call",         delivery: "2025-03-03", role: "Graphic Designer",  owner: "Paula Castillo",  published: false, jobPosted: false },
    { id: "89012345678", name: "Atlas Freight - Dispatch Support",   stage: "Job Posted",         delivery: "2025-02-27", role: "Customer Service",  owner: "Juan Pérez",      published: true,  jobPosted: true  },
    { id: "90123456789", name: "Orion Capital - Data Analyst",       stage: "Client Interview",   delivery: "2025-02-21", role: "Data Scientist",    owner: "No Owner",        published: true,  jobPosted: false },
  ];

  /* --- Detalle del deal principal ---------------------------------------- */
  const dealDetail = {
    id: "35395634262",
    name: "Administrative Assistant",
    applicationType: "Assessment Based Application",
    forms: [
      { label: "Hiring Survey Form", href: "#" },
      { label: "Hiring Deposit Form", href: "#" },
      { label: "Job Post Link", href: "#" },
    ],
    information: [
      { label: "Deal Name", value: "Administrative Assistant" },
      { label: "Deal ID", value: "35395634262" },
      { label: "VA Tier", value: "Professional (3-5 years of experience)" },
      { label: "Stage", value: "Lost" },
      { label: "Deal Owner", value: "Not Provided" },
      { label: "Number Of Openings", value: "2" },
      { label: "Hours Per Week", value: "50" },
      { label: "Primary Role", value: "Product Manager" },
      { label: "Secondary Role", value: "SaaS & Technology" },
      { label: "Job Opening Industry", value: "Project Manager" },
      { label: "Skills", value: ["Project Manager", "Account Manager", "Graphic Designer", "Recruiter"] },
    ],
    timeline: [
      { label: "VA Proposal Due", value: "2025-05-01" },
      { label: "Delivery Due", value: "2025-06-01" },
      { label: "Client Range", value: "Part-Time: $10 - $14 / hr" },
      { label: "VA Range", value: "Part-Time: $6 - $10 / hr" },
    ],
    client: [
      { label: "Full Name", value: "Jessica Wilson" },
      { label: "Email Address", value: "Jessica.wilson@ejemplo.com" },
      { label: "Phone Number", value: "+57 312 345 6789" },
      { label: "New Client?", value: "Yes" },
      { label: "CS Pod", value: "No Defined" },
      { label: "SAM", value: "Luis Carlos Vanegas" },
    ],
    team: [
      { label: "Manager", value: "Juan Pérez" },
      { label: "Specialist 1", value: "Ana González" },
      { label: "Agent 1", value: "Carlos Rodríguez" },
      { label: "Agent 2", value: "María López" },
      { label: "Consultant", value: "No Defined" },
      { label: "Specialist 2", value: "No Defined" },
      { label: "Associates", value: "ECO" },
      { label: "POD", value: "ECO" },
    ],
  };

  /* --- Aplicaciones a un job post ---------------------------------------- */
  const applications = Array.from({ length: 13 }, (_, i) => {
    const names = [
      "Pauline Lenoir", "Carlos David Torres Alvarado", "Diego Alejandro Morales Cruz",
      "Sofia Elena Ramirez Garcia", "Mariana Ochoa Vidal", "Andrés Felipe Castaño",
      "Luisa Fernanda Peña", "Julián Restrepo Mora", "Valentina Sáenz Ruiz",
      "Ricardo Nieto Salas", "Camila Herrera Bravo", "Esteban Quiroz Lara",
      "Natalia Bermúdez Cano",
    ];
    const scores = [75, 87, 62, 91, 78, 55, 83, 69, 94, 71, 66, 88, 80];
    const statuses = ["Completed", "Completed", "In Progress", "Completed", "Completed",
      "Not Started", "Completed", "In Progress", "Completed", "Completed",
      "Not Started", "Completed", "Completed"];
    return {
      id: "va-" + (i + 1),
      name: names[i],
      email: names[i].split(" ")[0].toLowerCase() + "@virtuallatinos.com",
      submitted: "11-24-2025 - 8:55, PST",
      modified: "11-24-2025 - 8:55, PST",
      assessment: "Customer Support - Entry Level",
      score: scores[i],
      status: statuses[i],
    };
  });

  /* --- Perfil del candidato ---------------------------------------------- */
  const candidate = {
    name: "Pauline Lenoir",
    type: "Assessment Based",
    relatedRecords: [
      { label: "VA Hubspot Contact", href: "#" },
      { label: "Hubspot Deal", href: "#" },
      { label: "Job Post Application Table", href: "#" },
    ],
    process: [
      { label: "VA Total Years Experience", value: "8" },
      { label: "VA Rate Sent", value: "9" },
      { label: "EF Set Score", value: "75" },
      { label: "Most Recent Interview", value: "04/10/2025 05:56 PM" },
      { label: "Submission Date", value: "04/01/2025" },
    ],
    jobApplication: [
      { q: "What is your current country of residence?", a: "Colombia" },
      { q: "What is the soonest date you'd be able to start?", a: "09/02/2026" },
      { q: "Need to provide a resignation notice", a: "Yes" },
      { q: "Are you available to work the specific required hours for this role within the specified time zone?", a: "Yes" },
      { q: "Desired Rate per hour", a: "$12" },
      { q: "Are you currently studying?", a: "No" },
      { q: "Are you currently working with a VL client?", a: "Yes" },
      { q: "Are you currently applying to jobs outside VL?", a: "No" },
      { q: "Are you planning to take an extended time off for travel?", a: "Yes" },
      { q: "When will you take the time off?", a: "11/23/2026" },
      { q: "Have you ever worked remotely before?", a: "Yes" },
      { q: "How much Remote Work Experience do you have?", a: "1 - 6 months" },
    ],
    contact: [
      { icon: "mail",     label: "paco.hernandez@correo.com" },
      { icon: "phone",    label: "55-334-2349" },
      { icon: "at",       label: "@PacoHernan" },
      { icon: "pin",      label: "Honduras" },
      { icon: "linkedin", label: "Linkedin", href: "#" },
      { icon: "external", label: "CV Link", href: "#" },
      { icon: "external", label: "Job Post Link", href: "#" },
      { icon: "external", label: "No Academy Courses", href: "#" },
    ],
    professionalStatus: [
      { label: "Stage Current Job:", badge: { text: "Associated", tone: "success" } },
      { label: "Status Another Job:", badge: { text: "Active Proposal", tone: "info" } },
      { label: "Rate per Hour:", value: "$6 to $20" },
      { label: "Available Hours per Week:", value: "Full-Time" },
    ],
    coverLetter: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
      "Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum.",
      "Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia.",
    ],
    industries: [
      "B2B Retail & Wholesale & Services • Mid Level",
      "Construction • Expert Level",
      "Consulting & Coaching • Entry Level",
      "B2C Retail & Wholesale & Services • Mid Level",
      "Design & Creative Services • Entry Level",
    ],
    interestedRoles: ["Account Assistant", "Copywriter", "Project Manager", "Receptionist"],
    roles: [
      { name: "Account Management", years: "4 years" },
      { name: "Account Reconciliation", years: "10 years" },
      { name: "Appointment Setting", years: "3 years" },
      { name: "Payment collection and PCI Compliance", years: "4 years" },
      { name: "Calendar Management", years: "8 years" },
    ],
    skills: ["Account Management", "Account Reconciliation", "Appointment Setting",
      "Calendar Management", "Client Support Calls", "Leadership"],
    softwareSkills: ["Automated Billing Systems", "Calendar Software (Any)", "CRM (Any)",
      "Docs", "Google Calendar", "Invoicing Software (Any)", "Microsoft365"],
  };

  /* --- Assessments del candidato ----------------------------------------- */
  const assessments = [
    { title: "Assessment of Financial Transactions",        tier: "—",            score: 85, status: "Passed" },
    { title: "Evaluation of Customer Data Integrity",       tier: "Advanced",     score: 90, status: "Failed" },
    { title: "Analysis of Sales Performance Metrics",       tier: "Advanced",     score: 75, status: "Passed" },
    { title: "Review of Inventory Management Practices",    tier: "Starter",      score: 80, status: "Failed" },
    { title: "Audit of Operational Efficiency",             tier: "Professional", score: 65, status: "Passed" },
    { title: "Assessment of Risk Management Strategies",    tier: "Starter",      score: 95, status: "Failed" },
    { title: "Evaluation of Marketing Campaign Effectiveness", tier: "Advanced",  score: 70, status: "Passed" },
    { title: "Analysis of User Engagement Trends",          tier: "Professional", score: 88, status: "Failed" },
    { title: "Review of Compliance and Regulatory Standards", tier: "Starter",    score: 77, status: "Passed" },
    { title: "Assessment of IT Infrastructure Security",    tier: "Professional", score: 93, status: "Failed" },
  ];

  /* --- Otros jobs del candidato ------------------------------------------ */
  const otherJobs = [
    { title: "Sales Assistant/Lead Generation Specialist", stage: "Quick Call",
      tags: [{ text: "ECO", tone: "primary" }, { text: "Interview", tone: "primary" }, { text: "Assessment Based", tone: "info" }],
      role: "Executive Assistant", delivery: "April 01, 2025", rate: "$13 - $17 /hr",
      hours: "25 hrs/week", agent: "Alexia López", sam: "Not Defined", company: "Tech Innovators Inc." },
    { title: "Sales Assistant/Lead Generation Specialist", stage: "Quick Call",
      tags: [{ text: "BAY", tone: "primary" }, { text: "Interview", tone: "primary" }, { text: "Assessment Based", tone: "info" }],
      role: "Executive Assistant", delivery: "April 01, 2025", rate: "$13 - $17 /hr",
      hours: "25 hrs/week", agent: "Alexia López", sam: "Not Defined", company: "Tech Innovators Inc." },
    { title: "Sales Assistant/Lead Generation Specialist", stage: "Quick Call",
      tags: [{ text: "ARC", tone: "primary" }, { text: "Top Candidate", tone: "primary" }, { text: "Proposal Based", tone: "info" }],
      role: "Executive Assistant", delivery: "April 01, 2025", rate: "$13 - $17 /hr",
      hours: "25 hrs/week", agent: "Alexia López", sam: "Not Defined", company: "Tech Innovators Inc." },
  ];

  /* --- Notas -------------------------------------------------------------- */
  const notes = Array.from({ length: 8 }, (_, i) => ({
    id: "note-" + (i + 1),
    title: "Lorem impsum dolor sit a...",
    date: "6/3/2023",
    author: "daisylopez@virtuallatinos.com",
  }));

  /* --- Agreements --------------------------------------------------------- */
  const agreements = [
    { name: "Assessment of Financial Transactions", number: "—",        legalName: "Sofia Morales Sanchez" },
    { name: "Evaluation of Customer Data Integrity", number: "Advanced", legalName: "Carlos Torres Alvarado" },
    { name: "Analysis of Sales Performance Metrics", number: "Advanced", legalName: "Diego Morales Cruz" },
  ];

  const proposalVAs = [
    { id: "va-a", name: "Carlos David Torres Alvarado" },
    { id: "va-b", name: "Diego Alejandro Morales Cruz" },
    { id: "va-c", name: "Sofia Elena Ramirez Garcia" },
  ];

  /* --- Intake forms ------------------------------------------------------- */
  const intakeForms = [
    { id: "IF-1042", deal: "Administrative Assistant",        client: "Jessica Wilson",  submitted: "2025-04-22", status: "Completed" },
    { id: "IF-1041", deal: "O'connor Law-Legaal Assistant",   client: "Ryan O'connor",   submitted: "2025-04-20", status: "Pending" },
    { id: "IF-1040", deal: "Black & Associates - Sales",      client: "Monica Black",    submitted: "2025-04-18", status: "Completed" },
    { id: "IF-1039", deal: "Gian - Grasso",                   client: "Gian Grasso",     submitted: "2025-04-15", status: "In Review" },
    { id: "IF-1038", deal: "Abacus Analytics",                client: "Priya Nandan",    submitted: "2025-04-11", status: "Completed" },
    { id: "IF-1037", deal: "Skyline Innovations - Sales Deal", client: "Tomás Iriarte",  submitted: "2025-04-08", status: "Pending" },
    { id: "IF-1036", deal: "Nexus Group - Executive Support", client: "Ana Beltrán",     submitted: "2025-04-04", status: "Completed" },
  ];

  /* --- Catálogos para selects -------------------------------------------- */
  const options = {
    vaLevel: ["Starter (0-2 years)", "Professional (3-5 years)", "Advanced (5+ years)"],
    industry: ["Project Manager", "SaaS & Technology", "Law Firm", "Healthcare", "Real Estate"],
    jobStage: ["Applied", "Screening", "Interview", "Top Candidate", "Proposal Sent", "Hired", "Rejected"],
    country: ["Colombia", "México", "Honduras", "Guatemala", "Argentina", "Perú"],
    degree: ["High School", "Technical", "Bachelor", "Master"],
    experience: ["0-2 years", "3-5 years", "6-9 years", "10+ years"],
    emailTemplate: ["Selected — Interview", "Not selected", "On hold"],
    otherJobStatus: ["Active Proposal", "Associated", "Available"],
    languages: ["English", "Spanish", "Portuguese"],
    schedule: ["Monday to Friday", "Weekends", "Rotating"],
    agreementType: ["Agency VA", "Direct Hire", "Trial"],
  };

  return {
    currentUser, dealStages, primaryRoles, dealOwners, deals, dealDetail,
    applications, candidate, assessments, otherJobs, notes, agreements,
    proposalVAs, intakeForms, options,
  };
})();
