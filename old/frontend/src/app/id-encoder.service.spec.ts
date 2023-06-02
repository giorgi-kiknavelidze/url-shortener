import { TestBed } from '@angular/core/testing';

import { IdEncoderService } from './id-encoder.service';

describe('IdEncoderService', () => {
  let service: IdEncoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdEncoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be consistent from 0 to 2048', () => {
    [...Array(2048).keys()]
      .map((item) => BigInt(item))
      .forEach((item) => {
        expect(service.decode(service.encode(item))).toEqual(item);
      });
  });

  it('should return -1 when decoding invalid value', () => {
    expect(service.decode('invalid value')).toEqual(-1n);
  });
});
