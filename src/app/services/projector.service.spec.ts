import { TestBed } from '@angular/core/testing';

import { ProjectorService } from './projector.service';

describe('ProjectorService', () => {
  let service: ProjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
