import { Nota } from "./nota";

export interface Materia {
    id: number;
    nombre: string;
    semestre: string;
    codigo: string;
    horario: string;
    observaciones: string;
    notas: number[];
    promedio: number;
}

export{Nota} 

