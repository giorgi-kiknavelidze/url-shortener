import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IdEncoderService } from './id-encoder.service';
import { AddLinkResponse } from './add-link-response';
import { apiUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class LinkAdderService {
  constructor(
    private httpClient: HttpClient,
    private idEncoder: IdEncoderService
  ) {}

  addLink(link: string) {
    return this.httpClient
      .post<AddLinkResponse>(`${apiUrl}/addLink`, { link })
      .pipe(
        map((response) => {
          if (response.status === 'success')
            return `${location.protocol}//${
              location.host
            }/s/${this.idEncoder.encode(BigInt(response.shortId))}`;
          throw new Error(response.error);
        })
      );
  }
}
