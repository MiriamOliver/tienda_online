import { TestBed } from '@angular/core/testing';

//import { MisDisenosocketService } from './mis-disenosocket.service';

describe('MisDisenosocketService', () => {
  let service: MisDisenosocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisDisenosocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
