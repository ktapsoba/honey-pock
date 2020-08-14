import { TestBed } from '@angular/core/testing';

import { PocketService } from './pocket.service';

describe('PocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PocketService = TestBed.get(PocketService);
    expect(service).toBeTruthy();
  });
});
