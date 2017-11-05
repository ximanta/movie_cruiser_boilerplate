import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const mockResult = {
  results: [{
    adult: false,
    backdrop_path: '/mA3cMu5YdLQ6GgNf5kwTWINDXfC.jpg',
    id: 45132,
    original_language: 'en',
    original_title: 'Super',
    overview: 'After his wife falls under the influence of a drug dealer.',
    popularity: 11.743972,
    poster_path: '/wRYZdWGCcC7ttY7MFNbIKpR3pnn.jpg',
    release_date: '2010-09-09',
    title: 'Super',
    video: false,
    vote_average: 6.6,
    vote_count: 446
  }],
  totalResults: 1,
  page: 1,
  totalPages: 1
};

@Injectable()
export class SearchStub {

  public sharedSearchResult: Array < Object > = [];

  constructor(private http: Http) {}

  find(term: string) {
    return Promise.resolve(mockResult);
  }
}
