import { createReducer, on } from '@ngrx/store';

import { Task, TaskStatus } from './task.model';
import { TaskActions } from './tasks.actions';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export const initialState: ReadonlyArray<Task> = [
  {
    id: Math.floor(Math.random() * 1000000),
    name: 'prueba',
    limitDate: { year: 2020, month: 12, day: 12} as NgbDate,
    status: TaskStatus.PENDING,
    persons: [
      {
        completeName: 'Lucas',
        years: 32,
        skills: ['hola', 'chau']
      }
    ]
  }
];

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.add, (state, { task }) => {
    return [...state, task]
  }),
  on(TaskActions.complete, (state, { id }) => {
    return state.map(x => {
      if(x.id === id) {
        return {
          ...x,
          status: TaskStatus.COMPLETED
        }
      } else {
        return x;
      }
    })
  })
);