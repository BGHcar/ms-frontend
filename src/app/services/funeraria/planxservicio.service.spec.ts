import { TestBed } from '@angular/core/testing';

import { PlanxservicioService } from './planxservicio.service';

describe('PlanxservicioService', () => {
  let service: PlanxservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanxservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
