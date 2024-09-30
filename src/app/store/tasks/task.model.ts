import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface Task {
    id: number,
    name: string;
    limitDate: NgbDate,
    status: TaskStatus,
    persons: Person[],
}

export enum TaskStatus { 
    PENDING = 'Pendiente',
    COMPLETED = 'Completada'
}

export interface Person {
    completeName: string,
    years: number,
    skills: string[]
}