import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';
import { Movie } from '../movie';
@Injectable()
export class MoviesService {

  constructor(private http: Http) {}

  private headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  private serviceUrl = 'http://localhost:8080/v1.0/movieservice/movie/';

  addToWatchListMovie(id: number, name: string, comments: string, poster_path: string,
    release_date: Date, vote_average: number, vote_count: number) {
    const url = this.serviceUrl + 'save/';
    const json = JSON.stringify({ id: id, name: name, comments: comments, posterPath: poster_path,
      releaseDate: release_date, voteAverage: vote_average, voteCount: vote_count });
    return this.http.post(this.serviceUrl, json, { headers: this.headers }).toPromise().catch(this.handleError);
  }

  getWatchList() {
    return this.http.get(this.serviceUrl).toPromise().then((res) => res.json(),
      (err) => err.json());
  }

  checkWatchList(id: number) {
    const url = this.serviceUrl + id;
    return this.http.get(url).toPromise().then(res => res ? res.json() : null).catch(this.handleError);
  }

  updateMovieComments(id: number, comments: string) {
    const url = this.serviceUrl + id;
    return this.http.put(url, comments).toPromise().catch(this.handleError);
  }

  removeMovieFromWatchList(id: number) {
    const uri = `${this.serviceUrl}${id}`;
    return this.http.delete(uri, { headers: this.headers }).toPromise().catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
  }
}
