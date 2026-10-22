// Photography used across the site, each with its credit: Unsplash (Unsplash License), plus photos of
// Swinburne and Payoo supplied by the site owner (credit without a url).
// Backdrops are shown blurred and darkened, so they are stored small; swap any entry to change a scene.

import heroSmall from "@/assets/hero-servers-1200.webp";
import heroLarge from "@/assets/hero-servers-1920.webp";
import bgAbout from "@/assets/bg-about.webp";
import bgStack from "@/assets/bg-stack.webp";
import bgExperience from "@/assets/bg-experience.webp";
import bgProjects from "@/assets/bg-projects.webp";
import bgContact from "@/assets/bg-contact.webp";
import tileLocation from "@/assets/tile-location.webp";
import tileResearch from "@/assets/tile-research.webp";
import tileSwinburne from "@/assets/tile-swinburne-vn.webp";
import tilePayoo from "@/assets/tile-payoo-office.webp";
import timelineSwinburne from "@/assets/timeline-swinburne-atc.webp";
import timelinePayoo from "@/assets/timeline-payoo-logo.webp";
import timelineResearch from "@/assets/timeline-research-library.webp";
import type { sections } from "./profile";

export type Photo = {
  src: string;
  alt: string;
  // CSS object-position, to keep the subject in frame when cropped.
  position?: string;
  // Short on-image label; "Illustrative" marks photos that show a theme, not the actual place.
  caption?: string;
  // `url` is omitted for photos supplied by the site owner.
  credit: { name: string; url?: string; license?: string };
};

type SectionId = (typeof sections)[number]["id"];

export const introPhoto = {
  src: heroLarge,
  srcSet: `${heroSmall} 1200w, ${heroLarge} 1920w`,
  credit: { name: "Taylor Vick", url: "https://unsplash.com/photos/cable-network-M5tzZtFCOfs" },
};

// The main page's fixed backdrop crossfades to the photo of whichever section is in view.
export const sectionBackdrops: Record<SectionId, Photo> = {
  about: {
    src: bgAbout,
    alt: "Developer coding at night in front of two monitors",
    position: "60% 50%",
    credit: { name: "Mohammad Rahmani", url: "https://unsplash.com/photos/man-in-black-long-sleeve-shirt-using-computer-_Fx34KeqIEw" },
  },
  stack: {
    src: bgStack,
    alt: "Macro shot of a dark circuit board",
    credit: { name: "Alexandre Debiève", url: "https://unsplash.com/photos/FO7JIlwjOtU" },
  },
  experience: {
    src: bgExperience,
    alt: "Landmark 81 and Ho Chi Minh City at night",
    position: "55% 40%",
    credit: { name: "Tron Le", url: "https://unsplash.com/photos/city-building-photo-eilpDNi_pV4" },
  },
  projects: {
    src: bgProjects,
    alt: "Close-up of Python code on a screen",
    credit: { name: "Chris Ried", url: "https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-code-on-it-ieic5Tq8YMk" },
  },
  contact: {
    src: bgContact,
    alt: "Earth at night, city lights linked across the continents",
    position: "50% 60%",
    credit: { name: "NASA", url: "https://unsplash.com/photos/photo-of-outer-space-Q1p7bh3SHj8" },
  },
};

// Photos inside individual bento tiles.
export const tilePhotos = {
  education: {
    src: tileSwinburne,
    alt: "Entrance of Swinburne Vietnam's Ho Chi Minh City campus at A35 Bach Dang, with the red Swinburne sign",
    caption: "Swinburne Vietnam · HCMC",
    position: "50% 58%",
    credit: { name: "Supplied by Le Thanh Nam" },
  },
  experience: {
    src: tilePayoo,
    alt: "Payoo office with desks and the Payoo logo on the wall",
    caption: "Payoo office",
    position: "75% 42%",
    credit: { name: "Supplied by Le Thanh Nam" },
  },
  location: {
    src: tileLocation,
    alt: "Aerial view of Saigon and its river at night",
    credit: { name: "CreateTravel.tv", url: "https://unsplash.com/photos/aerial-view-of-city-during-night-time-dtu842bEZuw" },
  },
  research: {
    src: tileResearch,
    alt: "Desk lamp glowing beside a pile of old books",
    credit: { name: "Jez Timms", url: "https://unsplash.com/photos/turned-on-desk-lamp-beside-pile-of-books-8muUTAmcWU4" },
  },
} satisfies Record<string, Photo>;

// Thumbnails beside each experience and education entry in the timeline.
export const timelinePhotos = {
  research: {
    src: timelineResearch,
    alt: "Ladder against tall shelves of old books in a library",
    caption: "Illustrative · research",
    credit: { name: "enrico bet", url: "https://unsplash.com/photos/wooden-ladder-in-trinity-college-library-lc7xcWebECc" },
  },
  payoo: {
    src: timelinePayoo,
    alt: "Payoo logo on the office wall",
    caption: "Payoo office",
    credit: { name: "Supplied by Le Thanh Nam" },
  },
  // Swinburne University of Technology (the degree-awarding university), Hawthorn campus in Melbourne.
  swinburne: {
    src: timelineSwinburne,
    alt: "Swinburne University of Technology's Advanced Technologies Centre in Melbourne",
    caption: "Swinburne · Melbourne",
    position: "55% 40%",
    credit: { name: "Supplied by Le Thanh Nam" },
  },
} satisfies Record<string, Photo>;

// Where the full list of photo credits lives (linked from the footer).
export const creditsUrl = "https://github.com/thanhnamle/Portfolio-V1#credits";
