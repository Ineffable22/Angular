import { TestBed } from '@angular/core/testing';

import { BlockNotTokenGuard } from './block-not-token.guard';

describe('BlockNotTokenGuard', () => {
  let guard: BlockNotTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlockNotTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
