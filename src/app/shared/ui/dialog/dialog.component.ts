import {
  Component,
  TemplateRef,
  contentChild,
  effect,
  inject,
  input,
} from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  private dialog = inject(Dialog);
  template = contentChild.required(TemplateRef);
  isOpen = input.required<boolean>();

  constructor() {
    effect(() => {
      this.isOpen()
        ? this.dialog.open(this.template(), { panelClass: 'dialog-container' })
        : this.dialog.closeAll();
    });
  }
}
