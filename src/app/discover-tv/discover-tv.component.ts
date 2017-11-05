import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover-tv',
  templateUrl: './discover-tv.component.html',
  styleUrls: ['./discover-tv.component.css']
})
export class DiscoverTvComponent implements OnInit {

  constructor(private searchService: SearchService, private router: Router) {}
  discTV: Array < Object > = [];
  ngOnInit() {

    this.searchService.discoverTV().subscribe(response => {
      this.discTV = response.results;
    });

  }
  goToDetailTV(id: number) {
    const link = ['/tv', id];
    this.router.navigate(link);
  }

}
