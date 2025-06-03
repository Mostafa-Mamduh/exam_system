import { Iquestion } from "./iquestion";

export interface Iexam {
  id?:number ;
  name: string;
  duration: number ;
  description: string;
  questions: Iquestion[];
}
