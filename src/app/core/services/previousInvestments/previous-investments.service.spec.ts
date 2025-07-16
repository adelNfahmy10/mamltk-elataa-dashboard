import { TestBed } from '@angular/core/testing';

import { PreviousInvestmentsService } from './previous-investments.service';

describe('PreviousInvestmentsService', () => {
  let service: PreviousInvestmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousInvestmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
