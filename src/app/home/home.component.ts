import { Component, effect, inject, signal } from '@angular/core';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { DialogComponent } from '../shared/ui/dialog/dialog.component';
import { DialogFormComponent } from '../shared/ui/dialog-form/dialog-form.component';
import { TaskTab } from '../shared/types/task-tab.type';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, DialogComponent, DialogFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public fb = inject(FormBuilder);
  public taskTabBeingAddedOrEdited = signal<Partial<TaskTab> | null>(null);

  public taskTabForm = this.fb.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      if (!this.taskTabBeingAddedOrEdited()) {
        this.taskTabForm.reset();
      }
    });
  }
}
