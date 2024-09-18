import { TestBed } from '@angular/core/testing';

import { ControlMateriaService } from './control-materia.service';

describe('ControlMateriaService', () => {
  let service: ControlMateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlMateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
