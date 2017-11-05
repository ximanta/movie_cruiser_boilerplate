import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: Http) {}

  public sharedSearchResult: Array < Object > = [];

  private searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' +
    'cf8441d05e8376c04c2feb36bd5b492f&language=en-US&page=1&include_adult=false&query=';
  private movieUrl = 'https://api.themoviedb.org/3/movie/';
  private tvUrl = 'https://api.themoviedb.org/3/tv/';
  private discoverMoviesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
    'cf8441d05e8376c04c2feb36bd5b492f&language=en-US&sort_by=popularity.desc' +
    '&include_adult=false&include_video=false&page=1';
  private apikey = '?api_key=cf8441d05e8376c04c2feb36bd5b492f&language=en-US';
  private nowPlayingUrl = 'https://api.themoviedb.org/3/movie/' +
    'now_playing?api_key=cf8441d05e8376c04c2feb36bd5b492f&language=en-US&page=1';
  private discoverTvUrl = 'https://api.themoviedb.org/3/discover/tv?api_key=' +
    'cf8441d05e8376c04c2feb36bd5b492f&language=en-US&sort_by=popularity.desc' +
    '&include_adult=false&include_video=false&page=1';

  find(term: string) {
    const url = `${this.searchUrl}${term}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  searchTV(term: string) {
    const url = `${this.searchUrl}${term}`;
    return this.http.get(url)
      .map(result => result.json());
  }

  getNowPlayingTV() {
    const url = 'https://api.themoviedb.org/3/tv/popular?api_key=cf8441d05e8376c04c2feb36bd5b492f&language=en-US&page=1';
    return this.http.get(url).map(response => response.json());
  }

  getTVById(id: number) {
    const url = this.tvUrl + id + this.apikey;
    return this.http.get(url).map(response => response.json());
  }

  discoverTV() {
    return this.http.get(this.discoverTvUrl).map(result => result.json());
  }

  getRecommendedTV(id: number) {
    const url = this.tvUrl + id + '/recommendations' + this.apikey;
    return this.http.get(url).map(result => result.json());
  }
  getCastTV(id: number) {
    const url = this.tvUrl + id + '/credits' + this.apikey;
    return this.http.get(url).map(result => result.json());
  }

  getRecommendedMovies(id: number) {
    const url = this.movieUrl + id + '/recommendations' + this.apikey;
    return this.http.get(url).map(result => result.json());
  }

  discoverMovies() {
    return this.http.get(this.discoverMoviesUrl).map(result => result.json());
  }

  getNowPlayingMovies() {
    return this.http.get(this.nowPlayingUrl).map(response => response.json());
  }

  getMovieById(id: number) {
    const url = this.movieUrl + id + this.apikey;
    return this.http.get(url).map(response => response.json());
  }

  getCast(id: number) {
    const url = this.movieUrl + id + '/credits' + this.apikey;
    return this.http.get(url).map(result => result.json());
  }

  private handleError(error: any): Promise < any > {
    return Promise.reject(error.message || error);
  }
}
