import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LinkAdderService } from './link-adder.service';

describe('LinkAdderService', () => {
  let service: LinkAdderService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(LinkAdderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
