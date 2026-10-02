export interface FeaturedProject {
  name: string;
  description: string;
  href: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  aspectRatio: string;
}

export interface GithubProject {
  name: string;
  description: string;
  href: string;
  language: string;
}

export interface WorkExperience {
  company: string;
  title: string;
  location: string;
  year: string;
  href: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    name: "tinyaya-quant-safety",
    description:
      "Does 4-bit quantization erode Tiny Aya's multilingual safety floor?",
    href: "https://github.com/ayastaga/tinyaya-quant-safety",
    mediaType: "video",
    mediaSrc: "/tinyaya.mp4",
    aspectRatio: "16/9",
  },
  {
    name: "parsemd",
    description:
      "Converts binary documents (DOCX, PDF, PPTX, XLSX, images, audio) into markdown",
    href: "https://github.com/ayastaga/parsemd",
    mediaType: "video",
    mediaSrc: "/parsemd.mp4",
    aspectRatio: "10/7",
  },
  {
    name: "vjepa_pipeline",
    description:
      "Production-grade data curation pipeline for training V-JEPA action-conditioned latent world models",
    href: "https://github.com/ayastaga/vjepa_pipeline",
    mediaType: "video",
    mediaSrc: "/vjepa.mp4",
    aspectRatio: "2/1",
  },
  {
    name: "Memento",
    description:
      "A memory-support system for dementia patients powered by voice, vision, and AI",
    href: "https://devpost.com/software/memento-9j2ny3",
    mediaType: "video",
    mediaSrc: "/memento.mp4",
    aspectRatio: "16/8",
  },
  {
    name: "MentaLink",
    description:
      "A platform to manage your mental health at the touch of a button",
    href: "https://pitch.com/v/tu20---the-golden-parachutes---mentalink-hq6mvs",
    mediaType: "video",
    mediaSrc: "./Mentalink.mp4",
    aspectRatio: "16/9",
  },
  {
    name: "Nutrasmart",
    description: "Counting calories just got smarter — and sexier",
    href: "https://nutrismart-liard.vercel.app/",
    mediaType: "video",
    mediaSrc: "./Nutrismart.mp4",
    aspectRatio: "8/5",
  },
  {
    name: "Ecoute",
    description:
      "Dashboard for music-junkies who love to know everything about their music",
    href: "https://github.com/ayastaga/Ecoute",
    mediaType: "video",
    mediaSrc: "./ecoute.mp4",
    aspectRatio: "10/7",
  },
  {
    name: "ServiceSwap",
    description: "A platform where users exchange services without money",
    href: "https://devpost.com/software/serviceswap",
    mediaType: "video",
    mediaSrc: "./ServiceSwap.mp4",
    aspectRatio: "10/7",
  },
  {
    name: "UTRA",
    description:
      "An IR & Ultrasonic Sensor obstacle avoider and path finding robot",
    href: "https://devpost.com/software/av-challenge-the-akatsuki",
    mediaType: "image",
    mediaSrc: "/utrahacks.jpg",
    aspectRatio: "16/8",
  },
  {
    name: "Oil Prediction Model",
    description: "Predicting oil prices with linear regression",
    href: "https://github.com/ayastaga/oil-prediction-model",
    mediaType: "image",
    mediaSrc: "/oilPrediction.png",
    aspectRatio: "10/7",
  },
  {
    name: "File Organizer",
    description: "A smart & efficient way to organize your files into folders",
    href: "https://github.com/ayastaga/file-organizer",
    mediaType: "image",
    mediaSrc: "/fileOrganizer.png",
    aspectRatio: "10/7",
  },
];

export const githubProjects: GithubProject[] = [
  {
    name: "dshm_analysis",
    description: "Calculates damping coefficients from CSV data",
    href: "https://github.com/ayastaga/dshm_analysis",
    language: "Python",
  },
  {
    name: "signature_detector",
    description: "Model training for handwritten signature detection",
    href: "https://github.com/ayastaga/signature_detector",
    language: "Jupyter Notebook",
  },
  {
    name: "ascii-art",
    description: "3D ASCII art objects rendered in the terminal",
    href: "https://github.com/ayastaga/ascii-art",
    language: "C",
  },
];

export const workExperience: WorkExperience[] = [
  {
    company: "Intercept",
    title: "Solutions Engineering Intern",
    location: "Toronto, ON",
    year: "2026",
    href: "https://interceptgroup.com",
  },
  {
    company: "University of Waterloo",
    title: "Junior Applications Developer",
    location: "Waterloo, ON",
    year: "2026",
    href: "https://uwaterloo.ca/extended-learning/",
  },
  {
    company: "Sylphia Consulting Inc.",
    title: "Full-Stack Developer",
    location: "Toronto, ON",
    year: "2025",
    href: "http://sylphiaconsulting.com/",
  },
];
