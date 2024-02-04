import { TestBed } from '@angular/core/testing';

import { FailedService } from './failed.service';

describe('FailedService', () => {
  let service: FailedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FailedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
