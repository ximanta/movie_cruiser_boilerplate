import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from './../movie';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  constructor(private moviesService: MoviesService,
    private router: Router) {}
  watchList: Array < any > ;

  ngOnInit() {
    this.moviesService.getWatchList().then((res) => {
      if (res) {
        this.watchList = res;
      }
    });

  }
  refreshMovies() {
    this.moviesService.getWatchList().then((res) => {
      if (res) {
        this.watchList = res;
      }
    });
  }
  updateComments(id: number, comments: string) {
    this.moviesService.updateMovieComments(id, comments);
  }
  goToDetail(id: number) {
    const link = ['/movie', id];
    this.router.navigate(link);
  }

  removeFromWatchList(id: number) {
    this.moviesService.removeMovieFromWatchList(id).then(() => this.refreshMovies());
  }

}
