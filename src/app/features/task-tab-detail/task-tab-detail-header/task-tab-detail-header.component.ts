import { Component, input } from '@angular/core';
import { TaskTab } from '../../../shared/types/task-tab.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-tab-detail-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-tab-detail-header.component.html',
  styleUrl: './task-tab-detail-header.component.scss',
})
export class TaskTabDetailHeaderComponent {
  taskTab = input.required<TaskTab>();
}
