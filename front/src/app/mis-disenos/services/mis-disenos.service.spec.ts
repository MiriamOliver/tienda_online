import { TestBed } from '@angular/core/testing';

import { MisDisenosService } from './mis-disenos.service';

describe('MisDisenosService', () => {
  let service: MisDisenosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisDisenosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
