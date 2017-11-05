import { SearchService } from '../services/search.service';
import { Movie } from './../movie';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {

  movie: Array < Object > = [];
  recommended: Array < Object > = [];
  cast: Array < Object > = [];

  constructor(
    private router: Router,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private location: Location) {}

  goToDetailTV(id: number) {
    const link = ['/tv', id];
    this.router.navigate(link);
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.searchService.getTVById(+params.get('id')))
      .subscribe(movie => this.movie = movie);

    this.route.params.map(params => params['id'])
      .switchMap(id => this.searchService.getRecommendedTV(id))
      .subscribe(response => this.recommended = response.results.splice(0, 6));

    this.route.params.map(params => params['id'])
      .switchMap(id => this.searchService.getCastTV(id))
      .subscribe(response => this.cast = response.cast.splice(0, 3));
  }
}
