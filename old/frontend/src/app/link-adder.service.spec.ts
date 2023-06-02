import { TestBed } from '@angular/core/testing';

import { LinkAdderService } from './link-adder.service';

describe('LinkAdderService', () => {
  let service: LinkAdderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkAdderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
