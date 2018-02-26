import {Injectable} from '@angular/core';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

@Injectable()
export class DataService {

  api: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.api = 'http://localhost:8000/';
    this.apiKey = 'de4647f3';
  }

  bySearch(parameters: { t: string, type?: 'movie' | 'series' | 'episode' | string, y?: number | string, r?: 'json' | 'xml', page?: number, callback?: string }) {

    let data:any = {...{r: 'json', page: 100, apikey: this.apiKey}, ...parameters};
    return this.http
      .get<any>(this.api, {
        params: new HttpParams({fromObject: data}),
        responseType: 'json'
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: `, error);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
