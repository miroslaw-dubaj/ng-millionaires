import { TestBed } from '@angular/core/testing';

import { TempBackendService } from './temp-backend.service';

describe('TempBackendService', () => {
  let service: TempBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
