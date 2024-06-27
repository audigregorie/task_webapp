import { Component, input, output } from '@angular/core';
import { TaskItem } from '../../../../shared/types/task-item.type';

@Component({
  selector: 'app-task-item-list',
  standalone: true,
  imports: [],
  templateUrl: './task-item-list.component.html',
  styleUrl: './task-item-list.component.scss',
})
export class TaskItemListComponent {
  public taskItemList = input.required<TaskItem[]>();
  public toggle = output<string>();
}
