import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResults: Array < Object > = [];
  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchResults = this.searchService.sharedSearchResult;
  }

  goToDetail(id: number) {
    const link = ['/movie', id];
    this.router.navigate(link);
  }
}
