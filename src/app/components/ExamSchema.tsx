import { z } from "zod";

export const examSchema = z.object({
  title: z.string().min(1, "Exam title is required"),
  description: z.string().min(1, "Description is required"),
  course: z.string().min(1, "Course is required"),
  year: z.string().min(1, "Year is required"),
  dateCreated: z.string().min(1, "Creation date is required"),
  dateDue: z.string().min(1, "Due date is required"),
  weight: z.string().min(1, "Weight is required"),
  maxPoints: z.coerce.number().min(1, "Maximum points must be at least 1"),
  passingThreshold: z.coerce.number().min(1, "Passing threshold must be at least 1%"),

  visible: z.boolean(),
});
