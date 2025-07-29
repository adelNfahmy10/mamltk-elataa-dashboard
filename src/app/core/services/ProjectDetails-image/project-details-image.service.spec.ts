import { TestBed } from '@angular/core/testing';

import { ProjectDetailsImageService } from './project-details-image.service';

describe('ProjectDetailsImageService', () => {
  let service: ProjectDetailsImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDetailsImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
