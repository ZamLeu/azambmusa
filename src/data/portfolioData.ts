export interface Project {
  title: string;
  domain?: string;
  url?: string;
  previewType?: "web" | "mobile";
  previewImage?: string;
  previewImages?: string[];
  type: string;
  tagline: string;
  year?: string;
  award?: string;
  description: string;
  features: string[];
  tech: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  highlights: string[];
  skills: string[];
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  statusOrYear: string;
  cgpa: string;
  details?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
}

export interface ActivityItem {
  role: string;
  organization: string;
  period?: string;
  highlights: string[];
}

export const portfolioData = {
  personal: {
    avatar: "/azam.jpeg",
    fullName: "MUHAMMAD AZAMUDDIN BIN MUSA",
    displayName: "azambmusa",
    website: "azambmusa.my",
    websiteUrl: "https://azambmusa.my",
    title: "Software Engineer & Application Developer",
    location: "Beranang, Selangor, Malaysia",
    email: "azambmusa@gmail.com",
    whatsappUrl: "https://wa.me/601125078925?text=Hi%20Azam,%20I%20saw%20your%20portfolio!",
    githubUsername: "ZamLeu",
    githubUrl: "https://github.com/ZamLeu",
    academicStatus: "Computer Science Undergraduate (Expected 2027) @ USAS",
    cgpa: "3.92 / 4.00",
    availability: "Available for Software Engineering Internship Opportunities",
    summary:
      "Computer Science undergraduate at USAS with practical experience in full-stack web development and cloud deployments. Focused on building clean, reliable web applications using Node.js, Express, and modern JavaScript. Open to Software Engineering internship opportunities."
  },

  education: [
    {
      institution: "Universiti Sultan Azlan Shah (USAS)",
      location: "Kuala Kangsar, Perak",
      degree: "Bachelor of Computer Science (Hons)",
      statusOrYear: "Expected 2027",
      cgpa: "3.92 / 4.00",
      details: [
        "Deputy Program Director (FYP Showcase)",
        "Active Competitor in National Cybersecurity CTFs (RE:UNI10N, TAMiNG, HackNyx)"
      ]
    },
    {
      institution: "Kolej Vokasional Sepang",
      location: "Sepang, Selangor",
      degree: "Diploma Vokasional Malaysia (DVM) in Database System & Web App",
      statusOrYear: "Mar 2022",
      cgpa: "3.80 / 4.00",
      details: [
        "Sijil Kemahiran Malaysia (SKM) Tahap 3 in Application Development",
        "Focused on relational database modeling and full-stack web development"
      ]
    }
  ] as EducationItem[],

  certifications: [
    {
      title: "Generative AI Engineering Professional Certificate",
      issuer: "IBM Skills Network",
      date: "Nov 2026"
    },
    {
      title: "AI Developer Professional Certificate",
      issuer: "IBM Skills Network",
      date: "Oct 2026"
    }
  ] as CertificationItem[],

  skills: {
    languagesAndCore: ["JavaScript (ES6+)", "Python", "Node.js", "Express.js", "Dart", "SQL (MySQL)", "Bash"],
    cloudInfraAndTools: ["Linux VPS", "Cloudflare Tunnels", "Firebase (Auth, Storage, Realtime DB)", "Netlify", "Render", "Git/GitHub"],
    frameworksAndApis: ["Flutter", "HTML5", "CSS3", "Generative AI Integration", "Web Scraping (BeautifulSoup)"],
    engineeringPractices: ["SDLC", "End-to-End System Testing", "Bug Triage", "Role-Based Access Control (RBAC)"]
  },

  projects: [
    {
      title: "Link1t",
      domain: "link1t.my",
      url: "https://link1t.my",
      previewType: "web",
      previewImage: "/projects/link1t.png",
      type: "Full-Stack Web Publishing Platform",
      tagline: "Instant Site Generation & Publishing Engine",
      year: "2026",
      description:
        "Architected a real-time publishing tool using a decoupled Node.js/Express backend on Render, integrated with the Netlify Deploy API for automated site generation. Built an asset management subsystem using Firebase (Storage & Realtime DB) to track per-user storage and enforce monthly deployment quotas.",
      features: [
        "Decoupled Node.js/Express backend on Render connected with Netlify Deploy API",
        "Asset management subsystem with Firebase Storage & Realtime DB tracking user quota",
        "Automated deployment pipeline and custom domain routing via Cloudflare DNS"
      ],
      tech: ["Node.js", "Express.js", "Render", "Netlify API", "Firebase Storage", "Realtime DB"]
    },
    {
      title: "TouchByTiha",
      domain: "touchbytiha.my",
      url: "https://touchbytiha.my",
      previewType: "web",
      previewImage: "/projects/touchbytiha.png",
      type: "Modular Web CMS & Client Portfolio",
      tagline: "Production Portfolio & Zero-Downtime CMS",
      year: "2026",
      description:
        "Engineered a production portfolio platform and administrative CMS utilizing modular JavaScript and Firebase. Implemented a 3-tier data fallback mechanism to guarantee uninterrupted content delivery and enforced role-based database rules.",
      features: [
        "Modular Vanilla JS architecture for lightweight zero-build performance",
        "3-Tier Data Fallback: Firebase API → LocalStorage Cache → Local JSON Fallback",
        "Administrative CMS with Role-Based Access Control (RBAC) and security rules"
      ],
      tech: ["Modular JavaScript", "Firebase Auth", "Firebase Storage", "RBAC", "Cloud DNS"]
    },
    {
      title: "BuddyUp",
      type: "Peer Study Coordination Mobile Application",
      previewType: "mobile",
      previewImage: "/projects/buddyup.png",
      previewImages: ["/projects/buddyup.png", "/projects/buddyup2.png"],
      tagline: "Collaborative Study & Peer Matching App",
      year: "2026",
      description:
        "Developed a cross-platform mobile application using Flutter and Dart to facilitate student peer matching and collaborative scheduling. Integrated Firebase authentication and real-time cloud data synchronization for live state management.",
      features: [
        "Cross-platform responsive mobile architecture using Flutter and Dart",
        "Real-time cloud database synchronization and live session state management",
        "Firebase Authentication and student study group discovery matching"
      ],
      tech: ["Flutter", "Dart", "Firebase Auth", "Realtime DB", "Mobile UI"]
    }
  ] as Project[],

  experience: [
    {
      role: "Research Assistant (AI Biometrics Project)",
      organization: "Universiti Sultan Azlan Shah (USAS)",
      period: "Jul 2025 – Aug 2025",
      highlights: [
        "Preprocessed and validated a 3,000-image iris dataset using MATLAB to support an AI biometric research pipeline.",
        "Executed image transformation parameters and verified simulation output consistency across model evaluation runs."
      ],
      skills: ["MATLAB", "AI Biometrics", "Image Transformation", "Data Validation", "Simulation Consistency"]
    },
    {
      role: "Web Developer Intern",
      organization: "ADS Web Services Sdn. Bhd.",
      period: "Apr 2022 – Aug 2022",
      highlights: [
        "Maintained and expanded core functionality for enterprise platforms including a School Management System (SMAP) and an E-commerce portal, improving system reliability.",
        "Conducted flow testing and patched edge-case bugs, ensuring feature stability prior to client release.",
        "Implemented security logic for mobile user authentication incorporating client-side geolocation validation."
      ],
      skills: ["Node.js/Web", "SMAP System", "Security Logic", "Flow Testing", "Geolocation Auth", "Bug Triage"]
    }
  ] as ExperienceItem[],

  extracurricular: [
    {
      role: "Deputy Program Director",
      organization: "Final Year Project Showcase (USAS)",
      highlights: [
        "Led event operations, presenter schedules, and technical logistics.",
        "Coordinated student committees and faculty/industry evaluators."
      ]
    },
    {
      role: "Competitive CTF Competitor",
      organization: "National Cybersecurity Circuits",
      period: "Active Competitor",
      highlights: [
        "Competed in team-based National Capture The Flag tournaments: RE:UNI10N, TAMiNG, and HackNyx.",
        "Applied analytical reasoning to solve web security exploitation and reverse engineering challenges under time constraints."
      ]
    }
  ] as ActivityItem[]
};
