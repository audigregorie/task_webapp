import { Component, input, output } from '@angular/core';
import { TaskTab } from '../../../../shared/types/task-tab.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-item-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-item-header.component.html',
  styleUrl: './task-item-header.component.scss',
})
export class TaskItemHeaderComponent {
  public taskTab = input.required<TaskTab>();
  public addItem = output();
}
