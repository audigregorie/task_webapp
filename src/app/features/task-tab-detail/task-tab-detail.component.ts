import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TaskTabService } from '../../shared/data-access/task-tab.service';
import { TaskTabDetailHeaderComponent } from './task-tab-detail-header/task-tab-detail-header.component';

@Component({
  selector: 'app-task-tab-detail',
  standalone: true,
  imports: [TaskTabDetailHeaderComponent],
  templateUrl: './task-tab-detail.component.html',
  styleUrl: './task-tab-detail.component.scss',
})
export class TaskTabDetailComponent {
  public taskTabService = inject(TaskTabService);
  public route = inject(ActivatedRoute);

  params = toSignal(this.route.paramMap);

  taskTab = computed(() =>
    this.taskTabService
      .taskTabList()
      .find((taskTab) => taskTab.id === this.params()?.get('id')),
  );
}
