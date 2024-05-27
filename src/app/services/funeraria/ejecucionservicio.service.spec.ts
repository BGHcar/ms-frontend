import { TestBed } from '@angular/core/testing';

import { EjecucionservicioService } from './ejecucionservicio.service';

describe('EjecucionservicioService', () => {
  let service: EjecucionservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjecucionservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
