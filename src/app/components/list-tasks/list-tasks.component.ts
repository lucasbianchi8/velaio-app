import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTasks, selectTasksByStatus } from '../../store/tasks/task.selector';
import { AsyncPipe } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterTaskComponent } from '../filter-task/filter-task.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskStatus } from '../../store/tasks/task.model';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [AsyncPipe, NgbAlertModule, FilterTaskComponent, TaskCardComponent],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss'
})
export class ListTasksComponent {

  store = inject(Store);
  tasks$ = this.store.select(selectTasks);
 
  searchTasks(status: TaskStatus | string) {
    this.tasks$ = status === '' ? this.store.select(selectTasks) : this.store.select(selectTasksByStatus(status as TaskStatus));
  }

}