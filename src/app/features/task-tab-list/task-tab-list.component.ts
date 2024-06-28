import { Component, input, output } from '@angular/core';
import { DeleteTaskTab, TaskTab } from '../../shared/types/task-tab.type';
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
  public delete = output<DeleteTaskTab>();
  public update = output<TaskTab>();
}
