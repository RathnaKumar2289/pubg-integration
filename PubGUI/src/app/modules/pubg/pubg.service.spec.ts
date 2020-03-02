import { TestBed } from '@angular/core/testing';

import { PubgService } from './pubg.service';

describe('PubgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PubgService = TestBed.get(PubgService);
    expect(service).toBeTruthy();
  });
});
