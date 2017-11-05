import { SearchService } from '../app/services/search.service';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

const getWatchlistUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' +
  'cf8441d05e8376c04c2feb36bd5b492f&language=en-US&page=1&include_adult=false&query=';

describe('SearchService', function() {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        { provide: XHRBackend, useClass: MockBackend }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('find should work', inject([SearchService, XHRBackend], (searchService, mockBackend) => {

    const mockResponse = {
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

    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.startsWith(getWatchlistUrl)) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      } else {
        connection.mockError(new Error('Right service should be invoked'));
      }
    });

    searchService.find('abc').then((results) => {
        expect(results).toEqual(mockResponse);
      })
      .catch((err) => {
        expect(true).toBe(false);
      });
  }));
});
