import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchResult } from '../classes/search-result';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  result: SearchResult;
  searchTerm$ = new Subject<string>();
  currentSearchTerm: string;
  isSearch: boolean = false;

  constructor(private movieService: MoviesService) {
    this.movieService.discover().subscribe(
      result => {
        this.result = result;
      }
    );
    this.movieService.search(this.searchTerm$)
      .subscribe(result => {
        this.result = result;
      });
  }

  handleKeyUp(event: Event) {
    const value = (<HTMLInputElement> event.target).value;
    if (value.length > 0) {
      this.isSearch = true;
      this.searchTerm$.next(value);
    } else {
      this.isSearch = false;
      this.movieService.discover().subscribe(
        result => {
          this.result = result;
        }
      );
    }
    this.currentSearchTerm = value;
  }

  goToPage(page: number) {
    if (this.isSearch) {
      this.movieService.searchEntries(this.currentSearchTerm, page)
        .subscribe(result => {
          this.result = result;
        });
    } else {
      this.movieService.discover(page).subscribe(
        result => {
          this.result = result;
        }
      );
    }
  }

  getRows(items: any[], itemsPerRow: number = 2) {
    return Array.from(
      Array(Math.ceil(items.length / itemsPerRow)).keys()
    );
  }
}
