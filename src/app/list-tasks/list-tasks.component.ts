import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTask } from '../store/tasks/task.selector';
import { AsyncPipe } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [AsyncPipe, NgbAlertModule],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss'
})
export class ListTasksComponent {

  store = inject(Store);
  taks$ = this.store.select(selectTask)

}