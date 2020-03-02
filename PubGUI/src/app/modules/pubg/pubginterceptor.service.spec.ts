import { TestBed } from '@angular/core/testing';

import { PubgInterceptorService } from './pubginterceptor.service';

describe('PubginterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PubgInterceptorService = TestBed.get(PubgInterceptorService);
    expect(service).toBeTruthy();
  });
});
