import { TestBed } from '@angular/core/testing';

import { ControlNotaService } from './nota.service';

describe('ControlNotaService', () => {
  let service: ControlNotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlNotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
