import { TestBed } from '@angular/core/testing';

import { SuccededService } from './succeded.service';

describe('SuccededService', () => {
  let service: SuccededService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccededService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
