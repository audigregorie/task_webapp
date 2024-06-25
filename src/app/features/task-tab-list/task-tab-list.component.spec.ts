import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTabListComponent } from './task-tab-list.component';

describe('TaskTabListComponent', () => {
  let component: TaskTabListComponent;
  let fixture: ComponentFixture<TaskTabListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTabListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
