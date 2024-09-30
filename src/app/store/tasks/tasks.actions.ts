import { createActionGroup, props } from '@ngrx/store';
import { Task } from './task.model';

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Add': props<{ task: Task }>(),
    'Complete': props<{id: number}>(),
  },
});