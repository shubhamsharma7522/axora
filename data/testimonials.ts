/**
 * Add real testimonials supplied by the client. Remove `placeholder` once real.
 * `rating` (1-5) is optional — stars are only drawn when it is provided.
 */
export type Testimonial = {
  quote: string;
  name: string;
  meta: string;
  rating?: number;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: "A real student testimonial will appear here once the client provides one.",
    name: "Student Name",
    meta: "NEET Year",
    placeholder: true,
  },
  {
    quote: "A real student testimonial will appear here once the client provides one.",
    name: "Student Name",
    meta: "NEET Year",
    placeholder: true,
  },
  {
    quote: "A real student testimonial will appear here once the client provides one.",
    name: "Parent / Student Name",
    meta: "NEET Year",
    placeholder: true,
  },
];
