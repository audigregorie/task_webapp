import { Component, input } from '@angular/core';
import { TaskTab } from '../../shared/types/task-tab.type';

@Component({
  selector: 'app-task-tab-list',
  standalone: true,
  imports: [],
  templateUrl: './task-tab-list.component.html',
  styleUrl: './task-tab-list.component.scss',
})
export class TaskTabListComponent {
  taskTabList = input.required<TaskTab[]>();
}
