import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTabDetailHeaderComponent } from './task-tab-detail-header.component';

describe('TaskTabDetailHeaderComponent', () => {
  let component: TaskTabDetailHeaderComponent;
  let fixture: ComponentFixture<TaskTabDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTabDetailHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTabDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
