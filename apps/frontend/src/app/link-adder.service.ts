import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IdEncoderService } from './id-encoder.service';
import { AddLinkResponse } from './add-link-response';
import { environment } from '../environments/environment';

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
      .post<AddLinkResponse>(`${environment.apiUrl}/addLink`, { link })
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
