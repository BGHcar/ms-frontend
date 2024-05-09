import { TestBed } from '@angular/core/testing';

import { CremacionService } from './cremacion.service';

describe('CremacionService', () => {
  let service: CremacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CremacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
