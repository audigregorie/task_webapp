import { Component, input, output } from '@angular/core';
import {
  DeleteTaskItem,
  TaskItem,
} from '../../../../shared/types/task-item.type';

@Component({
  selector: 'app-task-item-list',
  standalone: true,
  imports: [],
  templateUrl: './task-item-list.component.html',
  styleUrl: './task-item-list.component.scss',
})
export class TaskItemListComponent {
  public taskItemList = input.required<TaskItem[]>();
  public toggle = output<DeleteTaskItem>();
  public delete = output<DeleteTaskItem>();
  public update = output<TaskItem>();
}
