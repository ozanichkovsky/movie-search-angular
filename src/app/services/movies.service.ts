import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Movie } from '../classes/movie';
import { SearchResult } from '../classes/search-result';

@Injectable()
export class MoviesService {

  private apiKey: string = environment.API_KEY;
  private apiUrl: string = environment.API_URL;

  constructor(private http: Http) { }

  search(terms: Observable<string>, page: number = 1) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term, page));
  }

  discover(page: number = 1): Observable<SearchResult> {
    const discoverURL = this.apiUrl + 'discover/movie'
      + '?api_key=' + this.apiKey;
    return this.http
      .get(discoverURL + '&page=' + page)
      .map(res => res.json());
  }

  searchEntries(term: string, page: number = 1): Observable<SearchResult> {
    const searchURL = this.apiUrl + 'search/movie'
      + '?api_key=' + this.apiKey;
    return this.http
      .get(searchURL + '&query=' + encodeURI(term) + '&page=' + page)
      .map(res => res.json());
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get(this.apiUrl + 'movie/' + id + '?api_key=' + this.apiKey).map(res => res.json());
  }
}
