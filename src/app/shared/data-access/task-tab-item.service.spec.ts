import { TestBed } from '@angular/core/testing';

import { TaskTabItemService } from './task-tab-item.service';

describe('TaskTabItemService', () => {
  let service: TaskTabItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskTabItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
