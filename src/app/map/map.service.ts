import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  get(): Observable<any> {
    const data = this.httpClient.get(
      'https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/uf/geojson/uf.json'
    );

    return data;
  }
}
