export interface Project {
  id: string;
  client: string;
  description: string;
  year: string;
  tags: string[];
  imageUrl: string;
  size: 'large' | 'medium';
  hoverText?: string;
  certifications?: string[];
}

export interface MenuItem {
  label: string;
  href: string;
}

// Fix: Explicitly type as tuple for Framer Motion compatibility
export const ANIMATION_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]; // Custom cubic bezier