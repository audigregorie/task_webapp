import { Component, computed, effect, inject, signal } from '@angular/core';
import { TaskTabService } from '../../shared/data-access/task-tab.service';
import { TaskItemService } from '../../shared/data-access/task-item.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TaskItem } from '../../shared/types/task-item.type';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskItemHeaderComponent } from './task-item-header/task-item-header.component';
import { DialogComponent } from '../../shared/ui/dialog/dialog.component';
import { DialogFormComponent } from '../../shared/ui/dialog-form/dialog-form.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [TaskItemHeaderComponent, DialogComponent, DialogFormComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  public taskTabService = inject(TaskTabService);
  public taskItemService = inject(TaskItemService);
  public route = inject(ActivatedRoute);
  public fb = inject(FormBuilder);

  public taskItemBeingAddedOrEdited = signal<Partial<TaskItem> | null>(null);

  public params = toSignal(this.route.paramMap);

  public taskTab = computed(() =>
    this.taskTabService
      .taskTabList()
      .find((taskTab) => taskTab.id === this.params()?.get('id')),
  );

  public taskItemForm = this.fb.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      if (!this.taskItemBeingAddedOrEdited()) {
        this.taskItemForm.reset();
      }
    });
  }
}
