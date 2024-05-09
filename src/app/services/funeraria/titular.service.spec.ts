import { TestBed } from '@angular/core/testing';

import { TitularService } from './titular.service';

describe('TitularService', () => {
  let service: TitularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
