/**
 * Add real, client-verified results here. Each entry with `placeholder: true`
 * renders as an editable placeholder. Replace fields and remove the flag.
 * `image` is an optional path in /public (e.g. "/students/name.jpg").
 */
export type Result = {
  student: string;
  year: string;
  score: string;
  college: string;
  image?: string;
  placeholder?: boolean;
};

export const results: Result[] = [
  {
    student: "Student Name",
    year: "NEET Year",
    score: "Score / Rank",
    college: "College",
    placeholder: true,
  },
  {
    student: "Student Name",
    year: "NEET Year",
    score: "Score / Rank",
    college: "College",
    placeholder: true,
  },
  {
    student: "Student Name",
    year: "NEET Year",
    score: "Score / Rank",
    college: "College",
    placeholder: true,
  },
];
