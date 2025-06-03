export interface Iquestion {
  id?:number;
  examId:number;
  correctAnswer: string;
  options:string[];
  questionText: string;
}
