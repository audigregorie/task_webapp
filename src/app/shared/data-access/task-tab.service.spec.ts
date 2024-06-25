import { TestBed } from '@angular/core/testing';

import { TaskTabService } from './task-tab.service';

describe('TaskTabService', () => {
  let service: TaskTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
