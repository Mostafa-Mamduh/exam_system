import { Iquestion } from "./iquestion";

export interface Iexam {
  id?:number ;
  title: string;
  duration: number ;
  description: string;
  questions: Iquestion[];
}
