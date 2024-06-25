import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTabDetailComponent } from './task-tab-detail.component';

describe('TaskTabDetailComponent', () => {
  let component: TaskTabDetailComponent;
  let fixture: ComponentFixture<TaskTabDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTabDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTabDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
