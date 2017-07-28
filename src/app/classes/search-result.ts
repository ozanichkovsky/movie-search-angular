import { Movie } from './movie';

export interface SearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}
