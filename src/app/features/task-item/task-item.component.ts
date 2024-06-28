import { Component, computed, effect, inject, signal } from '@angular/core';
import { TaskTabService } from '../../shared/data-access/task-tab.service';
import { TaskItemService } from '../../shared/data-access/task-item.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TaskItem } from '../../shared/types/task-item.type';
import { toSignal } from '@angular/core/rxjs-interop';
import { DialogComponent } from '../../shared/ui/dialog/dialog.component';
import { DialogFormComponent } from '../../shared/ui/dialog-form/dialog-form.component';
import { TaskItemHeaderComponent } from './ui/task-item-header/task-item-header.component';
import { TaskItemListComponent } from './ui/task-item-list/task-item-list.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    TaskItemHeaderComponent,
    DialogComponent,
    DialogFormComponent,
    TaskItemListComponent,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  public taskTabService = inject(TaskTabService);
  public taskItemService = inject(TaskItemService);
  public route = inject(ActivatedRoute);
  public fb = inject(FormBuilder);

  public taskItemBeingEdited = signal<Partial<TaskItem> | null>(null);

  public params = toSignal(this.route.paramMap);

  public taskTab = computed(() =>
    this.taskTabService
      .taskTabList()
      .find((taskTab) => taskTab.id === this.params()?.get('id')),
  );

  public taskItemList = computed(() =>
    this.taskItemService
      .taskItemList()
      .filter((taskItem) => taskItem.taskTabId === this.params()?.get('id')),
  );

  public taskItemForm = this.fb.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      if (!this.taskItemBeingEdited()) {
        this.taskItemForm.reset();
      } else {
        this.taskItemForm.patchValue({
          title: this.taskItemBeingEdited()?.title,
        });
      }
    });
  }
}
