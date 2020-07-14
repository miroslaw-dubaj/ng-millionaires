import { TestBed } from '@angular/core/testing';

import { MillionairesRestService } from './millionaires.rest.service';

describe('Millionaires.RestService', () => {
  let service: MillionairesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MillionairesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
