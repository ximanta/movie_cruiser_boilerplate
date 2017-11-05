import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover-movies',
  templateUrl: './discover-movies.component.html',
  styleUrls: ['./discover-movies.component.css']
})
export class DiscoverMoviesComponent implements OnInit {

  constructor(private searchService: SearchService, private router: Router) {}
  discMovies: Array < Object > = [];
  ngOnInit() {

    this.searchService.discoverMovies().subscribe(response => {
      this.discMovies = response.results;
    });

  }
  goToDetail(id: number) {
    const link = ['/movie', id];
    this.router.navigate(link);
  }
}
