export interface Exam {
  id: string;
  title: string;
  description: string;
  course: string;
  dateCreated: string;
  dateDue: string;
  weight: string;
  maxPoints: number;
  passingThreshold: number;
  visible: boolean;
  status: string;
  year: string;
}