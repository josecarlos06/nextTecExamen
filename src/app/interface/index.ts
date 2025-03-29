export interface Job {
   puesto: string,
   empresa: string,
   id: string
 }
 export interface User {
  id : string ,
  nombre : string,
  puesto: string,
  fechaIngreso: string,
  salario: string,
  edad : number,
}

 export type ActionType = 'agregar' | 'editar' | 'eliminar' | '';