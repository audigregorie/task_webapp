import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemHeaderComponent } from './task-item-header.component';

describe('TaskItemHeaderComponent', () => {
  let component: TaskItemHeaderComponent;
  let fixture: ComponentFixture<TaskItemHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
