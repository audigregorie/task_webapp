import { KeyValuePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss',
})
export class DialogFormComponent {
  formGroup = input.required<FormGroup>();
  title = input<string>();
  close = output();
  save = output();
}
