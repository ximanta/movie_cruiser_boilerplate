import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: Array < Object > = [];
  nowPlayingTV: Array < Object > = [];
  constructor(private searchService: SearchService,
    private router: Router) {}

  goToDetail(id: number) {
    const link = ['/movie', id];
    this.router.navigate(link);
  }

  goToDetailTV(id: number) {
    const link = ['/tv', id];
    this.router.navigate(link);
  }
  ngOnInit() {
    this.searchService.getNowPlayingMovies().subscribe(response => {
      this.nowPlayingMovies = response.results.splice(0, 3);
    });

    this.searchService.getNowPlayingTV().subscribe(response => {
      this.nowPlayingTV = response.results;
    });
  }

}
