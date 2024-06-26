import { Component, input } from '@angular/core';
import { TaskTab } from '../../shared/types/task-tab.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-tab-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-tab-list.component.html',
  styleUrl: './task-tab-list.component.scss',
})
export class TaskTabListComponent {
  public taskTabList = input.required<TaskTab[]>();
}
