
import { z } from "zod";


export const examSchema = z.object({
  title: z.string().min(1, "Exam title is required"),
     dateCreated: z.string().min(1, "Creation date required"),
 dateDue: z.string().min(1, "Due date required"),
  weight: z.string().min(1, "Weight required"),
     maxPoints: z.coerce.number().min(1, "Max points required"),
    passingThreshold: z.coerce.number().min(1, "Passing threshold required"),
  course: z.string().min(1, "Course is required"),
  description: z.string().min(1, "Description is required"),
 
 year: z.string().min(1, "Year is required"),
 
  visible: z.enum(["true", "false"]).transform(val => val === "true"),

 
  
});