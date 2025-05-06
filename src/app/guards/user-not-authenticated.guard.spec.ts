import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userNotAuthenticatedGuard } from './user-not-authenticated.guard';

describe('userNotAuthenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userNotAuthenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
