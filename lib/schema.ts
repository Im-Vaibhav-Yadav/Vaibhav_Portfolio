export interface Profile {
  name: string;
  initials: string;
  photo: string;
  /** 1 = fit frame, up to 3 = zoomed in 3x. */
  photoZoom: number;
  /** Object-position percentages (0-100) — where the frame is centered. */
  photoX: number;
  photoY: number;
  resumeUrl: string;
  role: string;
  roleSecondary: string;
  location: string;
  email: string;
  phone: string;
  tagline: string;
  bio: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ExperienceTag {
  label: string;
  domain: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  tag: string;
  points: string[];
  tags: ExperienceTag[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  domain: string;
  items: string[];
}

export interface Project {
  id: string;
  year: string;
  name: string;
  category: string;
  domain: string;
  buildType: string;
  description: string;
  stack: string[];
  highlights: string[];
  image: string;
}

export interface Certification {
  name: string;
  issuer: string;
  url: string;
}

export interface NavLink {
  href: string;
  label: string;
  index: string;
}

export interface SocialLink {
  id: string;
  label: string;
  value: string;
  url: string;
  icon: string;
}

export interface Post {
  id: string;
  title: string;
  platform: string;
  url: string;
  date: string;
}

export interface SectionHeadingCopy {
  kicker: string;
  title: string;
}

export interface Headings {
  about: SectionHeadingCopy;
  experience: SectionHeadingCopy;
  work: SectionHeadingCopy;
  skills: SectionHeadingCopy;
  writing: SectionHeadingCopy;
  contact: SectionHeadingCopy;
}

export interface SiteContent {
  profile: Profile;
  stats: Stat[];
  experience: ExperienceItem[];
  education: Education;
  focusAreas: string[];
  skillGroups: SkillGroup[];
  skillTicker: string[];
  projects: Project[];
  certifications: Certification[];
  navLinks: NavLink[];
  socials: SocialLink[];
  posts: Post[];
  headings: Headings;
}

/** How a project should be labeled — never presented as more than it is. */
export const BUILD_TYPE_KEYS = ["client", "independent", "experimental"] as const;

/** Valid icon keys for SocialLink.icon — mapped to lucide-react icons. */
export const ICON_KEYS = [
  "linkedin",
  "github",
  "twitter",
  "youtube",
  "instagram",
  "globe",
  "mail",
  "phone",
  "link",
  "file",
] as const;
