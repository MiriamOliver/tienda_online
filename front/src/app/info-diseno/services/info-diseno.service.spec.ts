import { TestBed } from '@angular/core/testing';

import { InfoDisenoService } from './info-diseno.service';

describe('InfoDisenoService', () => {
  let service: InfoDisenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoDisenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
